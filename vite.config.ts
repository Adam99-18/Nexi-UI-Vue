import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        transformAssetUrls: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
      "~": resolve(__dirname, "."),
      "@@": resolve(__dirname, "."),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "antd/index.ts"),
      name: "NexiUI",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "nexi-ui.js" : "nexi-ui.cjs"),
    },
    rollupOptions: {
      external: (id) =>
        id.startsWith("/static/") ||
        [
          "vue",
          "ant-design-vue",
          "@ant-design/icons-vue",
          "dayjs",
          "lodash-es",
          "sortablejs",
          "vuedraggable",
        ].includes(id),
      output: {
        globals: {
          vue: "Vue",
          "ant-design-vue": "antd",
          "@ant-design/icons-vue": "AntDesignIconsVue",
          dayjs: "dayjs",
          "lodash-es": "_",
          sortablejs: "Sortable",
          vuedraggable: "VueDraggable",
        },
        exports: "named",
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
});
