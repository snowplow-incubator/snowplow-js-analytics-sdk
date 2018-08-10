/*
 * Copyright (c) 2018-2018 dokmic, Snowplow Analytics Ltd. All rights reserved.
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
type Context = { schema: string, data: any };
const SCHEMA_PATTERN = new RegExp(".+:([a-zA-Z0-9_\.]+)/([a-zA-Z0-9_\-]+)/[^/]+/(.*)");

/**
 * Elasticsearch field
 */
export type Field < Type = any > = { key: string, value: Type };

/**
 * Create an Elasticsearch field name from a schema
 *
 * @param prefix Prefix for the result name
 * @param schema Schema field from an incoming JSON
 * @return Elasticsearch field name
 */
function fixSchema(prefix: string, schema: string): string {
  const match = schema.match(SCHEMA_PATTERN);

  if (!match) {
    throw new TypeError('Wrong schema format.');
  }

  const snakeCaseOrganization = match[1].replace(/\./g, '_').toLowerCase(),
    snakeCaseName = match[2].replace(/([^A-Z_])([A-Z])/g, '$1_$2').toLowerCase(),
    model = match[3].split('-')[0];

  return ([prefix, snakeCaseOrganization, snakeCaseName, model]).join('_');
}

/**
 * Convert a contexts JSON to an Elasticsearch-compatible Object
 *
 * @param contexts List of inner custom context JSONs
 * @return List of validated tuples containing a fixed schema string and the original data Object
 */
export function Contexts(key: string, contexts: string): Field[] {
  const distinctContexts = (JSON.parse(contexts).data as Context[])
    .reduce((contexts, context) => {
      const schema = fixSchema('contexts', context.schema);

      if (!contexts[schema]) {
        contexts[schema] = [context.data];
      } else {
        contexts[schema].push(context.data);
      }

      return contexts;
    }, {});

  return Object.keys(distinctContexts).map(key => Object({
    key,
    value: distinctContexts[key],
  }));
}

/**
 * Convert an unstructured event JSON to an Elasticsearch-compatible Object
 *
 * @param unstruct Unstructured event JSON
 * @return Unstructured event JSON in an Elasticsearch-compatible format
 */
export function Unstruct(key: string, unstruct: string): Field[] {
  const context = JSON.parse(unstruct).data as Context;

  if (!context.hasOwnProperty('data')) {
    throw new TypeError('Could not extract inner data field from unstructured event.');
  }

  return [{
    key: fixSchema('unstruct_event', context.schema),
    value: context.data
  }];
}

export function String(key: string, value: string): Array < Field < string >> {
  return [{ key, value }];
}

export function Integer(key: string, value: string): Array < Field < number >> {
  const converted = Number.parseInt(value);
  if (Number.isNaN(converted)) {
    throw new TypeError("Invalid value for field '" + key + "'.");
  }

  return [{ key, value: converted }];
}

export function Double(key: string, value: string): Array < Field < number >> {
  const converted = Number.parseFloat(value);
  if (Number.isNaN(converted)) {
    throw new TypeError("Invalid value for field '" + key + "'.");
  }

  return [{ key, value: converted }];
}

/**
 * Convert '0' to false and '1' to true
 *
 * @param {string} key The field name
 * @param {string} value The field value - should be '0' or '1'
 */
export function Boolean(key: string, value: string): Array < Field < boolean >> {
  if ('0' !== value && '1' !== value) {
    throw new TypeError("Invalid value for field '" + key + "'.");
  }

  return [{ key, value: value === '1' }];
}

/**
 * Convert a string timestamp to numeric
 *
 * @param key The field name
 * @param value Timestamp of the form YYYY-MM-DD hh:mm:ss
 */
export function Timestamp(key: string, value: string): Array < Field < string >> {
  return [{ key, value: value.replace(' ', 'T') + 'Z' }];
}
