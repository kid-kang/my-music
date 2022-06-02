<template>
  <div class="wrap">
    <img :src="palyList[index].picUrl" />
    <div class="songname">
      <h3>{{ palyList[index].name }}</h3>
      <p>
        <span>歌手：</span>
        <span v-for="item in palyList[index].author" :key="item">{{
          item
        }}</span>
      </p>
    </div>
    <svg class="icon" aria-hidden="true" @click="changePlay">
      <use xlink:href="#icon-bofang" v-if="!play"></use>
      <use xlink:href="#icon-zanting" v-else></use>
    </svg>
  </div>
</template>

<script>
import { mapState, mapMutations} from "vuex"
export default {
  name: "FooterMusic",
  computed: { ...mapState(["palyList", "index","play"]) },
  methods: {...mapMutations(["changePlay"])}
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
  }
  svg{
    width: 1.3rem;
    height: 1.3rem;
  }
}
</style>