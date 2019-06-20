import Vue from 'vue'
import Router from 'vue-router'
import '../assets/css/header.css'
import '../assets/css/reset.css'
import '../assets/css/prompt.css'

Vue.use(Router)
import Shop from '../views/shop'
import Home from '../views/home'
import Mphone from '../views/mphone'
import Pageone from '../views/page_one'
import Pagetwo from '../views/page_two'
import Pagethree from '../views/page_three'
import Pagefour from '../views/page_four'
import Pagefive from '../views/page_five'
import Item from '../views/Item'
import cart from '../views/cart'
import checkout from '../views/checkout'
import payment from '../views/Payment'
import account from '../views/account'
import order from '../views/account/order'
import address from '../views/account/address'
export default new Router({
/*	mode:'history',*/
  routes: [
    { 
    	path: '/',component: Home 
    },
     { 
    	path: '/Home',component: Home 
    },
     { 
    	path: '/Mphone',component: Mphone  
    },
     { 
    	path: '/Shop',component: Shop 
    },
     { 
    	path: '/Pageone',component: Pageone
     
    },
    { 
    	path: '/Pagetwo',component: Pagetwo
    },
    { 
    	path: '/Pagethree',component: Pagethree
    },
    { 
    	path: '/Pagefour',component: Pagefour
    },
    { 
    	path: '/Pagefive',component: Pagefive
    },
    { 
    	path: '/Item',name:'Item',component: Item
    },
    { 
    	path: '/cart',name:'cart',component: cart
    },
    { 
    	path: '/checkout',name:'checkout',component: checkout
    },
    { 
    	path: '/payment',name:'payment',component: payment
    },
    { 
    	path: '/account',
    	component: account,
    	 children:[
        {
          path: '',
          name: 'account',
          component: order
        },
    	  {
          path: 'address',
          name: 'address',
          component: address
        }]
    }
  ]
})