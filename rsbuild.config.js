import { defineConfig } from "@rsbuild/core";
import { pluginVue2 } from "@rsbuild/plugin-vue2";
import path from "path";

let publicPath = "";
let outputDir = "";
let entry = {};
console.log(process.env.mode, "process.env.mode");
if (process.env.mode?.includes("hotel")) {
  publicPath = process.env.NODE_ENV !== "development" ? "/trip/app/" : "/app/";
  outputDir = "app";
  entry.index = "./src/main.js";
} else if (process.env.mode?.includes("train")) {
  publicPath =
    process.env.NODE_ENV !== "development" ? "/trip/app/train/" : "/app/train/";
  outputDir = "app/train";
  entry.train = "./src/train.js";
  // 加以下配置后页面刷新不会404
  //   if (process.env.NODE_ENV === "development") {
  //     entry.index = "./src/train.js";
  //   } else {
  //     entry.train = "./src/train.js";
  //   }
}

export default defineConfig({
  plugins: [pluginVue2()],
  source: {
    entry,
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env": JSON.stringify(process.env)
    },
    alias: {
      "@": path.resolve(__dirname, "./src"),
      vue$: "vue/dist/vue.esm.js"
    }
  },
  html: {
    template: "public/index.html",
  },
  output: {
    assetPrefix: publicPath,
    distPath: {
      root: outputDir
    }
  },

  dev: {
    assetPrefix: publicPath
  },
  server: {
    base: "/app/"
  }
});
