import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
 
// Vue.use(VueScrollTo)
 
// You can also pass in the default options
Vue.use(VueScrollTo, {
     container: "body",
     duration: 750,
     easing: "ease",
     offset: -90,
     force: true,
     cancelable: true,
     onStart: false,
     onDone: false,
     onCancel: false,
     x: false,
     y: true
 })