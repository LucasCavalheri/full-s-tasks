<template>
  <main class="auth-wrapper">
    <form class="auth-form" @submit.prevent="handleSubmit">
      <h1>Login</h1>
      <h2 class="h3 mb-4 fw-normal">Please sign in</h2>
      <div class="form-floating mb-2">
        <input
          :class="{ 'is-invalid': errors.email && errors.email[0] }"
          v-model="form.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
        />
        <label for="email">Email</label>
        <div v-if="errors.email && errors.email[0]" class="invalid-feedback">
          {{ errors.email && errors.email[0] }}
        </div>
      </div>
      <div class="form-floating mb-3">
        <input
          :class="{ 'is-invalid': errors.password && errors.password[0] }"
          v-model="form.password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
        />
        <label for="password">Password</label>
        <div
          v-if="errors.password && errors.password[0]"
          class="invalid-feedback"
        >
          {{ errors.password && errors.password[0] }}
        </div>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Sign in
      </button>
    </form>
  </main>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const toast = useToast()
const router = useRouter()
const authStore = useAuthStore()
const { isLoggedIn, errors } = storeToRefs(authStore)
const { handleLogin } = authStore

const form = reactive({
  email: '',
  password: '',
})

const handleSubmit = async () => {
  await handleLogin(form)

  if (isLoggedIn.value) {
    toast.success('Login successfully!')
    router.push({ name: 'tasks' })
  } else {
    toast.error('Invalid credentials!')
  }
}
</script>

<style scoped>
.auth-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 60vh;
  margin-top: 2rem;
}

.auth-form {
  width: 400px;
}
</style>
