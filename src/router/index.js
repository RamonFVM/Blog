import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
 
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/',
    name:'login',
    component:()=> import ('../views/UserLogin.vue')
  },
  {
    path:'/registrar',
    name:'registrar',
    component:()=> import('../views/UserRegister.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
