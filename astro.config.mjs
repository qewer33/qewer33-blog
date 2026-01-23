import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkGemoji from 'remark-gemoji';
import rehypeFigureCaptions from './src/utils/rehype-figure-captions.js';

export default defineConfig({
	site: 'https://blog.qewer.dev/',
	integrations: [
        mdx(),
    ],
    markdown: {
        gfm: true,
        remarkPlugins: [
            remarkGemoji
        ],
        rehypePlugins: [
            rehypeFigureCaptions
        ],
        shikiConfig: {
            theme: "one-dark-pro",
            wrap: false,
        }
    }
});
