import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '../components/LoginPage.vue'
import SignupPage from '../components/SignupPage.vue'
import PostsPage from '../components/PostsPage.vue'
import store from '../store/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { auth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
      meta: { auth: false }
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsPage,
      meta: { auth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (
    to.meta.auth &&
    !store.getters.is_user_authenticated
  ) {
    next('/login')
  }
  else if (
    !to.meta.auth &&
    store.getters.is_user_authenticated
  ) {
    next('/posts')
  } else {
    next()
  }
})

export default router
