/// <reference types="vite/client" />

declare module "element-plus/dist/locale/zh-cn.mjs";

declare module "*.vue" {
  import { App, defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void;
  };
  export default component;
}

declare module "APlayer";