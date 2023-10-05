import type { App } from "vue";
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.min.css"
import "prismjs/plugins/toolbar/prism-toolbar.min.css"
import "prismjs/plugins/toolbar/prism-toolbar.min.js"
import "prismjs/plugins/show-language/prism-show-language.min.js"
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js"
import "prismjs/plugins/line-numbers/prism-line-numbers.min.css"

declare module "vue" {
  export interface ComponentCustomProperties {
    $prism: typeof Prism;
  }
}

export default {
  install(app: App) {
    app.config.globalProperties.$prism = Prism;
  }
}