<template>
  <div class="top">
    <div class="back" @click="back">
      <img src="../../public/back.png">
    </div>
    <div class="author">
      <p class="one">歌单作者:</p>
      <p class="two">{{ playlist.creator.nickname }}</p>
    </div>
  </div>
  <Author :playlist="playlist" />
</template>

<script>
import Author from "../components/Author.vue"
export default {
  name: "SongList",
  data () {
    return {
      playlist: {},
    }
  },
  components: { Author },
  methods: {
    back () {
      this.$router.go(-1)
    },
    async getMusic(id) {
// ----------------------------------点击播放-----------------------
    }
  },
  created () {
    this.axios.get(`/playlist/detail?id=${this.$route.query.id}`).then(res => {
      this.playlist = res.playlist
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
  .back {
    height: 100%;
    img{
      width: .7rem;
      height: 100%;
      margin-left: .2rem;
    }
  }
  .author {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 35%;
    .one {
      font-size: 0.24rem;
      color: rgb(255, 255, 255);
      text-align: start;
    }
    .two {
      font-size: 0.26rem;
      margin-right: 0.2rem;
      text-align: end;
      color: rgb(255, 255, 255);
    }
  }
}
</style>