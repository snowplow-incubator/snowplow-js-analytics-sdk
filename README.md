# Snowplow JavaScript and TypeScript Analytics SDK

[![NPM](https://img.shields.io/npm/v/snowplow-analytics-sdk.svg)](https://www.npmjs.com/package/snowplow-analytics-sdk)
[![Tests](https://github.com/snowplow-incubator/snowplow-js-analytics-sdk/actions/workflows/tests.yaml/badge.svg?branch=master)](https://github.com/snowplow-incubator/snowplow-js-analytics-sdk/actions/workflows/tests.yaml)
[![Code Coverage](https://codecov.io/gh/snowplow-incubator/snowplow-js-analytics-sdk/badge.svg?branch=master)](https://codecov.io/gh/snowplow-incubator/snowplow-js-analytics-sdk?branch=master)
[![License][license-image]][license]

This JavaScript SDK provides an ability to work with [Snowplow enriched events](https://github.com/snowplow/snowplow/wiki/canonical-event-model) in your JavaScript or TypeScript event processing, data modeling, and machine-learning jobs. You can also use this SDK with [AWS Lambda](https://aws.amazon.com/lambda/).

Currently, the JavaScript Analytics SDK provides the [JSON Event Transformer](https://github.com/snowplow/snowplow/wiki/Python-Analytics-SDK-Event-Transformer#the-json-event-transformer) only.

You can find more information about Snowplow Analytics SDKs in general on [Snowplow Wiki](https://github.com/snowplow/snowplow/wiki/Snowplow-Analytics-SDK).

## Source acknowledgement

This SDK was contributed by [Michael Dokolin](https://github.com/dokmic) in 2018 - big thanks for the help in getting this one started and maintaining it over the years!

## Install
```bash
npm install --save snowplow-analytics-sdk
```

## Usage
In your `app.js`:
```javascript
const { transform } = require('snowplow-analytics-sdk');

module.exports.handler = (input) => {
  let event = transform(
    new Buffer(input.Records[0].kinesis.data, 'base64').toString('utf8'),
  );

  // ...
};
```

Or in `app.ts`:
```typescript
import { transform } from 'snowplow-analytics-sdk';

export function handler(input: any) {
  let event = transform(
    new Buffer(input.Records[0].kinesis.data, 'base64').toString('utf8'),
  );

  // ...
}
```

## API

### `transform(event: string): Event`
- `event: string` - TSV string containing event data.

Returns decoded [Snowplow enriched event](https://github.com/snowplow/snowplow/wiki/canonical-event-model).

## Links
- [Canonical Event Model](https://github.com/snowplow/snowplow/wiki/canonical-event-model)
- [Snowplow Analytics SDK](https://github.com/snowplow/snowplow/wiki/Snowplow-Analytics-SDK)
- [SDK Overview](https://github.com/snowplow/snowplow/wiki/Python-Analytics-SDK-Event-Transformer#overview)
- [JSON Event Transformer](https://github.com/snowplow/snowplow/wiki/Python-Analytics-SDK-Event-Transformer#the-json-event-transformer)

## Copyright and license

The Snowplow JS Analytics SDK is copyright 2018-current Snowplow Analytics Ltd.

Licensed under the **[Apache License, Version 2.0][license]** (the "License");
you may not use this software except in compliance with the License.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[license]: http://www.apache.org/licenses/LICENSE-2.0
[license-image]: http://img.shields.io/badge/license-Apache--2-blue.svg?style=flat
