import { createRouter, createWebHistory } from 'vue-router'
import Find from "@/views/Find.vue"
import store from '@/store/index.js'

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
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import("@/views/Search.vue"),
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
