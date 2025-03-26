import type { TypedFlatConfigItem } from '@antfu/eslint-config';
import { interopDefault } from '@antfu/eslint-config';

/**
 * Tailwind CSS configuration.
 */
export async function tailwind(enabled: boolean = false): Promise<TypedFlatConfigItem[]> {
	const tailwind = await interopDefault(import('eslint-plugin-tailwindcss'));

	if (enabled) {
		// because of type mismatch, we need to cast the return value
		return tailwind.configs['flat/recommended'] as TypedFlatConfigItem[];
	}
	return [];
}
