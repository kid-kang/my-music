<template>
  <div class="wrap">
    <div class="nav">
      <img src="../../public/back.png" @click.once="$router.go(-1)"/>
      <input
        type="text"
        placeholder="歌曲/歌手/专辑"
        @keydown.enter="enterKey()"
        v-model="searKey"
      />
    </div>
    <div class="history">
      <span class="spanHistory">历史:</span>
      <span v-for="val in keyList" :key="val" class="spanKey" @click="sendSearch(val)">{{ val }}</span>
      <img
        src="../../public/delete.png"
        class="delete"
        @click="deleteHistory()"
      />
    </div>
    <div class="songlist">
      <div
        class="songitem"
        v-for="(val, i) in songList"
        :key="val.id"
        @click="clickSong(val)"
      >
        <span class="xuhao">{{ i + 1 }}</span>
        <div class="songname">
          <h3>{{ val.name }}</h3>
          <p>
            <span v-for="item in val.artists.slice(0,2)" :key="item.id">{{item.name}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="zhanweifu"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyList: [],
      searKey: '',
      songList: []
    }
  },
  methods: {
    enterKey () {
      if (!this.searKey) return
      this.keyList.unshift(this.searKey.trim())
      this.keyList = [...new Set(this.keyList)]
      if (this.keyList.length > 10) this.keyList.splice(this.keyList.length - 1, 1)
      localStorage.setItem("keyList", JSON.stringify(this.keyList))

      // 发起请求
      this.axios.get(`/search?keywords=${this.searKey}`).then(res => {
        console.log(res)
        this.songList = res.result.songs
      })

      this.searKey = ""
    },
    deleteHistory () {
      this.keyList = []
      localStorage.removeItem("keyList")
    },
    sendSearch (val) {
      this.axios.get(`/search?keywords=${val}`).then(res => {
        this.songList = res.result.songs
        console.log(this.songList)
      })
    },
    clickSong(val){
      console.log({
        id:val.id,name:val.name,author:val.artists.slice(0,2),picUrl:val.artists[0].img1v1Url
      })
      this.$store.commit("searchAndPush",{
        id:val.id,name:val.name,author:val.artists.slice(0,2).map(item => item.name),picUrl:val.artists[0].img1v1Url
      })
      this.$store.commit("changeIndex",this.$store.state.palyList.length-1)
    }
  },
  created () {
    this.keyList = JSON.parse(localStorage.getItem("keyList")) || []
  }
}
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  .nav {
    width: 100%;
    height: 0.8rem;
    pad: 0 0.2rem;
    display: flex;
    align-items: center;
    img {
      width: 10%;
      height: 80%;
    }
    input {
      margin-left: 0.4rem;
      border: none;
      border-bottom: 1px solid #999;
      width: 90%;
      height: 80%;
    }
  }
  .history {
    box-sizing: border-box;
    width: 100%;
    padding: 0.2rem;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .spanHistory {
      display: inline-block;
      text-align: center;
      height: 0.82rem;
      width: 0.8rem;
      line-height: 0.82rem;
      margin-right: 0.4rem;
      font-weight: 700;
    }
    .spanKey {
      display: inline-block;
      height: 0.44rem;
      padding: 0.1rem 0.2rem;
      background-color: #ccc;
      border-radius: 0.4rem;
      margin: 0.1rem 0.2rem;
      white-space: nowrap;
    }
    .delete {
      position: absolute;
      right: 0.2rem;
      bottom: 0.4rem;
      width: 0.4rem;
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
        text-align: start;
        h3 {
          font-weight: 600;
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