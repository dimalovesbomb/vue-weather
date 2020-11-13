import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueMaterial from 'vue-material';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import '@/scss/index.scss';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueAwesomeSwiper)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
