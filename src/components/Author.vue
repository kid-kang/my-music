<template>
  <div class="wrap">
    <div class="bc"></div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  name: "Author",
  data () {
    return {

    }
  },
  props:["playlist",],
  mounted(){
    console.log(this.playlist)
  }
}
</script>

<style lang="less" scoped>
.wrap{
  width: 100%;
  height: 2rem;
  background: yellow;
  height: 100rem;
}
</style>