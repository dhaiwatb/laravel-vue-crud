import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App)

app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err)
  console.error('Vue instance:', vm)
  console.error('Error info:', info)
}

app.use(router)

router.onError((error) => {
  console.error('Router error:', error)
})

app.mount('#app')

console.log("Vue app is mounted successfully");