import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizApp from '../views/QuizApp.vue'
import RandomizeQuiz from '../views/RandomizeQuiz.vue'
import QuizCategory from '../views/QuizCategory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    },
    {
      path: '/category',
      name: 'category',
      component: QuizCategory
    }
  ]
})

export default router
