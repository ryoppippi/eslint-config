import type { TypedFlatConfigItem } from '@antfu/eslint-config';

export type TanstackStartOptions = {
	/**
	 * The directory where the app is located
	 *
	 * @default 'app'
	 */
	appDirectory?: string;
};

export async function tanstackStart(options: TanstackStartOptions | boolean = false): Promise<TypedFlatConfigItem[]> {
	if (options === false) {
		return [];
	}

	if (options === true) {
		options = {};
	}

	const {
		appDirectory = 'app',
	} = options;

	return [
		{
			ignores: [
				`${appDirectory}/client.tsx`,
				`${appDirectory}/ssr.tsx`,
				`${appDirectory}/router.tsx`,
				`${appDirectory}/routeTree.gen.ts`,
			],
		},
	];
}
