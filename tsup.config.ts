import { defineConfig, type Options } from 'tsup'

const defaultTsupConfig: Options = {
  format: ['esm'],
  dts: true,
  bundle: true,
  clean: true,
  minify: false,
  treeshake: true,
}

export default defineConfig({
  ...defaultTsupConfig,
  name: 'react-fontawesome-light',
  entry: ['src/index.ts'],
  outDir: 'dist',
})
