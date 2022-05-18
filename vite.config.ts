import "dotenv/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
  define: {
    // use process: https://github.com/vitejs/vite/issues/1930
    "process.env": process.env,
  },
});
