import { importx } from 'importx';

/** eslint-disable-next-line antfu/no-top-level-await */
const { ryoppippi } = await importx('@ryoppippi/eslint-config', import.meta.url);

export default ryoppippi({
	svelte: false,
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
