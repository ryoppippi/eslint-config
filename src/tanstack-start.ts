import type { ESLintConfig, UserConfigs } from './options';
import { defu } from 'defu';
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
			ignores: [
				`${appDirectory}/client.tsx`,
				`${appDirectory}/ssr.tsx`,
				`${appDirectory}/router.tsx`,
				`${appDirectory}/routeTree.gen.ts`,
			],
		},
		...args,
	);
}) satisfies typeof baseRyoppippi;
