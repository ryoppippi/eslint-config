import type { ESLintConfig, UserOptions } from './options';
import { defu } from 'defu';
import { ryoppippi as baseRyoppippi } from './index';

export const ryoppippi = (async (options, ...args): Promise<ESLintConfig> => {
	const _options = defu(
		options,
		{
			type: 'app',
			next: true,
			react: true,
			svelte: false,
			tailwindcss: { strict: true },
		} as const satisfies UserOptions,
	);

	return baseRyoppippi(
		_options,
		{
			rules: {
				'antfu/no-top-level-await': 'off', // Allow top-level await
				'node/prefer-global/process': 'off', // Allow using `process.env`
				'no-console': 'off', // Allow using `console`
			},
		},
		...args,
	);
}) satisfies typeof baseRyoppippi;
