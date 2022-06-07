<template>
  <div class="top" v-show="!enterMusicDetail">
    <div class="back" @click.once="back">
      <img src="../../public/back.png" />
    </div>
    <div class="author">
      <p class="one">歌单作者:</p>
      <p class="two">{{ playlist.creator.nickname }}</p>
    </div>
  </div>
  <Author :playlist="playlist" />
</template>

<script>
import { mapMutations, mapState } from 'vuex'
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
    ...mapMutations(["changePlayList"]),
    back () {
      this.$router.go(-1)
    }
  },
  computed: { ...mapState(["enterMusicDetail"]) },
  created () {
    this.axios.get(`/playlist/detail?id=${this.$route.query.id}`).then(res => {
      this.playlist = res.playlist
      const arr = this.playlist.tracks.map(val => ({
        id: val.id, name: val.name, author: val.ar.slice(0, 2).map(item => item.name), picUrl: val.al.picUrl
      }))
      this.changePlayList(arr)
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
  z-index: 9;
  width: 100%;
  height: 0.7rem;
  .back {
    height: 100%;
    img {
      width: 0.7rem;
      height: 100%;
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>