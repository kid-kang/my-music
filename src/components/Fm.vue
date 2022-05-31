<template>
  <div class="box">
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meirituijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-AdobeFm"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan1"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fm"

}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
  margin-bottom: .2rem;
  .item {
    display: flex;
    flex-direction: column;
    width: 22%;
    svg {
      width: 100%;
      height: 1rem;
      margin-bottom: 0.1rem;
    }
  }
}
</style>