<template>
  歌单详情页
</template>

<script>
export default {
name:"SongList",
data(){
  return{
    songList:{}
  }
},
created(){
    this.axios.get(`/playlist/detail?id=${this.$route.query.id}`).then(res => {
      console.log(res)
      // this.songList = res.palylist
    })
}
}
</script>

<style lang="less" scoped>

</style>