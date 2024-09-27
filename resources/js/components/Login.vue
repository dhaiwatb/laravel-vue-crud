<template>
	<div class="login-container">
	  <h2>Login</h2>
	  <form @submit.prevent="login">
		<input v-model="email" type="email" placeholder="Email" required>
		<input v-model="password" type="password" placeholder="Password" required>
		<button type="submit">Login</button>
	  </form>
	  <p v-if="error" class="error">{{ error }}</p>
	</div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const router = useRouter()

  onMounted(() => {
  console.log('Login component mounted')
})
  
  const login = async () => {
	error.value = '' // Clear any previous errors
	try {
	  const response = await axios.post('/api/login', {
		email: email.value,
		password: password.value
	  })
	  localStorage.setItem('token', response.data.token)
	  router.push({ name: 'ProductList' })
	} catch (err) {
	  console.error('Login failed:', err)
	  error.value = 'Login failed. Please check your credentials.'
	}
  }
  </script>
  
  <style scoped>
  .login-container {
	max-width: 300px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
  }
  
  input {
	width: 100%;
	padding: 10px;
	margin-bottom: 10px;
  }
  
  button {
	width: 100%;
	padding: 10px;
	background-color: #4CAF50;
	color: white;
	border: none;
	cursor: pointer;
  }
  
  .error {
	color: red;
  }
  </style>