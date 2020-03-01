import Vue from 'vue'
import VueRouter from 'vue-router'
import Main  from '../views/Main.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {
        path: '/',
        name:'Goods',
        component: () => import('../views/Goods.vue')
      },
      {
        path: '/evaluate',
        name:'Evaluate',
        component: () => import('../views/Evaluate.vue')
      },
      {
        path: '/merchant',
        name:'Merchant',
        component: () => import('../views/Merchant.vue')
      },
    ]
  },
  
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
