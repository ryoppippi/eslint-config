import path from "pathe";
import antfu from "@antfu/eslint-config";

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
export function ryoppippi(): ReturnType<typeof antfu> {
  return antfu({
    formatters: true,
    svelte: true,
    unocss: true,
    yaml: true,
    markdown: true,
    typescript: {
      tsconfigPath: path.join(import.meta.dirname, "tsconfig.json"),
    },
    stylistic: {
      indent: "tab",
      quotes: "single",
      semi: true,
    },
  }, /** general rules */ {
    rules: {
      /* eslint rules */
      "eqeqeq": ["error", "always", { null: "ignore" }],
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
    },
  }, /* svelte rules */ {
    files: ["*.svelte"],
    rules: {
      "svelte/indent": ["error", {
        indent: "tab",
        alignAttributesVertically: true,
      }],
      "svelte/html-self-closing": ["error", "all"],
      "svelte/sort-attributes": "error",
    },
  });
}
