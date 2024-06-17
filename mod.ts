import { defu } from "defu";
import { resolveTSConfig } from "pkg-types";
import { meta } from "eslint-plugin-svelte";
import antfu from "@antfu/eslint-config";
import tailwind from "eslint-plugin-tailwindcss";

type UserOptions = Parameters<typeof antfu>[0];
type UserConfigs = Parameters<typeof antfu>[1];
type ESLintConfig = ReturnType<typeof antfu>;

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
export function ryoppippi(
  options: UserOptions,
  ...args: UserConfigs[]
): ESLintConfig {
  meta.name satisfies string;

  const _options = defu(
    options,
    {
      formatters: true,
      svelte: true,
      yaml: true,
      markdown: true,
      typescript: {
        tsconfigPath: tsconfigPath,
      },
      tailwind: true,
      stylistic: {
        indent: "tab",
        quotes: "single",
        semi: true,
      },
    } as const,
  );

  return antfu(
    _options,
    [
      /** general rules */
      {
        rules: {
          /* eslint rules */
          "eqeqeq": ["error", "always", { null: "ignore" }],
          "no-unexpected-multiline": "error",
          "no-unreachable": "error",
        },
      },
      /* svelte rules */
      {
        files: ["*.svelte"],
        rules: {
          "svelte/indent": ["error", {
            indent: "tab",
            alignAttributesVertically: true,
          }],
          "svelte/html-self-closing": ["error", "all"],
          "svelte/sort-attributes": "error",
        },
      },
      ...[_options.tailwind && tailwind.configs["flat/recommended"]],
      ...args,
    ].flat(),
  );
}
