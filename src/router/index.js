import Vue from 'vue'
import VueRouter from 'vue-router'
import Main  from '../views/Main.vue'


Vue.use(VueRouter)

export default new VueRouter({
  base: process.env.BASE_URL,
  routes:[
    {path: '/', name: 'Main',redirect:'/goods', component: Main,
      children:[
        {
          path: '/goods',
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
      ],
      
    },
    
  ]
  
})
