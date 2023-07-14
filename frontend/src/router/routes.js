import ViewHomePage from '@/views/ViewHomePage.vue'
import ViewLogin from '@/views/ViewLogin.vue'
import ViewRegister from '@/views/ViewRegister.vue'
import ViewSummary from '@/views/ViewSummary.vue'
import ViewTasks from '@/views/ViewTasks.vue'
import ViewNotFoundError from '@/views/errors/ViewNotFoundError.vue'

const routes = [
  {
    path: '/',
    component: ViewHomePage,
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
  },
  {
    path: '/register',
    component: ViewRegister,
    name: 'register',
  },
  {
    path: '/:notFound(.*)',
    component: ViewNotFoundError,
    name: 'error.404',
  },
]

export default routes
