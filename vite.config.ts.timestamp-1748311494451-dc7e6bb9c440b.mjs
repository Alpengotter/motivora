// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/yu-ognev/WebstormProjects/motivora-ui/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/yu-ognev/WebstormProjects/motivora-ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/yu-ognev/WebstormProjects/motivora-ui/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///Users/yu-ognev/WebstormProjects/motivora-ui/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import svgLoader from "file:///Users/yu-ognev/WebstormProjects/motivora-ui/node_modules/vite-svg-loader/index.js";
import fs from "fs";
import path from "path";
var __vite_injected_original_dirname = "/Users/yu-ognev/WebstormProjects/motivora-ui";
var __vite_injected_original_import_meta_url = "file:///Users/yu-ognev/WebstormProjects/motivora-ui/vite.config.ts";
var vite_config_default = defineConfig(({ command, mode }) => {
  const isDevelopment = mode === "development";
  return {
    server: {
      host: "localhost.motivora.ru",
      port: 5173,
      ...isDevelopment && {
        proxy: {
          "/api/v1": {
            target: "https://motivora.ru",
            changeOrigin: true,
            secure: false,
            headers: {
              Origin: "https://motivora.ru"
            },
            credentials: "include"
          }
        },
        https: {
          key: fs.readFileSync(path.resolve(__vite_injected_original_dirname, "./certificate.key")),
          cert: fs.readFileSync(path.resolve(__vite_injected_original_dirname, "./certificate.crt"))
        }
      }
    },
    plugins: [vue(), vueJsx(), vueDevTools(), svgLoader()],
    build: {
      minify: "terser"
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveXUtb2duZXYvV2Vic3Rvcm1Qcm9qZWN0cy9tb3Rpdm9yYS11aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3l1LW9nbmV2L1dlYnN0b3JtUHJvamVjdHMvbW90aXZvcmEtdWkvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3l1LW9nbmV2L1dlYnN0b3JtUHJvamVjdHMvbW90aXZvcmEtdWkvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGUvY2xpZW50XCIgLz5cblxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcbmltcG9ydCBmcyBmcm9tICdmcydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgY29uc3QgaXNEZXZlbG9wbWVudCA9IG1vZGUgPT09ICdkZXZlbG9wbWVudCdcblxuICByZXR1cm4ge1xuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogJ2xvY2FsaG9zdC5tb3Rpdm9yYS5ydScsXG4gICAgICBwb3J0OiA1MTczLFxuICAgICAgLi4uKGlzRGV2ZWxvcG1lbnQgJiYge1xuICAgICAgICBwcm94eToge1xuICAgICAgICAgICcvYXBpL3YxJzoge1xuICAgICAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9tb3Rpdm9yYS5ydScsXG4gICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBPcmlnaW46ICdodHRwczovL21vdGl2b3JhLnJ1JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGh0dHBzOiB7XG4gICAgICAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vY2VydGlmaWNhdGUua2V5JykpLFxuICAgICAgICAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9jZXJ0aWZpY2F0ZS5jcnQnKSksXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFt2dWUoKSwgdnVlSnN4KCksIHZ1ZURldlRvb2xzKCksIHN2Z0xvYWRlcigpXSxcbiAgICBidWlsZDoge1xuICAgICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgICAgfSxcbiAgICB9LFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUdBLFNBQVMsZUFBZSxXQUFXO0FBRW5DLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQVhqQixJQUFNLG1DQUFtQztBQUF1SixJQUFNLDJDQUEyQztBQWFqUCxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNO0FBQ2pELFFBQU0sZ0JBQWdCLFNBQVM7QUFFL0IsU0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sR0FBSSxpQkFBaUI7QUFBQSxRQUNuQixPQUFPO0FBQUEsVUFDTCxXQUFXO0FBQUEsWUFDVCxRQUFRO0FBQUEsWUFDUixjQUFjO0FBQUEsWUFDZCxRQUFRO0FBQUEsWUFDUixTQUFTO0FBQUEsY0FDUCxRQUFRO0FBQUEsWUFDVjtBQUFBLFlBQ0EsYUFBYTtBQUFBLFVBQ2Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxPQUFPO0FBQUEsVUFDTCxLQUFLLEdBQUcsYUFBYSxLQUFLLFFBQVEsa0NBQVcsbUJBQW1CLENBQUM7QUFBQSxVQUNqRSxNQUFNLEdBQUcsYUFBYSxLQUFLLFFBQVEsa0NBQVcsbUJBQW1CLENBQUM7QUFBQSxRQUNwRTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxZQUFZLEdBQUcsVUFBVSxDQUFDO0FBQUEsSUFDckQsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
