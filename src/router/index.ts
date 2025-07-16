import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../components/Layouts/DefaultLayout.vue'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/WelcomeView.vue'),
        },
        {
          path: '/chat/:roomId',
          name: 'ChatRoom',
          component: ChatView,
        },
      ],
    },
  ],
})

export default router
