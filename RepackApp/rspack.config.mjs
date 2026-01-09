import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import { NativeWindPlugin } from '@callstack/repack-plugin-nativewind';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default Repack.defineRspackConfig({
  context: __dirname,
  entry: './index.js',
  resolve: {
    ...Repack.getResolveOptions(),
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        type: 'javascript/auto',
        use: {
          loader: '@callstack/repack/babel-swc-loader',
          parallel: true,
          options: {
            root: __dirname,
            configFile: path.resolve(__dirname, 'babel.config.js'),
          },
        },
      },

      ...Repack.getAssetTransformRules(),
    ],
  },
	ignoreWarnings: [
		{
			module: /react-native-worklets/,
		},
	],
  plugins: [
		new NativeWindPlugin(),
		new Repack.RepackPlugin(),
	],
});
