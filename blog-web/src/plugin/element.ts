import type { App } from "vue";
// element plus
import ElementPlus, { ElMessage, ElPagination } from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";


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
    app.config.globalProperties.$message = ElMessage;
  }
}
