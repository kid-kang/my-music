import { createRouter, createWebHistory } from 'vue-router'
import Find from "@/views/Find.vue"

const routes = [
  {
    path: '/',
    name: 'Find',
    component: Find,
    meta:{
      istrun:true
    }
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import("@/views/Me.vue"),
    meta:{
      istrun:true
    }
  },
  {
    path: '/songList',
    name: 'SongList',
    component: () => import("@/views/SongList.vue"),
    meta:{
      istrun:false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
