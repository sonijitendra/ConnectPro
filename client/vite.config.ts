import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorModal from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [react(), runtimeErrorModal()],
  resolve: {
    alias: {
      "@": path.resolve("src"),
      "@shared": path.resolve("shared"),
      "@assets": path.resolve("src/assets"),
    },
  },
  base: "/",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
