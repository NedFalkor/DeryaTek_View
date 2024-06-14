<template>
  <div class="container">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import userService from '@/services/userService'

export default defineComponent({
  name: 'RegisterForm',
  setup () {
    const email = ref('')
    const username = ref('')
    const password = ref('')

    const register = async () => {
      try {
        const response = await userService.register(email.value, username.value, password.value)
        console.log('User registered successfully:', response)
        // Optionally, you can redirect the user to the login page or home page
      } catch (error: any) {
        console.error('Error registering user:', error.message)
      }
    }

    return {
      email,
      username,
      password,
      register
    }
  }
})
</script>

<style scoped>
.container {
  margin: 20px;
}

form div {
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
}
</style>
