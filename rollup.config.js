/*
 * Copyright (c) 2019-current Snowplow Analytics Ltd. All rights reserved.
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

import dts from 'rollup-plugin-dts';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        entryFileNames: '[name].js',
        exports: 'named',
        format: 'umd',
        name: 'SnowplowAnalyticsSdk',
        sourcemap: true,
        sourcemapExcludeSources: true,
      },
      {
        dir: 'dist',
        entryFileNames: '[name].mjs',
        format: 'esm',
      },
    ],
    plugins: [
      typescript({
        clean: true,
        tsconfigOverride: {
          compilerOptions: { removeComments: true },
        },
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        entryFileNames: '[name].d.ts',
        format: 'esm',
      },
    ],
    plugins: [dts()],
  },
];
