import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/UserLogin.vue')
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: () => import('../views/UserRegister.vue')
  },
  {
    path: "/home",
    name: 'Home',
    component: () => import('../views/MyHome.vue'),
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    const token = localStorage.getItem('authToken');

    if (!token) {
     
      next({ name: 'login' });
    } else {
      
      next();
    }
  } else {
   
    next();
  }
})

export default router;
