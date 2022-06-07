<template>
  <Navlink v-show="$route.meta.istrun&&!$store.state.enterMusicDetail" class="navlink"/>
  <router-view />
  <FooterMusic class="FooterMusic"/>
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
  position: relative;
  .navlink{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9999;
  }
}
</style>
