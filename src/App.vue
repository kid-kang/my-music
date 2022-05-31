<template>
  <Navlink></Navlink>
  <router-view />
</template>

<script>
import Navlink from "@/components/Navlink.vue"
export default {
  name: "App",
  components: { Navlink }
}
</script>

<style lang="less">
#app {
  font-family: Quicksand;
  text-align: center;
  color: #2c3e50;
}
</style>
