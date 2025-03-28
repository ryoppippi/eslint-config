import type { TypedFlatConfigItem } from '@antfu/eslint-config';

import { interopDefault } from '@antfu/eslint-config';

export async function ryoppippi(enabled: boolean = false): Promise<TypedFlatConfigItem[]> {
	if (!enabled) {
		return [];
	}

	const pluginRyoppippi = await interopDefault(import('eslint-plugin-ryoppippi'));
	return [
		...pluginRyoppippi.configs['flat/recommended'],
	];
}
