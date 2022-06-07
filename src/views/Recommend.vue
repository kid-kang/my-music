<template>
  <div class="wrap">
    <img
      src="../../public/back.png"
      class="back"
      @click.once="$router.go(-1)"
    />
    <div class="list">
      <div
        class="item"
        v-for="val in recommendList"
        :key="val.id"
        @click="$router.push(`/songList?id=${val.id}`)"
      >
        <img :src="val.picUrl" class="img" />
        <h3>{{ val.name }}</h3>
        <span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yinle"></use></svg
          >{{ (val.playCount % 1000) / 10 }}万
        </span>
      </div>
    </div>
    <div class="zhanwei"></div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  data () {
    return {
      recommendList: []
    }
  },
  created () {
    this.axios.get(`/personalized`).then(res => {
      console.log(res.result)
      this.recommendList = res.result
    })
  }
}
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  position: relative;
  .back {
    position: fixed;
    width: 0.6rem;
    height: 0.6rem;
    top: 0.08rem;
    left: 0.04rem;
    z-index: 9999;
  }
  .list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 0.2rem;
    .item {
      width: 45%;
      height: 3rem;
      margin-bottom: 0.4rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
      h3 {
        position: absolute;
        width: 100%;
        height: 0.75rem;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        top: 2.2rem;
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
  .zhanwei {
    height: 1.13rem;
  }
}
</style>