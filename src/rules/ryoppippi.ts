import type { TypedFlatConfigItem } from '@antfu/eslint-config';

import { ensurePackages, interopDefault } from '@antfu/eslint-config';

export async function ryoppippi(enabled: boolean = false): Promise<TypedFlatConfigItem[]> {
	if (!enabled) {
		return [];
	}

	await ensurePackages(['eslint-plugin-ryoppippi']);

	const pluginRyoppippi = await interopDefault(import('eslint-plugin-ryoppippi'));
	return [
		...pluginRyoppippi.configs['flat/recommended'],
	];
}
