<template>
  <div class="wrap">
    <div
      class="bg"
      :style="{
        background: `url(${user.backgroundUrl})`,
        'background-size': '100% 100%',
      }"
    ></div>
    <div class="card">
      <img :src="user.avatarUrl" />
      <p class="nickname">{{ user.nickname }}</p>
      <p class="signature">签名：{{ user.signature }}</p>
    </div>
    <div class="songlist">
      <div
        class="songitem"
        v-for="(val, i) in $store.state.palyList"
        :key="val.id"
        @click="changeIndex(i)"
      >
        <span class="xuhao">{{ i + 1 }}</span>
        <div class="songname">
          <h3>{{ val.name }}</h3>
          <p>
            <span v-for="item in val.author" :key="item">{{
              item.name
            }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="zhanweifu"></div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: "Collection",
  data () {
    return {
      user: {},
      likeList: []
    }
  },
  methods: {
    ...mapMutations(["changeIndex","changePlayList"]),
  },
  async created () {
    this.axios.get(`/user/detail?uid=${this.$store.state.userId}`).then(res => {
      this.user = res.profile
    })
    let c = encodeURIComponent(localStorage.getItem("cookie"))
    let res = await this.axios.get(`/likelist?uid=${this.$store.state.userId}&cookie=${c}`)
    let ids = res.ids.join(",")
    let arr = await this.axios.get(`/song/detail?ids=${ids}`)
    let songs = arr.songs
    // console.log(songs)
    songs = songs.map(val => ({
      id: val.id, name: val.name, author: val.ar.slice(0, 2).map(item => item.name), picUrl: val.al.picUrl
    }))
    console.log(songs)
    this.changePlayList(songs)
  }
}
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  .bg {
    width: 100%;
    height: 5rem;
  }
  .card {
    position: relative;
    top: -0.6rem;
    width: 88%;
    height: 2.6rem;
    margin: auto;
    border-radius: 0.4rem;
    background-color: #fff;
    box-shadow: 0 0 0.1rem 0 #ccc;
    img {
      position: relative;
      width: 1.2rem;
      height: 1.2rem;
      margin: auto;
      border-radius: 50%;
      top: -0.4rem;
    }
    .nickname {
      position: relative;
      top: -0.3rem;
      font-size: 0.3rem;
      font-weight: 600;
      font-family: "Times New Roman", Times, serif;
    }
    .signature {
      font-size: 0.24rem;
      color: rgb(172, 171, 171);
    }
  }
  .songlist {
    .songitem {
      display: flex;
      justify-content: start;
      height: 1rem;
      margin-bottom: 0.1rem;
      margin-top: 0.1rem;
      .xuhao {
        display: block;
        line-height: 1rem;
        width: 0.7rem;
        color: #ccc;
        font-size: 0.28rem;
      }
      .songname {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        width: 90%;
        text-align: start;
        h3 {
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          color: #ccc;
          font-size: 0.28rem;
          span {
            margin-right: 0.2rem;
          }
        }
      }
    }
  }
  .zhanweifu {
    height: 1.3rem;
  }
}
</style>