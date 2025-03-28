import type antfu from '@antfu/eslint-config';
import type { TailwindCssOptions } from './rules';

export type UserOptions = Parameters<typeof antfu>[0] & {
	/**
	 * Enable tailwind rules.
	 *
	 * Requires installing:
	 * - `eslint-plugin-tailwindcss`
	 *
	 * @default false
	 */
	tailwindcss?: boolean | TailwindCssOptions;

	/**
	 * Enable next.js rules.
	 *
	 * Requires installing:
	 * - `@next/eslint-plugin-next`
	 *
	 * @default false
	 */
	next?: boolean;

	/**
	 * Enable tanstackQuery rules.
	 *
	 * Requires installing:
	 * - `@tanstack/eslint-plugin-tanstackQuery`
	 *
	 * @default false
	 */
	tanstackQuery?: boolean;
};
export type UserConfigs = Parameters<typeof antfu>[1];
export type ESLintConfig = ReturnType<typeof antfu>;
