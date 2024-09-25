<template>
    <div>
        <h2>{{ isEditing ? 'Edit Product' : 'Create Product' }}</h2>
        <form @submit.prevent="submitForm">
            <input v-model="product.name" placeholder="Name" required>
            <textarea v-model="product.description" placeholder="Description" required></textarea>
            <input v-model="product.price" type="number" step="0.01" placeholder="Price" required>
            <button type="submit">{{ isEditing ? 'Update' : 'Create' }}</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const product = ref({ name: '', description: '', price: '' })
const isEditing = computed(() => !!route.params.id)

onMounted(async () => {
    if (isEditing.value) {
        await fetchProduct()
    }
})

const fetchProduct = async () => {
    try {
        const response = await axios.get(`/api/products/${route.params.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        product.value = response.data
    } catch (error) {
        console.error('Failed to fetch product:', error)
    }
}

const submitForm = async () => {
    try {
        if (isEditing.value) {
            await axios.put(`/api/products/${route.params.id}`, product.value, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        } else {
            await axios.post('/api/products', product.value, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
        }
        router.push('/products')
    } catch (error) {
        console.error('Failed to submit product:', error)
    }
}
</script>
