import { createRouter, createWebHistory } from "vue-router"


const routes = [
  { 
    path: "/",
    name: "home",
    component: () => import("../components/Home.vue"),
    children:[
    ]
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../components/About.vue")
  },
  {
    path: "/repositories",
    name: "repositories",
    component: () => import("../components/repository/Repositories.vue")
  }
]

export default createRouter({
    history: createWebHistory(),
    routes
})