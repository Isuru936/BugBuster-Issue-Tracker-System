import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://ingenious-freedom-production-8978.up.railway.app/",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
