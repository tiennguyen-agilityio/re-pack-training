import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import { NativeWindPlugin } from '@callstack/repack-plugin-nativewind';
import { ReanimatedPlugin } from '@callstack/repack-plugin-reanimated';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default Repack.defineRspackConfig({
  context: __dirname,
  entry: './index.js',
  resolve: {
    ...Repack.getResolveOptions(),
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@/components': path.resolve(process.cwd(), 'src/components'),
      '@/hooks': path.resolve(process.cwd(), 'src/hooks'),
      '@/stores': path.resolve(process.cwd(), 'src/stores'),
      '@/providers': path.resolve(process.cwd(), 'src/providers'),
      '@/themes': path.resolve(process.cwd(), 'src/themes'),
    },
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
            configFile: path.resolve(__dirname, 'babel.config.cjs'),
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
		new ReanimatedPlugin({
      unstable_disableTransform: true,
    }),
		new Repack.RepackPlugin(),
	],
});
