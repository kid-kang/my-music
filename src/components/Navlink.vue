<template>
  <nav>
    <div class="route">
      <div class="home" @click="$router.push('/')" :class="{active:$route.path == '/'}">发现好音乐</div>
      <div class="me" @click="$router.push('/me')" :class="{active:$route.path == '/me'}">我的收藏</div>
    </div>
    <svg class="icon sousuo" aria-hidden="true" @click="$router.push('/search')">
      <use xlink:href="#icon-sousuo"></use>
    </svg>
  </nav>
</template>

<script>
export default {
  name: "Navlink"
}
</script>

<style lang="less" scoped>
nav {
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  height: 1rem;
  background-color: brown;
  .route{
    margin: auto;
    display: flex;
    height: 100%;
    width: 70%;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    .home,.me{
      font-size: .28rem;
      font-weight: 600;
      line-height: 1rem;
    }
    .active{
      color:skyblue;
      border-bottom: 3px solid skyblue;
    }
  }
  .sousuo {
    position: absolute;
    right: 0.1rem;
    top: .24rem;
    font-size: 0.5rem;
    color: #fff;
  }
}
</style>