import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // または具体的なIPアドレスを指定
    port: 3000, // 使用するポート番号
  },
});
