import type { App } from "vue";
import usePrismjs from './prismjs'
import useElement from './element'
import dayjs from "dayjs";

declare module "vue" {
  export interface ComponentCustomProperties {
    $dayjs: typeof dayjs;
  }
}

const plugin = {
  install(app: App) {
    app.config.globalProperties.$dayjs = dayjs;
    app.use(usePrismjs)
    app.use(useElement)
  },
};

export default plugin;
