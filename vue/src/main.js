import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routerConfig from './router/routerConfig.js'

Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter(routerConfig);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
