# Snowplow JavaScript and TypeScript Analytics SDK

[![NPM](https://img.shields.io/npm/v/snowplow-analytics-sdk.svg)](https://www.npmjs.com/package/snowplow-analytics-sdk)
[![Build Status](https://travis-ci.org/snowplow-incubator/snowplow-js-analytics-sdk.svg?branch=master)](https://travis-ci.org/snowplow-incubator/snowplow-js-analytics-sdk)
[![Code Coverage](https://codecov.io/gh/snowplow-incubator/snowplow-js-analytics-sdk/badge.svg?branch=master)](https://codecov.io/gh/snowplow-incubator/snowplow-js-analytics-sdk?branch=master)
[![License][license-image]][license]

This JavaScript SDK provides an ability to work with [Snowplow enriched events](https://github.com/snowplow/snowplow/wiki/canonical-event-model) in your JavaScript or TypeScript event processing, data modeling, and machine-learning jobs. You can also use this SDK with [AWS Lambda](https://aws.amazon.com/lambda/).

Currently, the JavaScript Analytics SDK provides the [JSON Event Transformer](https://github.com/snowplow/snowplow/wiki/Python-Analytics-SDK-Event-Transformer#the-json-event-transformer) only.

You can find more information about Snowplow Analytics SDKs in general on [Snowplow Wiki](https://github.com/snowplow/snowplow/wiki/Snowplow-Analytics-SDK).

## Install
```bash
npm install --save snowplow-analytics-sdk
```

## Usage
In your `app.js`:
```javascript
const transform = require('snowplow-analytics-sdk').transform;

module.exports.handler = input => {
  let event = transform(
    new Buffer(input.Records[0].kinesis.data, 'base64').toString('utf8')
  );

  // ...
};
```

Or in `app.ts`:
```typescript
import { transform } from 'snowplow-analytics-sdk';

export function handler(input: any) {
  let event = transform(
    new Buffer(input.Records[0].kinesis.data, 'base64').toString('utf8')
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

The Snowplow Scala Analytics SDK is copyright 2018-2018 dokmic, Snowplow Analytics Ltd.

Licensed under the **[Apache License, Version 2.0][license]** (the "License");
you may not use this software except in compliance with the License.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[license]: http://www.apache.org/licenses/LICENSE-2.0
[license-image]: http://img.shields.io/badge/license-Apache--2-blue.svg?style=flat
