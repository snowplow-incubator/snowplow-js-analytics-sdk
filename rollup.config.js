/*
 * Copyright (c) 2019 dokmic, Snowplow Analytics Ltd. All rights reserved.
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

import babel from 'rollup-plugin-babel';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import terserOptions from './terser.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        exports: 'named',
        file: 'dist/index.js',
        format: 'umd',
        name: 'SnowplowAnalyticsSdk',
        sourcemap: true,
        sourcemapExcludeSources: true,
      },
      {
        file: 'dist/index.mjs',
        format: 'esm',
      },
    ],
    plugins: [
      typescript({ cacheRoot: './node_modules/.cache/rpt2' }),
      babel({ extensions: ['.ts'] }),
      terser(terserOptions)
    ],
  },

  {
    input: 'src/index.ts',
    output: [{
      file: 'dist/index.es6.mjs',
      format: 'esm',
    }],
    plugins: [
      typescript({ cacheRoot: './node_modules/.cache/rpt2' }),
      terser(terserOptions)
    ],
  },

  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [ dts() ],
  },
];
