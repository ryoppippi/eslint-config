import { importx } from 'importx';

/** eslint-disable-next-line antfu/no-top-level-await */
const { ryoppippi } = await importx('@ryoppippi/eslint-config', import.meta.url);

export default ryoppippi({
	svelte: true,
	react: true,
	tailwind: true,
	tanstackQuery: true,
	tanstackRouter: true,
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
