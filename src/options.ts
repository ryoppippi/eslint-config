import type antfu from "@antfu/eslint-config";
import type { TailwindOptions } from "./rules";

export type UserOptions = Parameters<typeof antfu>[0] & {
	/**
	 * Enable tailwind rules.
	 *
	 * Requires installing:
	 * - `eslint-plugin-tailwindcss`
	 *
	 * @default false
	 */
	tailwind?: boolean | TailwindOptions;
};
export type UserConfigs = Parameters<typeof antfu>[1];
export type ESLintConfig = ReturnType<typeof antfu>;
