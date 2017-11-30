// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';
import api from './api/index.js';
Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(VueResource);
Vue.prototype.$api=api;
/* eslint-disable no-new */

const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];
const router = new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'active'
});
router.push('/goods');
new Vue({
  el:'#app',
  router,
  template:'<App/>',
  components:{App}
});

