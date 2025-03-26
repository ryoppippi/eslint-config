import { interopDefault } from '@antfu/eslint-config';

/**
 * Tailwind CSS configuration.
 */
export async function tailwind(enabled: boolean = false) {
	if (!enabled) {
		return [];
	}

	const pluginTailwindcss = await interopDefault(import('eslint-plugin-tailwindcss'));
	return [
		...pluginTailwindcss.configs['flat/recommended'],
		{
			name: 'tailwindcss:rules',
			rules: {
				// Disable the rule that enforces the use of custom classnames
				'tailwindcss/no-custom-classname': 'off',
			},
			settings: {
				tailwindcss: {
					// These are the default values but feel free to customize
					callees: ['classnames', 'clsx', 'ctl', 'cn'] as const,
				},
			},
		},
	];
}
