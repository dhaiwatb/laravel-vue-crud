<template>
	<div>
		<h2>Login</h2>
		<form @submit.prevent="login">
			<input v-model="email" type="email" placeholder="Email" required>
			<input v-model="password" type="password" placeholder="Password" required>
			<button type="submit">Login</button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
	try {
		const response = await axios.post('/api/login', {
			email: email.value,
			password: password.value
		})
		localStorage.setItem('token', response.data.token)
		router.push('/products')
	} catch (error) {
		console.error('Login failed:', error)
	}
}
</script>
