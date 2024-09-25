import { createRouter, createWebHistory } from 'vue-router';
   import Login from '../components/Login.vue';
   import ProductList from '../components/ProductList.vue';
   import ProductForm from '../components/ProductForm.vue';

   const routes = [
     { path: '/login', component: Login },
     { path: '/products', component: ProductList },
     { path: '/products/create', component: ProductForm },
     { path: '/products/:id/edit', component: ProductForm, props: true },
   ];

   const router = createRouter({
     history: createWebHistory(),
     routes,
   });

   export default router;
