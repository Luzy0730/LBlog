import type { App } from "vue";
// element plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

export default {
  install(app: App) {
    app.use(ElementPlus, {
      locale: zhCn,
    });
  },
};
