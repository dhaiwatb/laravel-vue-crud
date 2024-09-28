<template>
  <div id="app">
    <nav>
      <router-link to="/login">Login</router-link> |
      <router-link to="/products">Products</router-link> | 
      <router-link to="/about">About us</router-link>
    </nav>
    <p>Current route: {{ $route.path }}</p>
    <p>Route name: {{ $route.name }}</p>
    <p>Route component: {{ $route.matched[0]?.components?.default?.name || 'Not found' }}</p>
    <router-view v-slot="{ Component }">
      <component :is="Component" v-if="Component" />
      <p v-else>No component loaded</p>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  console.log('App component mounted')
  console.log('Current route:', route.path)
  checkAuthStatus()
})

watch(
  () => route.path,
  (newPath) => {
    console.log('Route changed to:', newPath)
    console.log('Route name:', route.name)
    console.log('Route component:', route.matched[0]?.components?.default?.name || 'Not found')
  }
)

function checkAuthStatus() {
  const token = localStorage.getItem('token')
  if (!token && route.name !== 'Login') {
    console.log('No token found, redirecting to login')
    router.push({ name: 'Login' })
  } else {
    console.log('Token found or already on login page')
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  margin-bottom: 20px;
}
</style>