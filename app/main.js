import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

import Login from './components/login.vue'
import Regist from './components/regist.vue'
import Main from './components/main.vue'
import Req from './components/req.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/regist', component: Regist },
  { path: '/main', component: Main },
  { path: '/req', component: Req}
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(transition => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App)
}).$mount('#app1')

// router.replace('/login')
