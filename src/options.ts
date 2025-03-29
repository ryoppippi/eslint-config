import type antfu from '@antfu/eslint-config';
import type { TailwindCssOptions, TanstackStartOptions } from './rules';

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

	/**
	 * Enable tanstackRouter rules.
	 *
	 * Requires installing:
	 * - `@tanstack/eslint-plugin-router`
	 *
	 * @default false
	 */
	tanstackRouter?: boolean;

	/**
	 * Enable tanstackStart rules.
	 *
	 * This auto enabled `@tanstack/eslint-plugin-router` and `@tanstack/eslint-plugin-tanstackQuery`
	 * If you want to disable them, you can set `tanstackQuery` and `tanstackRouter` to `false`
	 *
	 * @default false
	 */
	tanstackStart?: boolean | TanstackStartOptions;
};
export type UserConfigs = Parameters<typeof antfu>[1];
export type ESLintConfig = ReturnType<typeof antfu>;
