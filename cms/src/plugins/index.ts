import type { App } from "vue";
import useElement from './element'
import useGlobalComp from './globalComp'
import usePrismjs from './prismjs'
import dayjs from "dayjs";

declare module "vue" {
  export interface ComponentCustomProperties {
    $dayjs: typeof dayjs;
  }
}
export default {
  install(app: App) {
    app.config.globalProperties.$dayjs = dayjs
    app.use(useElement)
    app.use(usePrismjs)
    app.use(useGlobalComp)
  },
};
