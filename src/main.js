import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
// import Vuex from 'vuex'
import 'vuetify/dist/vuetify.min.css'
import store from './store/index'


import axios from 'axios'
import VueAxios from 'vue-axios'
 
// Vue.use(Vuex)
Vue.use(VueAxios, axios)


Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
