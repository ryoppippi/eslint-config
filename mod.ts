import { defu } from "defu";
import { resolveTSConfig } from "pkg-types";
import antfu from "@antfu/eslint-config";

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
      stylistic: {
        indent: "tab",
        quotes: "single",
        semi: true,
      },
      lessOpinionated: true,
    } as const satisfies UserOptions,
  );

  return antfu(
    _options,
    /** general rules */
    {
      rules: {
        /* eslint rules */
        "eqeqeq": ["error", "always", { null: "ignore" }],
        "ts/switch-exhaustiveness-check": ["error", {
          requireDefaultForNonUnion: true,
          allowDefaultCaseForExhaustiveSwitch: true,
        }],
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unused-vars": ["error", {
          args: "none",
          destructuredArrayIgnorePattern: "^_",
        }],
        "curly": ["error", "all"],
        "antfu/top-level-function": "error",
      },
    },
    /* svelte rules */
    {
      files: [
        "**/*.svelte",
        "**/*.svelte",
      ],
      rules: {
        "svelte/button-has-type": "error",
        "svelte/require-each-key": "error",
        "svelte/valid-each-key": "error",
        "svelte/no-reactive-literals": "error",
        "svelte/no-reactive-functions": "error",

        /* stylic */
        "svelte/indent": ["error", {
          indent: "tab",
          alignAttributesVertically: true,
        }],
        "svelte/html-self-closing": ["error", "all"],
        "svelte/sort-attributes": "error",
        "svelte/prefer-class-directive": "warn",
        "svelte/prefer-style-directive": "warn",
        "svelte/first-attribute-linebreak": [
          "error",
          {
            multiline: "below",
            singleline: "beside",
          },
        ],
      },
    },
    ...args,
  );
}
