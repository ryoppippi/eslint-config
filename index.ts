import antfu from '@antfu/eslint-config';
import { defu } from 'defu';
import { resolveTSConfig } from 'pkg-types';

type UserOptions = Parameters<typeof antfu>[0];
type UserConfigs = Parameters<typeof antfu>[1];
type ESLintConfig = ReturnType<typeof antfu>;

// eslint-disable-next-line antfu/no-top-level-await
const tsconfigPath = await resolveTSConfig();

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
