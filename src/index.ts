import { Field } from './types';
import { Event } from './event';
import { LATITUDE_INDEX, LONGITUDE_INDEX, EVENT_STRUCTURE } from './structure';

/**
 * Convert an aray of field values to a JSON whose keys are the field names
 *
 * @param event Array of values for the event
 * @return JSON for the event
 */
function jsonifyGoodEvent(event: string[]): Event {
  if (event.length !== Object.keys(EVENT_STRUCTURE).length) {
    throw new TypeError('Wrong event fields number.');
  }

  const errors = [] as string[],
    output = Object.keys(EVENT_STRUCTURE)
    .reduce((output: Field[], key, index) => {
      if (event[index]) {
        try {
          output.push(...EVENT_STRUCTURE[key](key, event[index]));
        } catch (e) {
          errors.push(e.message);
        }
      }

      return output;
    }, [])
    .reduce((output, field) => {
      output[field.key] = field.value;

      return output;
    }, {}) as Event;

  if (errors.length) {
    throw new TypeError(errors.join('\n'));
  }

  if (event[LATITUDE_INDEX] && event[LONGITUDE_INDEX]) {
    output['geo_location'] = '' +
      event[LATITUDE_INDEX] +
      ',' +
      event[LONGITUDE_INDEX];
  }

  return output;
}

/**
 * Convert an Amazon Kinesis record to a JSON object
 *
 * @param event Byte array representation of an enriched event string
 * @return JSON for the event
 */
export function transform(event: string) {
  return jsonifyGoodEvent(event.split('\t'));
}
