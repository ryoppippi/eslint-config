import { join } from "pathe";
import antfu from "@antfu/eslint-config";
import tailwind from "eslint-plugin-tailwindcss";
import { meta } from "eslint-plugin-svelte";

type UserConfigs = Parameters<typeof antfu>[1];
type ESLintConfig = ReturnType<typeof antfu>;

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
export function ryoppippi(...args: UserConfigs[]): ESLintConfig {
  meta.name satisfies string;

  return antfu(
    {
      formatters: true,
      svelte: true,
      yaml: true,
      markdown: true,
      typescript: {
        tsconfigPath: join(import.meta.dirname, "tsconfig.json"),
      },
      stylistic: {
        indent: "tab",
        quotes: "single",
        semi: true,
      },
    },
    /** general rules */ {
      rules: {
        /* eslint rules */
        "eqeqeq": ["error", "always", { null: "ignore" }],
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
      },
    },
    /* svelte rules */ {
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
    ...tailwind.config["flat/default"],
    ...args,
  );
}
