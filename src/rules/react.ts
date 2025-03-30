import type { TypedFlatConfigItem } from '@antfu/eslint-config';

export function react(enabled: unknown = false): TypedFlatConfigItem[] {
	if (enabled == null || enabled === false) {
		return [];
	}

	return [
		{
			files: ['**/*.tsx'],
			rules: {
				'ts/no-misused-promises': ['error', {
					checksVoidReturn: false, // happens error when we pass promises to jsx attributes https://github.com/typescript-eslint/typescript-eslint/issues/4619
				}],
			},
		},
	];
}
