import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { ensurePackages, interopDefault } from '@antfu/eslint-config';

export type TailwindCssOptions = {
	/**
	 * Allow only tailwind classes
	 *
	 * @default false
	 */
	strict?: boolean;

	/**
	 * Path to the Tailwind CSS v4 entry CSS file (the one that does `@import "tailwindcss"`).
	 * Relative paths are resolved from the current working directory.
	 * eslint-plugin-tailwindcss v4 requires this to resolve your theme.
	 */
	cssConfigPath?: string;
};

/**
 * Tailwind CSS configuration.
 */
export async function tailwindCss(options: TailwindCssOptions | boolean = false): Promise<TypedFlatConfigItem[]> {
	if (options === false) {
		return [];
	}

	await ensurePackages(['eslint-plugin-tailwindcss']);

	if (options === true) {
		options = {};
	}

	const {
		strict = false,
		cssConfigPath,
	} = options;

	const pluginTailwindcss = await interopDefault(import('eslint-plugin-tailwindcss'));
	return [
		...[pluginTailwindcss.configs.recommended].flat() as TypedFlatConfigItem[],
		{
			name: 'tailwindcss:rules',
			rules: {
				// Disable the rule that enforces the use of custom classnames
				'tailwindcss/no-custom-classname': strict ? 'error' : 'off',
			},
			settings: cssConfigPath == null ? {} : { tailwindcss: { cssConfigPath } },
		},
	];
}
