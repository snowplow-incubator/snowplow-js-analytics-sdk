/*
 * Copyright (c) 2018-2019 dokmic, Snowplow Analytics Ltd. All rights reserved.
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

function encode(event: object): string {
  return Object.keys(event)
    .map((key) => event[key])
    .join('\t');
}

describe('transform', () => {
  it('should be transformed', () => {
    expect(transform(encode(event))).toMatchSnapshot();
  });

  it('should fail on fields number', () => {
    expect(() => transform(encode({ a: '1', b: '2' }))).toThrow('Wrong event fields number.');
  });

  it('should fail on one field', () => {
    expect(() => transform(encode({ ...event, tr_tax_base: 'bad_tax_base' }))).toThrow(
      "Invalid value for field 'tr_tax_base'.",
    );
  });

  it('should fail on multiple fields', () => {
    expect(() =>
      transform(
        encode({
          ...event,
          dvce_ismobile: 'bad_dvce_ismobile',
          tr_tax_base: 'bad_tax_base',
        }),
      ),
    ).toThrow(["Invalid value for field 'dvce_ismobile'.", "Invalid value for field 'tr_tax_base'."].join('\n'));
  });

  it('should not return geo_location', () => {
    expect(() => transform(encode({ ...event, geo_latitude: '', geo_longitude: '' }))).not.toHaveProperty(
      'geo_location',
    );
  });
});
