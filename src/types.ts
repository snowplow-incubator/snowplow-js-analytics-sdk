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

const SCHEMA_PATTERN = /.+:([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_-]+)\/[^/]+\/(.*)/;

interface Context {
  schema: string;
  data: unknown;
}

/**
 * Elasticsearch field.
 */
export interface Field<Type = unknown> {
  key: string;
  value: Type;
}

/**
 * Create an Elasticsearch field name from a schema.
 *
 * @param prefix Prefix for the result name.
 * @param schema Schema field from an incoming JSON.
 * @return Elasticsearch field name.
 */
function fixSchema(prefix: string, schema: string): string {
  const match = SCHEMA_PATTERN.exec(schema);

  if (!match) {
    throw new TypeError('Wrong schema format.');
  }

  const [, organization, name, version] = match;
  const snakeCaseOrganization = organization.replace(/[.-]/g, '_').toLowerCase();
  const snakeCaseName = name.replace(/([^A-Z_])([A-Z])/g, '$1_$2').toLowerCase();
  const [model] = version.split('-');

  return [prefix, snakeCaseOrganization, snakeCaseName, model].join('_');
}

/**
 * Convert a contexts JSON to an Elasticsearch-compatible Object.
 *
 * @param contexts List of inner custom context JSONs.
 * @return List of validated tuples containing a fixed schema string and the original data Object.
 */
export function Contexts(key: string, contexts: string): Field[] {
  const distinctContexts = (JSON.parse(contexts).data as Context[]).reduce((result, context) => {
    const schema = fixSchema('contexts', context.schema);

    if (!result[schema]) {
      // eslint-disable-next-line no-param-reassign
      result[schema] = [];
    }

    result[schema].push(context.data);

    return result;
  }, {} as Record<string, unknown[]>);

  // eslint-disable-next-line no-shadow
  return Object.entries(distinctContexts).map(([key, value]) => ({ key, value }));
}

/**
 * Convert an unstructured event JSON to an Elasticsearch-compatible Object.
 *
 * @param unstruct Unstructured event JSON.
 * @return Unstructured event JSON in an Elasticsearch-compatible format.
 */
export function Unstruct(key: string, unstruct: string): Field[] {
  const context = JSON.parse(unstruct).data as Context;

  if (!Object.prototype.hasOwnProperty.call(context, 'data')) {
    throw new TypeError('Could not extract inner data field from unstructured event.');
  }

  return [
    {
      key: fixSchema('unstruct_event', context.schema),
      value: context.data,
    },
  ];
}

export function String(key: string, value: string): Field<string>[] {
  return [{ key, value }];
}

export function Integer(key: string, value: string): Field<number>[] {
  const converted = Number.parseInt(value, 10);
  if (Number.isNaN(converted)) {
    throw new TypeError(`Invalid value for field '${key}'.`);
  }

  return [{ key, value: converted }];
}

export function Double(key: string, value: string): Field<number>[] {
  const converted = Number.parseFloat(value);
  if (Number.isNaN(converted)) {
    throw new TypeError(`Invalid value for field '${key}'.`);
  }

  return [{ key, value: converted }];
}

/**
 * Convert '0' to false and '1' to true.
 *
 * @param key The field name.
 * @param value The field value - should be '0' or '1'.
 */
export function Boolean(key: string, value: string): Field<boolean>[] {
  if (value !== '0' && value !== '1') {
    throw new TypeError(`Invalid value for field '${key}'.`);
  }

  return [{ key, value: value === '1' }];
}

/**
 * Convert a string timestamp to numeric.
 *
 * @param key The field name.
 * @param value Timestamp of the form YYYY-MM-DD hh:mm:ss.
 */
export function Timestamp(key: string, value: string): Field<string>[] {
  return [{ key, value: `${value.replace(' ', 'T')}Z` }];
}
