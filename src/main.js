import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import { MdAutocomplete } from 'vue-material/dist/components';

Vue.config.productionTip = false;
Vue.use(MdAutocomplete);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
