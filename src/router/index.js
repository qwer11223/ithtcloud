import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import FileContent from '../components/FileContent.vue'
import Picture from '../components/Picture.vue'
import Document from '../components/Document.vue'
import Video from '../components/Video.vue'
import Music from '../components/Music.vue'
import Other from '../components/Other.vue'
import Share from '../components/Share.vue'
import Code from '../components/Code.vue'
import Recycle from '../components/Recycle.vue'



const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/filecontent/root' },
  {
    path: '/', name: 'Home', component: Home,
    children: [
      { path: 'filecontent/:path', component: FileContent },
      { path: 'picture', component: Picture },
      { path: 'document', component: Document },
      { path: 'video', component: Video },
      { path: 'music', component: Music },
      { path: 'other', component: Other },
      { path: 'share', component: Share },
      { path: 'code', component: Code },
      { path: 'recycle', component: Recycle }
    ]
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
  //mode:'history',
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
