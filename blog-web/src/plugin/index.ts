import type { App } from "vue";
import dayjs from "dayjs";

declare module "vue" {
  export interface ComponentCustomProperties {
    $dayjs: typeof dayjs;
  }
}

const plugin = {
  install(app: App) {
    app.config.globalProperties.$dayjs = dayjs;
  },
};

export default plugin;
