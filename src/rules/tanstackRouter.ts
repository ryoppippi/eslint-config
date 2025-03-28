import type { TypedFlatConfigItem } from '@antfu/eslint-config';

import { interopDefault } from '@antfu/eslint-config';

export async function tanstackRouter(enabled: boolean = false): Promise<TypedFlatConfigItem[]> {
	if (!enabled) {
		return [];
	}

	const pluginTanstackRouter = await interopDefault(import('@tanstack/eslint-plugin-router'));
	return [
		...pluginTanstackRouter.configs['flat/recommended'],
	];
}
