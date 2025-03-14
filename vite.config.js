import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      insertTypesEntry: true,
    }),
    tsconfigPaths(),
  ],
  build: {
    cssCodeSplit: false,
    cssExtract: false,
    emptyOutDir: true,
    copyPublicDir: false,
    outDir: path.resolve(__dirname, "dist"),
    minify: true,
    // sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
