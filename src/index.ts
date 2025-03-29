import type { ESLintConfig, UserConfigs, UserOptions } from './options';
import antfu from '@antfu/eslint-config';
import { defu } from 'defu';
import { resolveTSConfig } from 'pkg-types';
import { next, ryoppippi as ryoppippiRules, tailwindCss, tanstackQuery, tanstackRouter, tanstackStart } from './rules';

/**
 * @ryoppippi's ESLint configuration.
 *
 * @example
 * ```ts
 * // eslint.config.js
 * import { ryoppippi } from "@ryoppippi/eslint-config";
 *
 * export default ryoppippi();
 * ```
 */
export async function ryoppippi(
	options: UserOptions,
	...args: UserConfigs[ ]
): Promise<ESLintConfig> {
	const tsconfigPath = await resolveTSConfig().catch(() => undefined);

	const _options = defu(
		options,
		{
			formatters: true,
			svelte: true,
			yaml: true,
			markdown: true,
			typescript: {
				tsconfigPath,
				overrides: {
					'ts/consistent-type-definitions': ['error', 'type'],
					'ts/no-unused-vars': ['error', {
						args: 'none',
						destructuredArrayIgnorePattern: '^_',
					}],
				},
				overridesTypeAware: {
					'ts/strict-boolean-expressions': ['error', { allowNullableBoolean: false, allowNullableObject: false, allowString: false }],
				},
			},
			javascript: {
				overrides: {
					eqeqeq: ['error', 'always', { null: 'ignore' }],
				},
			},
			stylistic: {
				indent: 'tab',
				quotes: 'single',
				semi: true,
				jsx: true,
			},
			lessOpinionated: true,
		} as const satisfies UserOptions,
	);

	if (typeof _options.typescript !== 'boolean' && _options?.typescript?.tsconfigPath == null) {
		console.warn('tsconfig.json is not found. we cannot use type-aware rules.');
	}

	const enabledTanstackStart = _options.tanstackStart !== false;
	const enableTanstackRouter = enabledTanstackStart && _options.tanstackRouter !== false;
	const enableTanstackQuery = enabledTanstackStart && _options.tanstackQuery !== false;

	const tailwindRules = await tailwindCss(_options.tailwindcss);
	const nextJsRules = await next(_options.next);
	const tanstackStartRules = await tanstackStart(_options.tanstackStart);
	const tanstackQueryRules = await tanstackQuery(enableTanstackQuery);
	const tanstackRouterRules = await tanstackRouter(enableTanstackRouter);
	const pluginRyoppippi = await ryoppippiRules(true);

	return antfu(
		_options as UserOptions,
		/** general rules */
		{
			/** eslint rules */
			rules: {
				'no-unreachable': 'error',
				'curly': ['error', 'all'],
				'antfu/top-level-function': 'error',
			},
		},
		...pluginRyoppippi,
		...tailwindRules,
		...nextJsRules,
		...tanstackQueryRules,
		...tanstackRouterRules,
		...tanstackStartRules,
		/* svelte rules */
		(!_options.svelte)
			? {}
			: {
					files: [
						'**/*.svelte',
						'**/*.svelte',
					],
					rules: {
						'svelte/valid-compile': 'off',
						'svelte/button-has-type': 'error',
						'svelte/require-each-key': 'error',
						'svelte/valid-each-key': 'error',
						'svelte/no-reactive-literals': 'error',
						'svelte/no-reactive-functions': 'error',

						/* stylic */
						'svelte/indent': ['error', {
							indent: 'tab',
							alignAttributesVertically: true,
						}],
						'svelte/html-self-closing': ['error', 'all'],
						'svelte/sort-attributes': 'error',
						'svelte/prefer-class-directive': 'warn',
						'svelte/prefer-style-directive': 'warn',
						'svelte/first-attribute-linebreak': [
							'error',
							{
								multiline: 'below',
								singleline: 'beside',
							},
						],
					},
				},
		...args,
	);
}
