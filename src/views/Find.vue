<template>
  <Carousel/>
  <Fm/>
  <Findsongs/>
</template>

<script>
  import Carousel from '../components/Carousel.vue'
  import Fm from '../components/Fm.vue'
  import Findsongs from '../components/Findsongs.vue'
export default { 
  name: "Find",
  components:{Carousel,Fm,Findsongs}
}
</script>

<style lang="less" scoped>

</style>