import { tsImport } from 'tsx/esm/api';

const { ryoppippi } = await tsImport('@ryoppippi/eslint-config', import.meta.url);

export default ryoppippi({
	svelte: false,
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
