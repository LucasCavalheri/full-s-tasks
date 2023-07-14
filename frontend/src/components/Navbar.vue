<template>
  <nav
    ref="navRef"
    class="navbar navbar-expand-lg navbar-light bg-light border-bottom"
  >
    <div class="container py-2">
      <a
        class="icons"
        href="https://linkedin.com/in/lucas-cavalheri"
        target="_blank"
        ><i class="bi bi-linkedin"></i
      ></a>
      <a class="icons" href="https://github.com/LucasCavalheri" target="_blank"
        ><i class="bi bi-github"></i
      ></a>
      <a class="icons" href="https://lucascavalheri.com.br" target="_blank"
        ><i class="bi bi-person"></i
      ></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul v-if="authStore.isLoggedIn" class="navbar-nav">
          <li class="nav-item">
            <RouterLink :to="{ name: 'tasks' }" class="nav-link"
              >Tasks</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: 'summary' }" class="nav-link"
              >Summary</RouterLink
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <template v-if="!authStore.isLoggedIn">
            <li class="nav-item">
              <RouterLink
                :to="{ name: 'login' }"
                class="btn btn-outline-secondary ms-2"
                >Login</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'register' }" class="btn btn-danger ms-2"
                >Register</RouterLink
              >
            </li>
          </template>
          <template v-else>
            <li class="nav-item dropdown">
              <a
                @click.prevent="toggle"
                :class="toggleClass"
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ authStore.user.name }}
              </a>
              <ul :class="toggleClass" class="dropdown-menu">
                <li>
                  <a @click.prevent="logout" href="/" class="dropdown-item"
                    >Logout</a
                  >
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const navRef = ref(null)
const isOpen = ref(false)

const logout = async () => {
  await authStore.handleLogout()
  isOpen.value = false
  router.push({ name: 'login' })
}

onClickOutside(navRef, () => (isOpen.value = false))

const toggle = () => (isOpen.value = !isOpen.value)

const toggleClass = computed(() => (isOpen.value ? 'show' : ''))
</script>

<style scoped>
.icons {
  font-size: 1.5rem;
  color: #000;
  margin-right: 1rem;
}

.icons:hover {
  color: #5a5757;
  transition: 0.5s;
}

.nav-link.router-link-active {
  color: #000;
  font-weight: bold;
}
</style>
