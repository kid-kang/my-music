<template>
  <nav>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="发现好音乐" name="/"></el-tab-pane>
      <el-tab-pane label="我的收藏" name="/me"></el-tab-pane>
    </el-tabs>
      <svg class="icon sousuo" aria-hidden="true">
      <use xlink:href="#icon-sousuo"></use>
    </svg>
  </nav>
</template>

<script>
export default {
  name: "Navlink",
  data () {
    return {
      activeName: '/',
    }
  },
  methods: {
    handleClick (tab) {
      this.$router.push(tab.props.name)
    },
  },
}
</script>

<style lang="less" scoped>
nav {
  display: flex;
  position: relative;
  justify-content: space-around;
  align-items: center;
  height: 1rem;
  .sousuo{
    position: absolute;
    right: .1rem;
    top: 8px;
    font-size: .5rem;
  }
}
</style>