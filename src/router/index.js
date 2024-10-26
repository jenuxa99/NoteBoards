import { createRouter, createWebHistory } from 'vue-router'
import Board from '../components/Board-component.vue'
import { boards } from '@/store'

const routes = [
  {
    path: '/:id',
    name: 'Board',
    component: Board,
    props: route => {
      const boardId = Number(route.params.id)
      const board = boards.value.find(b => b.id === boardId) 
      return {
        boardId,
        notes: board ? board.notes : [], 
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
