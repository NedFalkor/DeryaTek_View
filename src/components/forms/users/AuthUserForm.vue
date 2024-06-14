<template>
  <div class="container">
    <h1>User Authentication</h1>

    <!-- Login Form -->
    <div v-if="showLoginForm">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="emailOrUsername">Email or Username</label>
          <input type="text" id="emailOrUsername" v-model="emailOrUsername" required>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>

    <!-- Logout Button -->
    <div v-if="isAuthenticated">
      <h2>Account Actions</h2>
      <button @click="logout">Logout</button>
      <button @click="deleteAccount">Delete Account</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import userService from '@/services/userService'
import { ICustomUser } from '@/interfaces/gatekeepers/ICustomUser'

export default defineComponent({
  name: 'AuthUserForm',
  setup () {
    const emailOrUsername = ref('')
    const password = ref('')
    const isAuthenticated = ref(false)
    const showLoginForm = ref(true) // New variable

    const handleLogin = async () => {
      try {
        const response = await userService.login(emailOrUsername.value, emailOrUsername.value, password.value)
        localStorage.setItem('token', response.token)
        isAuthenticated.value = true
        showLoginForm.value = false
      } catch (error: any) {
        console.error('Error logging in:', error.message)
      }
    }

    const logout = async () => {
      try {
        await userService.logout()
        localStorage.removeItem('token')
        isAuthenticated.value = false
        showLoginForm.value = true
      } catch (error: any) {
        console.error('Error logging out:', error.message)
      }
    }

    const deleteAccount = async () => {
      try {
        await userService.deleteAccount()
        localStorage.removeItem('token')
        isAuthenticated.value = false
        showLoginForm.value = true
      } catch (error: any) {
        console.error('Error deleting account:', error.message)
      }
    }

    return {
      emailOrUsername,
      password,
      isAuthenticated,
      handleLogin,
      logout,
      deleteAccount,
      showLoginForm // New variable
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
