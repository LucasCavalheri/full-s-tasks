import { useAuthStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHistory(),
  // linkActiveClass: 'active',
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  let loggedIn = false

  if (localStorage.getItem('token')) {
    try {
      await authStore.fetchUser()
      loggedIn = authStore.isLoggedIn
    } catch (err) {
      console.error('Error fetching user:', err)
    }
  }

  if (to.meta.auth && !loggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  } else if (to.meta.guest && loggedIn) {
    return { name: 'tasks' }
  }
})

export default router
