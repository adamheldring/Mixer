import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	// Config for base path is necessary for gh-pages to point to repo folder,
	// but not needed when using config that already points to the mixer folder (mixer.[domain].com)
	kit: {
		adapter: adapter()
		// paths: {
		// 	base: process.env.NODE_ENV === "production" ? "/mixer" : ""
		// }
	}
};

export default config;
