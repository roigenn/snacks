import Vue from "vue";
import App from "./App.vue";
import Argon from "./plugins/argon-kit";
import { store } from "./store/store";
import { router } from "./router";
import axios from "axios";
import toasted from "vue-toasted";
import VueFilterDateFormat from "vue-filter-date-format";
import "vue-search-select/dist/VueSearchSelect.css";

Vue.use(VueFilterDateFormat);
Vue.use(Argon);
Vue.use(toasted, {
  duration: 2000,
  theme: "bubble",
  position: "bottom-right",
});

Vue.config.productionTip = false;

//#region Axios
axios.defaults.baseURL = "http://localhost:5000/";

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
