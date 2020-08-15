import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import FileContent from '../components/FileContent.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/filecontent' },
  {
    path: '/', name: 'Home', component: Home, children: [
      { path: 'filecontent', component: FileContent }]
  },
  { path: '/login', name: 'Login', component: Login },
  /*
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" * '../views/About.vue')
  }
  */
]

const router = new VueRouter({
  routes
})

//导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径转跳而来
  // next 是一个函数，表示放行
  //    1.next() 放行 2.next('/login') 强制跳转
  if (to.path == '/login') return next()
  const tokenstr = localStorage.getItem('token')
  if (!tokenstr) return next('/login')
  next()
})

export default router
