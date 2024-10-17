<template>
    <div>
        <h2>Products</h2>
        <router-link to="/products/create">Add New Product</router-link>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{ product.name }} - ${{ product.price }}
                <router-link :to="`/products/${product.id}/edit`">Edit</router-link>
                <button @click="deleteProduct(product.id)">Delete</button>
            </li>
        </ul>
        <button @click="logout">Logout</button>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const products = ref([])
const router = useRouter()

onMounted(async () => {
    await fetchProducts()
})

const fetchProducts = async () => {
    try {
        const response = await axios.get('/api/products', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        products.value = response.data
    } catch (error) {
        console.error('Failed to fetch products:', error)
    }
}

const deleteProduct = async (id) => {
    try {
        await axios.delete(`/api/products/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        await fetchProducts()
    } catch (error) {
        console.error('Failed to delete product:', error)
    }
}

const logout = async () => {
    try {
        await axios.post('/api/logout', {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        localStorage.removeItem('token')
        router.push('/login')
    } catch (error) {
        console.error('Logout failed:', error)
    }
}
</script>
