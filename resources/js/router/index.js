import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import ProductList from '../components/ProductList.vue'
import ProductForm from '../components/ProductForm.vue'
// Import other components as needed

const routes = [
  { 
    path: '/login', 
    name: 'Login', 
    component: Login 
  },
  { 
    path: '/products', 
    name: 'ProductList', 
    // component: ProductList 
    component: () => import('../components/ProductList.vue'), // Lazy load this component

  },
  { 
    path: '/products/create', 
    name: 'ProductCreate', 
    component: ProductForm 
  },
  { 
    path: '/products/:id/edit', 
    name: 'ProductEdit', 
    component: ProductForm, 
    props: true 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('token')

  if (authRequired && !loggedIn) {
    return next({ name: 'Login' })
  }

  next()
})

export default router
