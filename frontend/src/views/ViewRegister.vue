<template>
  <main class="auth-wrapper">
    <form class="auth-form" @submit.prevent="handleSubmit">
      <h1>Register</h1>
      <h2 class="h3 mb-4 fw-normal">Please sign up</h2>
      <div class="form-floating mb-2">
        <input
          :class="{ 'is-invalid': errors.name && errors.name[0] }"
          v-model="form.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="name@example.com"
        />
        <label for="name">Name</label>
        <div v-if="errors.name && errors.name[0]" class="invalid-feedback">
          {{ errors.name && errors.name[0] }}
        </div>
      </div>
      <div class="form-floating mb-2">
        <input
          :class="{ 'is-invalid': errors.email && errors.email[0] }"
          v-model="form.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Your Name"
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
      <div class="form-floating mb-3">
        <input
          v-model="form.password_confirmation"
          type="password"
          class="form-control"
          id="password_confirmation"
          placeholder="Password Confirmation"
        />
        <label for="password_confirmation">Password Confirmation</label>
        <div
          v-if="errors.password_confirmation && errors.password_confirmation[0]"
          class="invalid-feedback"
        >
          {{ errors.password_confirmation && errors.password_confirmation[0] }}
        </div>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">
        Sign up
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
const { handleRegister } = authStore

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const handleSubmit = async () => {
  await handleRegister(form)

  if (isLoggedIn.value) {
    toast.success('Registration successful!')
    router.push({ name: 'tasks' })
  } else {
    toast.error('Registration failed!')
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
