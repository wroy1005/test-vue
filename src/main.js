// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Sortable from 'sortablejs'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.directive('sortable', {
  inserted: function (el, binding) {
    el.style.backgroundColor = binding.value.bgColor
    new Sortable(el, binding.value || {})
  },
  update: function (el, binding) {
    console.log('update')
  },
  componentUpdated: function (el, binding) {
    console.log('componentUpdated')
  },

})

Vue.config.productionTip = false

/* eslint-disable no-new */
window.$vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
