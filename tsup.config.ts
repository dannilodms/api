import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  format: ['esm'],
  target: 'node18',
  dts: false, // Se true, gera arquivos de declaração TypeScript
  outDir: 'dist', // Diretório de saída opcional
  env: {},
  external: []
});
