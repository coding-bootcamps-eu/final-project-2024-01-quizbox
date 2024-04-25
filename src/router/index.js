import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LimitQuiz from '../views/LimitQuiz.vue'
import QuizCategory from '../views/QuizCategory.vue'
import QuizApp from '../views/QuizApp.vue'
import RandomizeQuiz from '../views/RandomizeQuiz.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/limit',
      name: 'limit',
      component: LimitQuiz
    },
    {
      path: '/category',
      name: 'category',
      component: QuizCategory
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizApp
    },
    {
      path: '/random',
      name: 'random',
      component: RandomizeQuiz
    }
  ]
})

export default router
