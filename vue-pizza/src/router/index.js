import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Constructor from "../views/Constructor";
import Cart from "../views/Cart";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/constructor/:id',
    name: 'Constructor',
    component: Constructor
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
]

const router = new VueRouter({
  routes
})

export default router
