<template>
  <Login v-if="!$store.state.token"/>
  <Collection v-else/>
</template>

<script>
import Login from "@/components/Login.vue"
import Collection from "@/components/Collection.vue"
export default {
  name:"Me",
  components:{Login,Collection}
}
</script>

<style>

</style>