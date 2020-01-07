import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/normalize.css";
import "./assets/iconfont/iconfont.css";
import { Progress } from "vant";
import "vant/lib/index.css";

Vue.config.productionTip = false;
Vue.use(Progress);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
