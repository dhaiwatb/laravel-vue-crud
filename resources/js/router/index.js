import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import ProductList from '../views/ProductList.vue'
import ProductForm from '../views/ProductForm.vue'
import About from '../views/About.vue'
// Import other components as needed

const routes = [
  { 
    path: '/login', 
    name: 'Login', 
    component: Login
    // component: () => import('../components/Login.vue') 
  },
  { 
    path: '/products', 
    name: 'ProductList', 
    component: ProductList 
    // component: () => import('../components/ProductList.vue'), // Lazy load this component

  },
  { 
    path: '/products/create', 
    name: 'ProductCreate', 
    component: ProductForm 
    // component: () => import('../components/ProductForm.vue') 
  },
  { 
    path: '/about', 
    name: 'About', 
    component: About 
    // component: () => import('../components/ProductForm.vue') 
  },
  { 
    path: '/products/:id/edit', 
    name: 'ProductEdit', 
    component: ProductForm, 
    // component: () => import('../components/ProductForm.vue'),
    props: true 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

/*router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('token')

  if (authRequired && !loggedIn) {
    return next({ name: 'Login' })
  }

  next()
})*/

router.beforeEach((to, from, next) => {
  console.log(`Router beforeEach - from: ${from.path}, to: ${to.path}`)
  const publicPages = ['/login']
  const publicRouteNames = ['About'];
  // const authRequired = !publicPages.includes(to.path)
  const authRequired = !publicPages.includes(to.path) && !publicRouteNames.includes(to.name);
  const loggedIn = localStorage.getItem('token')

  if (authRequired && !loggedIn) {
    console.log('Auth required but not logged in, redirecting to login')
    next({ name: 'Login' })
  } else {
    console.log('Proceeding to requested route')
    next()
  }
})

router.afterEach((to, from) => {
  console.log(`Router afterEach - Route changed to: ${to.path}`)
})

export default router
