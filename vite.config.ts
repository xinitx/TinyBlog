import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import react from "@vitejs/plugin-react-swc";
import {visualizer} from "rollup-plugin-visualizer";
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Inspect(),
    react(),
    visualizer({
      filename: './dist/stats.html',
      title: 'Bundle Visualizer'
    }),
    VitePWA({
      registerType: 'autoUpdate', // 注册更新模式方式  默认是autoUpdate，将会自动更新，其他还有prompt和skipWaiting
      injectRegister: 'script', // 控制如何在应用程序中注册ServiceWorker 默认值是 'auto' ，其他如：'inline' 则是注入一个简单的注册脚本，内联在应用程序入口点中
      manifest: { // manifest.json 文件配置
        name: 'TinyBlog',
        short_name: 'TinyBlog',
        description: 'TinyBlog',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {

      }
    }
  }
})
