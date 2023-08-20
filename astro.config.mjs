import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGemoji from 'remark-gemoji';

export default defineConfig({
	site: 'https://qewer.dev/',
	integrations: [
        mdx(),
    ],
    markdown: {
        gfm: true,
        remarkPlugins: [
            remarkGemoji
        ],
        shikiConfig: {
            theme: "one-dark-pro",
            wrap: false,
        }
    }
});
