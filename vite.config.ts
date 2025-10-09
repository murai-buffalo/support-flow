import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), basicSsl()],
	server: {
		https: true, // HTTPSを有効化
		host: true // ネットワークアクセスを許可
	},
	preview: {
		https: true, // HTTPSを有効化
		host: true, // ネットワークアクセスを許可
		port: 4173
	}
});
