import type { ESLintConfig, UserConfigs } from './options';
import { defu } from 'defu';
import { join } from 'pathe';
import { ryoppippi as baseRyoppippi } from './index';

type UserOptions = Parameters<typeof baseRyoppippi>[0];

type TanstackStartOptions = {
	/**
	 * The directory where the app is located
	 *
	 * @default './app'
	 */
	appDirectory?: string;
} & UserOptions;

export const ryoppippi = (async (
	options: TanstackStartOptions,
	...args: UserConfigs[]
): Promise<ESLintConfig> => {
	const _options = defu(
		options,
		{
			type: 'app',
			next: false,
			react: true,
			svelte: false,
			tailwindcss: { strict: true },
			tanstackQuery: true,
			tanstackRouter: true,
			appDirectory: './app',
		} as const satisfies TanstackStartOptions,
	);

	const { appDirectory } = _options;

	return baseRyoppippi(
		_options,
		{
			rules: {
				'antfu/no-top-level-await': 'off', // Allow top-level await
			},
		},
		{
			files: ['**/*.tsx'],
			rules: {
				'ts/no-misused-promises': ['error', {
					checksVoidReturn: false, // happens error when we pass promises to jsx attributes https://github.com/typescript-eslint/typescript-eslint/issues/4619
				}],
			},
		},
		{
			name: 'ryoppippi/tanstack-start/disable-eslint-for-routeTree.gen.ts',
			files: [join('**', appDirectory, 'routeTree.gen.ts')],
			rules: {
				'eslint-comments/no-unlimited-disable': 'off', // routeTree.gen.ts is generated file
			},
		},
		{
			name: 'ryoppippi/tanstack-start/disable-eslint-for-router.tsx',
			files: [join('**', appDirectory, 'router.tsx')],
			rules: {
				'ts/consistent-type-definitions': 'off',
			},
		},
		{
			name: 'ryoppippi/tanstack-start/disable-eslint-for-ssr.tsx',
			files: [join('**', appDirectory, 'ssr.tsx')],
			rules: {
				'react-refresh/only-export-components': 'off',
				'ts/no-unsafe-argument': 'off', // happens on `defaultStreamHandler`
			},
		},
		...args,
	);
}) satisfies typeof baseRyoppippi;
