import type { App } from "vue";
import Prism from "prismjs"

// 导入所需的语言模块
import "prismjs/components/prism-javascript.min.js"
import "prismjs/components/prism-jsx.min.js"
import "prismjs/components/prism-python.min.js"
import "prismjs/components/prism-typescript.min.js"

// 导入主题样式
import "prismjs/themes/prism-tomorrow.min.css"

/**
 * 导入插件
 */
// 工具栏底座
import "prismjs/plugins/toolbar/prism-toolbar.min.css"
import "prismjs/plugins/toolbar/prism-toolbar.min.js"
// 工具栏-语言显示
import "prismjs/plugins/show-language/prism-show-language.min.js"
// 工具栏-复制
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"
// 行序号
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