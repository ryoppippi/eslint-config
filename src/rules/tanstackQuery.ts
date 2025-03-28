import type { TypedFlatConfigItem } from '@antfu/eslint-config';

import { interopDefault } from '@antfu/eslint-config';

export async function tanstackQuery(enabled: boolean = false): Promise<TypedFlatConfigItem[]> {
	if (!enabled) {
		return [];
	}

	const pluginTanstackQuery = await interopDefault(import('@tanstack/eslint-plugin-query'));
	return [
		...pluginTanstackQuery.configs['flat/recommended'],
	];
}
