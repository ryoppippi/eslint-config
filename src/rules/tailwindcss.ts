import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { interopDefault } from '@antfu/eslint-config';

export type TailwindOptions = {
/**
 * Allow only tailwind classes
 *
 * @default false
 */
	strict?: boolean;
};

/**
 * Tailwind CSS configuration.
 */
export async function tailwind(options: TailwindOptions | boolean = false): Promise<TypedFlatConfigItem[]> {
	if (options === false) {
		return [];
	}
	if (options === true) {
		options = {};
	}

	const {
		strict = false,
	} = options;

	const pluginTailwindcss = await interopDefault(import('eslint-plugin-tailwindcss'));
	return [
		...pluginTailwindcss.configs['flat/recommended'] as TypedFlatConfigItem[],
		{
			name: 'tailwindcss:rules',
			rules: {
				// Disable the rule that enforces the use of custom classnames
				'tailwindcss/no-custom-classname': strict ? 'error' : 'off',
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
