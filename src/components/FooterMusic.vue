<template>
  <div class="wrap" @click="mask = !mask">
    <img :src="palyList[index].picUrl" />
    <div class="songname">
      <h3>{{ palyList[index].name }}</h3>
      <p>
        <span>歌手：</span>
        <span
          v-for="item in palyList[index].author"
          :key="item"
          class="songName"
          >{{ item }}</span
        >
      </p>
    </div>
    <!-- 播放按钮 -->
    <svg class="icon" aria-hidden="true" @click.stop="playAudio()">
      <use xlink:href="#icon-bofang" v-if="!play"></use>
      <use xlink:href="#icon-zanting" v-else></use>
    </svg>
    <audio
      :src="`https://music.163.com/song/media/outer/url?id=${palyList[index].id}.mp3 `"
      ref="audio"
    ></audio>
    <!-- 显示唱片 -->
    <el-drawer
      v-model="mask"
      :with-header="false"
      size="100%"
      :z-index="9999999999"
      :close-on-click-modal="false"
      ref="drawer"
    >
      <!-- 遮罩层 歌词 -->
      <div class="mask">
        <img :src="palyList[index].picUrl" class="bg" />
        <!-- 返回按钮顶部部分 -->
        <div class="top">
          <div class="back" @click="handleClose()">
            <img src="../../public/back.png" />
          </div>
          <div class="author">
            {{ palyList[index].name }}
          </div>
        </div>
        <!-- 歌词部分 -->
        <div class="geci">
          <img src="@/assets/1.png" class="cip" />
          <img src="@/assets/2.png" class="ciz"  />
          <img :src="palyList[index].picUrl" class="tup" />
        </div>
        <!-- 底部控制播放部分 -->
        <div class="bofang">
          <svg class="icon ciyao" aria-hidden="true">
            <use xlink:href="#icon-20gl-repeat2"></use>
          </svg>
          <svg class="icon ciyao" aria-hidden="true">
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
          <svg class="icon zhuyao" aria-hidden="true" @click.stop="playAudio()">
            <use xlink:href="#icon-bofang" v-if="!play"></use>
            <use xlink:href="#icon-zanting" v-else></use>
          </svg>
          <svg class="icon ciyao" aria-hidden="true">
            <use xlink:href="#icon-shangyishoushangyige1"></use>
          </svg>
          <svg class="icon ciyao" aria-hidden="true">
            <use xlink:href="#icon-shoucang"></use>
          </svg>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
export default {
  name: "FooterMusic",
  data () {
    return {
      mask: false
    }
  },
  computed: { ...mapState(["palyList", "index", "play"]) },
  methods: {
    ...mapMutations(["changePlay"]),
    playAudio () {
      this.changePlay()
      this.play ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    handleClose () {
      this.$refs.drawer.handleClose()
    }
  },
  watch: {
    index () {
      this.$nextTick(() => {
        this.$refs.audio.play()
        if (!this.play) this.changePlay()
      })
    },
    palyList () {
      this.$nextTick(() => {
        this.$refs.audio.play()
        if (!this.play) this.changePlay()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 1.3rem;
  position: fixed;
  bottom: 0;
  border-top: 0.03rem #ccc solid;
  background-color: white;
  display: flex;
  justify-content: start;
  img {
    width: 1.3rem;
    height: 1.3rem;
  }
  .songname {
    height: 1.3rem;
    display: flex;
    flex: 1;
    padding-left: 0.3rem;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    p {
      font-size: 0.26rem;
    }
    .songName {
      margin-right: 0.2rem;
    }
  }
  svg {
    width: 1.3rem;
    height: 1.3rem;
  }
  /deep/.el-drawer__body {
    padding: 0px;
    .mask {
      position: relative;
      padding: 0;
      width: 100%;
      height: 100%;
      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(1.5rem);
      }
      .top {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 6%;
        .back {
          height: 100%;
          img {
            width: 0.7rem;
            height: 100%;
            margin-left: 0.2rem;
          }
        }
        .author {
          position: absolute;
          right: 50%;
          height: 100%;
          color: #fff;
          line-height: 0.8rem;
          font-size: 16px;
          font-weight: 600;
          transform: translate(50%, 0%);
        }
      }
      .geci {
        width: 100%;
        height: 84%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .ciz {
          width: 2rem;
          height: 3rem;
          position: absolute;
          left: 46%;
          transform-origin: 0 0;
          transform: rotate(-15deg);
          transition: 2s;
        }
        .cizActive{
          transform: rotate(6deg);
        }
        .cip {
          width: 5rem;
          height: 5rem;
          position: absolute;
          bottom: 4.2rem;
          z-index: -1;
        }
        .tup {
          position: absolute;
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 50%;
          bottom: 5.04rem;
        }
      }
      .bofang {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .ciyao{
          width: .5rem;
        }
      }
    }
  }
}
</style>