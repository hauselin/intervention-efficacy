import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Every route sets `prerender = true` and there is no server-side code,
		// so the whole site builds to static files. adapter-static emits plain
		// HTML/CSS/JS with no serverless functions, which also avoids
		// adapter-vercel's build-time Node version check.
		adapter: adapter()
	}
};

export default config;
