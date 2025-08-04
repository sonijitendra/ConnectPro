import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorModal from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),

    runtimeErrorModal(),
  ],
  resolve: {
    alias: {
      "@": path.resolve("client/src"),
      "@shared": path.resolve("shared"),
      "@assets": path.resolve("client/src/assets"),
    },
  },
  root: path.resolve("client"),
  base: "/",
  publicDir: path.resolve("client/public"),
  build: {
    outDir: path.resolve("dist"),
    emptyOutDir: true,
  },
});