import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'
import Regist from './components/regist.vue'
import Req from './components/req.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
const Login = resolve => {
    // 成功之后的回调
    resolve(require("./components/login.vue")); // 这就是异步加载的方式
}
const Main = resolve => {
    // 成功之后的回调
    resolve(require("./components/main.vue")); // 这就是异步加载的方式
}

const routes = [
  { path: '/login', component: Login },
  { path: '/regist', component: Regist },
  { path: '/main', component: Main ,
    children: [
      { path: '3', component: Req}
    ]
  },
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
