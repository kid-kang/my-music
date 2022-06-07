<template>
  <div class="wrap">
    <div class="top">
      <span>发现好歌单</span>
      <el-button round size="default" @click.once="$router.push('/recommend')">查看更多</el-button>
    </div>
    <div class="song">
      <el-carousel
        :interval="4000"
        type="card"
        height="2rem"
        indicator-position="none"
        arrow="never "
      >
        <el-carousel-item v-for="val in findList" :key="val.id">
          <div class="inner" @click="$router.push(`/songList?id=${val.id}`)">
            <img :src="val.picUrl" />
            <h3>{{ val.name }}</h3>
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinle"></use></svg
              >{{ (val.playCount % 1000) / 10 }}万
            </span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "Findsongs",
  data () {
    return {
      findList: JSON.parse(sessionStorage.getItem("findList")),
    }
  },
  created () {
    if (sessionStorage.getItem("findList")) return
    this.axios.get("/personalized?limit=10").then(res => {
      this.findList = res.result
      sessionStorage.setItem("findList", JSON.stringify(res.result))
    })
  }
}
</script>

<style lang="less" scoped>
.wrap {
  border-top: 1px rgb(235, 234, 234) solid;
  padding-top: 0.2rem;
  .top {
    display: flex;
    justify-content: space-between;
    height: 0.64rem;
    span {
      line-height: 0.64rem;
      font-weight: bolder;
    }
  }
  .song {
    margin-top: 0.2rem;
    height: 4rem;
    .el-carousel {
      position: relative;
      height: 100%;
      /deep/ .el-carousel__container {
        height: 4rem !important;
        img {
          border-radius: 0.2rem;
          width: 100%;
        }
        h3 {
          position: absolute;
          width: 100%;
          height: 0.75rem;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          top: 2.5rem;
          color: white;
          font-size: 0.29rem;
        }
        span {
          position: absolute;
          font-size: 0.2rem;
          right: 0.1rem;
          top: 0.1rem;
          color: white;
          svg {
            font-size: 0.3rem;
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
}
</style>