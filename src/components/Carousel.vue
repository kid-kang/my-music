<template>
  <div class="block">
    <el-carousel
      height="3rem"
      :autoplay="true"
      :interval="3000"
      indicator-position="click"
      arrow="never"
      class="box"
    >
      <el-carousel-item
        v-for="val in carouselList"
        :key="val.targetId"
      >
        <img :src="val.imageUrl" id="topCarousel" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  neme: "Carousel",
  data () {
    return {
      carouselList: JSON.parse(sessionStorage.getItem("carouselList")),
    }
  },
  created () {
    if(sessionStorage.getItem("carouselList")) return
    this.axios.get("/banner?typle=2").then(res => {
      this.carouselList = res.banners.slice(0, 4)
      sessionStorage.setItem("carouselList",JSON.stringify(this.carouselList))
    })
  }
}
</script>

<style lang="less" scoped>
.block {
  margin-top: 1rem;
  .box {
    border-radius: 0.3rem;
    #topCarousel {
      width: 100%;
      height: 3rem;
    }
  }
}
</style>