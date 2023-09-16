import type { App } from "vue";
import Icon from "@/components/content/icon/index.vue";
export default {
  install(app: App) {
    app.component('Icon', Icon);
  }
}