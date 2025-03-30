import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	rollup: {
		inlineDependencies: [
			'defu',
			'pathe',
		],
	},
});
