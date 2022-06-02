import { createStore } from 'vuex'

export default createStore({
  state: {
    palyList: [
      {
        id: 63574,
        name: "背叛",
        author:["曹格"],
        picUrl: "http://p4.music.126.net/eDinSMXNYMZHP9nAZ_sQkw==/48378511634444.jpg",
      }
    ],
    index:0,
    play:false
  },
  mutations: {
    changePlay(){
      this.state.play = !this.state.play
    }
  },
  actions: {
  },
  modules: {
  }
})
