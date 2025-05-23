import Vue from "vue";
import VueLazyload from "vue-lazyload";

import error from "../assets/img/no-img.png";
import loading from "../assets/img/loading.svg";

Vue.use(VueLazyload, {
  preLoad: 1.5,
  // error: error,
  // loading: loading,
  attempt: 1,
  listenEvents: [ 'scroll' ]
});