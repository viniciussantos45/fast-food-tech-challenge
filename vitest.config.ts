import path from 'node:path'

import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      reporter: ['html', 'lcov', 'text-summary']
    },
    include: ['**/*.spec.ts'],
    globals: true,
    root: './',
    onStackTrace: (_stack) => {
      return true
    }
  },
  plugins: [swc.vite()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
