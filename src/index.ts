/*
 * Copyright (c) 2018-2021 dokmic, Snowplow Analytics Ltd. All rights reserved.
 *
 * This program is licensed to you under the Apache License Version 2.0,
 * and you may not use this file except in compliance with the Apache License Version 2.0.
 * You may obtain a copy of the Apache License Version 2.0 at http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the Apache License Version 2.0 is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Apache License Version 2.0 for the specific language governing permissions and limitations there under.
 */

import { Event } from './event';
import { Field } from './types';
import { EVENT_STRUCTURE, LATITUDE_INDEX, LONGITUDE_INDEX } from './structure';

/**
 * Convert an aray of field values to a JSON whose keys are the field names.
 *
 * @param event Array of values for the event.
 * @return JSON for the event.
 */
function jsonifyGoodEvent(event: string[]): Event {
  if (event.length !== Object.keys(EVENT_STRUCTURE).length) {
    throw new TypeError('Wrong event fields number.');
  }

  const errors = [] as string[];
  const output = Object.keys(EVENT_STRUCTURE)
    .reduce((fields, key, index) => {
      if (event[index]) {
        try {
          fields.push(...EVENT_STRUCTURE[key as keyof typeof EVENT_STRUCTURE](key, event[index]));
        } catch (error) {
          errors.push((error as Error).message);
        }
      }

      return fields;
    }, [] as Field[])
    .reduce((result, { key, value }) => Object.assign(result, { [key]: value }), {} as Event);

  if (errors.length) {
    throw new TypeError(errors.join('\n'));
  }

  if (event[LATITUDE_INDEX] && event[LONGITUDE_INDEX]) {
    output.geo_location = `${event[LATITUDE_INDEX]},${event[LONGITUDE_INDEX]}`;
  }

  return output;
}

/**
 * Convert an Amazon Kinesis record to a JSON object.
 *
 * @param event Byte array representation of an enriched event string.
 * @return JSON for the event.
 */
export function transform(event: string): Event {
  return jsonifyGoodEvent(event.split('\t'));
}

export type { Event } from './event';
