import type { App } from "vue";
// element plus
import ElementPlus, { ElMessage } from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "@/assets/css/element.scss";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

declare module "vue" {
  export interface ComponentCustomProperties {
    $message: typeof ElMessage;
  }
}
export default {
  install(app: App) {
    app.use(ElementPlus, {
      locale: zhCn,
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
    app.config.globalProperties.$message = ElMessage;
  }
}
