import * as Types from '../types';

it('should parse string', () => {
  expect(Types.String('key', 'value')).toEqual([{ key: 'key', value: 'value' }]);
});

it('should parse integer', () => {
  expect(Types.Integer('key', '123.456')).toEqual([{ key: 'key', value: 123 }]);
  expect(() => Types.Integer('key', 'string')).toThrow();
});

it('should parse float', () => {
  expect(Types.Double('key', '123.456')).toEqual([{ key: 'key', value: 123.456 }]);
  expect(() => Types.Double('key', 'string')).toThrow();
});

it('should parse boolean', () => {
  expect(Types.Boolean('key', '0')).toEqual([{ key: 'key', value: false }]);
  expect(Types.Boolean('key', '1')).toEqual([{ key: 'key', value: true }]);
  expect(() => Types.Boolean('key', '2')).toThrow();
});

it('should parse timestamp', () => {
  expect(Types.Timestamp('key', '2017-01-11 10:20:17')).toEqual([{ key: 'key', value: '2017-01-11T10:20:17Z' }]);
});

it('should parse contexts', () => {
  expect(Types.Contexts('', JSON.stringify({
    data: [{
        data: { unique: true },
        schema: 'iglu:com.acme/unduplicated/jsonschema/1-0-0',
      },
      {
        data: { value: 1 },
        schema: 'iglu:com.acme/duplicated/jsonschema/1-0-0',
      },
      {
        data: { value: 2 },
        schema: 'iglu:com.acme/duplicated/jsonschema/1-0-0',
      }
    ],
    schema: 'iglu:com.snowplowanalytics.snowplow/contexts/jsonschema/1-0-0',
  }))).toEqual([{
      key: 'contexts_com_acme_unduplicated_1',
      value: [
        { unique: true },
      ]
    },
    {
      key: 'contexts_com_acme_duplicated_1',
      value: [
        { value: 1 },
        { value: 2 },
      ]
    },
  ]);
});

it('should parse unstruct', () => {
  expect(Types.Unstruct('', JSON.stringify({
    data: {
      data: { key: 'value' },
      schema: 'iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1',
    },
    schema: 'iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0',
  }))).toEqual([{
    key: 'unstruct_event_com_snowplowanalytics_snowplow_link_click_1',
    value: { key: 'value' },
  }, ]);

  expect(() => Types.Unstruct('', JSON.stringify({
    schema: 'iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0',
    data: {},
  }))).toThrow();
});

it('should fail on schema', () => {
  expect(() => Types.Unstruct('', JSON.stringify({
    data: {
      data: { key: 'value' },
      schema: 'something',
    },
    schema: 'iglu:com.snowplowanalytics.snowplow/unstruct_event/jsonschema/1-0-0',
  }))).toThrow();
});
