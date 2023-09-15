import type { App } from "vue";
import useElement from './element'
import usePrismjs from './prismjs'

export default {
  install(app: App) {
    app.use(useElement)
    app.use(usePrismjs)
  },
};
