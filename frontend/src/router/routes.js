import ViewHome from '@/views/ViewHome.vue'
import ViewLogin from '@/views/ViewLogin.vue'
import ViewRegister from '@/views/ViewRegister.vue'
import ViewSummary from '@/views/ViewSummary.vue'
import ViewTasks from '@/views/ViewTasks.vue'
import ViewNotFoundError from '@/views/errors/ViewNotFoundError.vue'

const routes = [
  {
    path: '/',
    component: ViewHome,
    name: 'home',
  },
  {
    path: '/tasks',
    component: ViewTasks,
    name: 'tasks',
    meta: {
      auth: true,
    },
  },
  {
    path: '/summary',
    component: ViewSummary,
    name: 'summary',
    meta: {
      auth: true,
    },
  },
  {
    path: '/login',
    component: ViewLogin,
    name: 'login',
    meta: {
      guest: true,
    },
  },
  {
    path: '/register',
    component: ViewRegister,
    name: 'register',
    meta: {
      guest: true,
    },
  },
  {
    path: '/:notFound(.*)',
    component: ViewNotFoundError,
    name: 'error.404',
  },
]

export default routes
