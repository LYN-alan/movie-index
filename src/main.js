// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUi, { Loading } from 'element-ui'
import store from '@/store/index';
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueLazyLoad from 'vue-lazyload'
Vue.use(elementUi)

Vue.config.productionTip = false

Vue.use(VueQuillEditor)

Vue.use(VueLazyLoad,{
  error:require('@/assets/image/img-err.jpeg'),
  Loading:require('@/assets/image/img-err.jpeg'),
  attempt:3
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
