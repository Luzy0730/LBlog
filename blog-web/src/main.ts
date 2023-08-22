import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// 自定义css
import "./assets/css/base.css";
// semantic-ui-css
import "semantic-ui-css/semantic.min.css";
//阿里icon
import "./assets/css/icon/iconfont.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
