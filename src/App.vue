<template>
  <Navlink v-show="$route.meta.istrun"/>
  <router-view />
  <FooterMusic />
</template>

<script>
import Navlink from "@/components/Navlink.vue"
import FooterMusic from "@/components/FooterMusic.vue"
export default {
  name: "App",
  components: { Navlink ,FooterMusic}
}
</script>

<style lang="less">
#app {
  font-family: Quicksand;
  text-align: center;
  color: #2c3e50;
}
</style>
