import { getUser, login, register } from '@/http/authApi'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref(null)
  const errors = ref({})
  const isLoggedIn = computed(() => !!user.value)

  const fetchUser = async () => {
    try {
      const { data } = await getUser()
      user.value = data
    } catch (error) {
      user.value = null
    }
  }

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials)

      const token = response.data.token

      localStorage.setItem('token', token)
      await fetchUser()
      errors.value = {}
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  }

  const handleRegister = async (user) => {
    try {
      await register(user)
      await handleLogin({
        email: user.email,
        password: user.password,
      })
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  }

  const handleLogout = async () => {
    user.value = null
    localStorage.removeItem('token')
  }

  return {
    user,
    errors,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout,
  }
})
