/*
 * Copyright (c) 2018-current Snowplow Analytics Ltd. All rights reserved.
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

import { transform } from './index';
import { event } from './index.fixture';

function serialize(data: Record<string, unknown>): string {
  return Object.keys(data)
    .map((key) => data[key])
    .join('\t');
}

describe('transform', () => {
  it('should be transformed', () => {
    expect(transform(serialize(event))).toMatchSnapshot();
  });

  it('should fail on fields number', () => {
    expect(() => transform(serialize({ a: '1', b: '2' }))).toThrow('Wrong event fields number.');
  });

  it('should fail on one field', () => {
    expect(() => transform(serialize({ ...event, tr_tax_base: 'bad_tax_base' }))).toThrow(
      "Invalid value for field 'tr_tax_base'.",
    );
  });

  it('should fail on multiple fields', () => {
    expect(() =>
      transform(
        serialize({
          ...event,
          dvce_ismobile: 'bad_dvce_ismobile',
          tr_tax_base: 'bad_tax_base',
        }),
      ),
    ).toThrow(["Invalid value for field 'dvce_ismobile'.", "Invalid value for field 'tr_tax_base'."].join('\n'));
  });

  it('should not return geo_location', () => {
    expect(() => transform(serialize({ ...event, geo_latitude: '', geo_longitude: '' }))).not.toHaveProperty(
      'geo_location',
    );
  });
});
