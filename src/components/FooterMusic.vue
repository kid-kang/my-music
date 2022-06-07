<template>
  <div class="wrap" @click="enterMusicDetail()">
    <img :src="palyList[index].picUrl" />
    <div class="songname">
      <h3>
        <Vue3Marquee> {{ palyList[index].name }}&#12288;</Vue3Marquee>
      </h3>
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
      @canplay="canplaysong"
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
        <div class="toptop">
          <!-- 返回按钮 -->
          <div class="back" @click="handleClose()">
            <img src="../../public/back.png" />
          </div>
          <div class="name">
            <Vue3Marquee> {{ palyList[index].name }}&#12288;</Vue3Marquee>
          </div>
          <div class="author">
            <p class="one">演奏者:</p>
            <p class="two">{{ palyList[index].author[0] }}</p>
          </div>
        </div>
        <!-- 歌曲详情部分 -->
        <div class="musicDetail">
          <!-- 磁盘界面 -->
          <div class="cd" v-show="!isLrc" @click="isLrc = !isLrc">
            <img src="@/assets/1.png" class="cip" />
            <img
              src="@/assets/2.png"
              class="ciz"
              :class="{ cizActive: play }"
            />
            <img
              :src="palyList[index].picUrl"
              class="tup"
              :class="{ tupRotateStop: !play, tupRotateStart: play }"
            />
          </div>
          <!-- 歌词界面 -->
          <div class="geci" ref="geci" @click="isLrc = !isLrc" v-show="isLrc">
            <p
              v-for="val in lrc"
              :key="val.id"
              :class="{
                geciActive:
                  curTime * 1000 >= val.time && curTime * 1000 < val.next,
              }"
            >
              {{ val.lrc }}
            </p>
          </div>
        </div>
        <!-- 进度条 -->
        <input
          type="range"
          class="range"
          min="0"
          :max="totalTime"
          v-model="$refs.audio.currentTime"
          step="1"
        />
        <!-- 底部控制播放部分 -->
        <div class="bofang">
          <svg class="icon ciyao" aria-hidden="true">
            <use xlink:href="#icon-20gl-repeat2"></use>
          </svg>
          <svg
            class="icon ciyao"
            aria-hidden="true"
            @click="changeIndex(index === 0 ? palyList.length - 1 : index - 1)"
          >
            <use xlink:href="#icon-shangyishoushangyige"></use>
          </svg>
          <svg class="icon zhuyao" aria-hidden="true" @click.stop="playAudio()">
            <use xlink:href="#icon-bofang" v-if="!play"></use>
            <use xlink:href="#icon-zanting" v-else></use>
          </svg>
          <svg
            class="icon ciyao"
            aria-hidden="true"
            @click="changeIndex(index === palyList.length - 1 ? 0 : index + 1)"
          >
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
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
export default {
  name: "FooterMusic",
  data () {
    return {
      mask: false,
      isLrc: false,
      timer: null,
      totalTime: 0,
    }
  },
  components: { Vue3Marquee, },
  computed: { ...mapState(["palyList", "index", "play", "lrc", "curTime"]) },
  methods: {
    ...mapMutations(["changePlay", "changeEnterMusicDetail", "changeCurTime", "changeIndex"]),
    playAudio () {
      this.changePlay()
      if (this.play) {
        this.$refs.audio.play()
        this.setLrcTime()
      } else {
        this.$refs.audio.pause()
        clearInterval(this.timer)
      }
    },
    handleClose () {
      this.changeEnterMusicDetail()
      this.$refs.drawer.handleClose()
    },
    enterMusicDetail () {
      this.mask = !this.mask
      this.changeEnterMusicDetail()
    },
    setLrcTime () {
      this.timer = setInterval(() => {
        try {
          this.changeCurTime(this.$refs.audio.currentTime)
        } catch (error) {
          console.log(error)
        }
      }, 500)
    },
    canplaysong () {
      this.totalTime = parseInt(this.$refs.audio.duration)
    },
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
        this.setLrcTime()
        this.$refs.audio.play()
        if (!this.play) this.changePlay()
      })
    },
    curTime (newval) {
      // 当前时间到达歌曲总时长时自动播放下一首
      if (newval >= this.totalTime) {
        this.$nextTick(() => {
          if (this.palyList.length === 1) this.$refs.audio.currentTime = 0
          else this.changeIndex(this.index === (this.palyList.length - 1) ? 0 : (this.index + 1))
        })
      }
      this.$forceUpdate()
      // 展现动态歌词
      let p = document.querySelector("p.geciActive")
      if (!p) return
      if (p.offsetTop > 300) {
        this.$refs.geci.scrollTop = p.offsetTop - 300
      }
    }
  },
  created () {
    this.$store.dispatch("getLrc", this.palyList[this.index].id)
  },
  updated () {
    this.$store.dispatch("getLrc", this.palyList[this.index].id)
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
    width: 40%;
    display: flex;
    flex: 1;
    padding-left: 0.3rem;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    h3 {
      overflow: hidden;
      width: 80%;
    }
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
      .toptop {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 6%;
        z-index: 9999;
        .back {
          height: 100%;
          img {
            width: 0.7rem;
            height: 100%;
            // margin-left: 0.2rem;
          }
        }
        .name {
          position: absolute;
          overflow: hidden;
          right: 50%;
          height: 100%;
          width: 2rem;
          color: #fff;
          line-height: 0.8rem;
          font-weight: 600 !important;
          font-size: 16px;
          transform: translate(50%, 0%);
        }
        .author {
          position: absolute;
          right: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
          width: 30%;
          .one {
            font-size: 0.24rem;
            color: rgb(255, 255, 255);
            text-align: start;
          }
          .two {
            font-size: 0.26rem;
            margin-right: 0.2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: end;
            color: rgb(255, 255, 255);
          }
        }
      }
      .musicDetail {
        width: 100%;
        height: 80.5%;
        position: relative;
        .cd {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .ciz {
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-15deg);
            transition: 2s;
          }
          .cizActive {
            transform: rotate(6deg);
          }
          .cip {
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 3.6rem;
            z-index: -1;
          }
          @keyframes tupRotate {
            0% {
              transform: rotateZ(0deg);
            }
            100% {
              transform: rotateZ(360deg);
            }
          }
          .tup {
            position: absolute;
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            bottom: 4.44rem;
            animation: tupRotate 10s linear infinite;
          }
          .tupRotateStart {
            animation-play-state: running;
          }
          .tupRotateStop {
            animation-play-state: paused;
          }
        }
        .geci {
          width: 100%;
          height: 95%;
          overflow: scroll;
          // overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          p {
            color: rgb(241, 241, 241);
            margin-bottom: 0.4rem;
            font-size: 0.28rem;
          }
          .geciActive {
            color: #fff;
            font-size: 0.32rem;
            font-weight: 600;
          }
          &::-webkit-scrollbar {
            width: 0px;
          }
        }
      }
      .range {
        width: 100%;
        height: 0.5%;
      }
      .bofang {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 9999;
        .ciyao {
          width: 0.5rem;
        }
      }
    }
  }
}
</style>