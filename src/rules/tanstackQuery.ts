import type { TypedFlatConfigItem } from '@antfu/eslint-config';

import { ensurePackages, interopDefault } from '@antfu/eslint-config';

export async function tanstackQuery(enabled: boolean = false): Promise<TypedFlatConfigItem[]> {
	if (!enabled) {
		return [];
	}

	await ensurePackages(['@tanstack/eslint-plugin-query']);

	const pluginTanstackQuery = await interopDefault(import('@tanstack/eslint-plugin-query'));
	return [
		...pluginTanstackQuery.configs['flat/recommended'],
	];
}
