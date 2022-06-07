<template>
  <div class="wrap">
    <!-- 歌单信息 -->
    <img :src="playlist.coverImgUrl" class="bg" />
    <div class="content">
      <img :src="playlist.coverImgUrl" />
      <div class="message">
        <p class="tatil">{{ playlist.name }}</p>
        <div class="avatar">
          <img :src="playlist.creator.avatarUrl" />
          <div>
            {{ playlist.creator.signature }}
          </div>
        </div>
        <p :class="{ dontShow: !show, show: show }" @click="show = !show">
          {{ playlist.description }}
        </p>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="songlist">
      <div
        class="songitem"
        v-for="(val, i) in playlist.tracks"
        :key="val.id"
        @click="changeIndex(i)"
      >
        <span class="xuhao">{{ i + 1 }}</span>
        <div class="songname">
          <h3>{{ val.name }}</h3>
          <p>
            <span v-for="item in val.ar.slice(0, 2)" :key="item.id">{{
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
  name: "Author",
  data () {
    return {
      show: false
    }
  },
  props: ["playlist"],
  methods: {
    ...mapMutations(["changeIndex"]),
  },
}
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 2rem;
  .bg {
    width: 100%;
    height: 6rem;
    filter: blur(60px);
  }
  .content {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 3rem;
    top: 2rem;
    color: #fff;
    img {
      width: 3rem;
      border-radius: 0.4rem;
    }
    .message {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 4.5rem;
      padding-left: 0.2rem;
      padding-right: 0.1rem;
      text-align: start;
      .tatil {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .avatar {
        display: flex;
        justify-content: start;
        width: 100%;
        font-size: 0.27rem;
        color: rgb(255, 255, 255);
        margin: 0.2rem 0;
        img {
          width: 0.736rem;
          height: 0.736rem;
          border-radius: 50%;
        }
        div {
          display: flex;
          align-items: center;
          width: 80%;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .dontShow {
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 这里是超出几行省略 */
        font-size: 0.24rem;
        color: rgb(255, 255, 255);
      }
      .show {
        font-size: 0.24rem;
        color: rgb(0, 0, 0);
      }
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