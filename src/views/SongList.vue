<template>
  <div class="top">
    <div class="back" @click="back">🔙🔙</div>
    <div class="author">
      <p class="one">歌单作者:</p>
      <p class="two">{{ playlist.creator.nickname }}</p>
    </div>
  </div>
  <div class="zhanwei"></div>
  <Author :playlist="playlist" />
</template>

<script>
import Author from "../components/Author.vue"
export default {
  name: "SongList",
  data () {
    return {
      playlist: {},
      privileges: [],
    }
  },
  components: { Author },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    this.axios.get(`/playlist/detail?id=${this.$route.query.id}`).then(res => {
      this.playlist = res.playlist
      this.privileges = res.privileges
      // console.log(this.playlist)
      // console.log(this.privileges)
    })
  }
}
</script>

<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 0.7rem;
  background: rgba(245, 4, 24, 0.2);
  .back {
    height: 100%;
    line-height: 0.7rem;
    font-size: 0.5rem;
  }
  .author {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 33%;
    .one {
      font-size: 0.24rem;
      color: rgb(156, 154, 154);
      text-align: start;
    }
    .two {
      font-size: 0.29rem;
      margin-right: 0.2rem;
      text-align: end;
      color: rgb(0, 0, 0);
    }
  }
}
.zhanwei {
  width: 100%;
  height: 0.7rem;
  position: absolute;
  top: 0;
  left: 0;
}
</style>