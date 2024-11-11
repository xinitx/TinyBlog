import { defineConfig } from 'vite'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import react from "@vitejs/plugin-react-swc";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    chunkSplitPlugin(),
    react()
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
