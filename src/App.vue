<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div>Sky Sight</div>
      </el-col>
      <el-col :span="6">
        <button @click="toHome">Home</button>
        <button @click="toRepositories">Repositories</button>
        <button @click="toAbout">About</button>
      </el-col>
    </el-row>

    <router-view></router-view>
  </div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useRouter } from 'vue-router'
const router = useRouter()

const toHome = (() => {
  router.push({
    name: 'home'
  })
})
const toRepositories = (() => {
  router.push({
    name: 'repositories'
  })
})
const toAbout = (() => {
  router.push({
    name: 'about'
  })
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}
body {
  margin: 0;
}
</style>
