import type { App } from "vue";
import useElement from './element'
import useGlobalComp from './globalComp'
import usePrismjs from './prismjs'

export default {
  install(app: App) {
    app.use(useElement)
    app.use(usePrismjs)
    app.use(useGlobalComp)
  },
};
