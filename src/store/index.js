import { createStore } from 'vuex'
import axios from "../plugins/axios"

export default createStore({
  state: {
    palyList: [
      {
        id: 63574,
        name: "背叛",
        author: ["曹格"],
        picUrl: "http://p4.music.126.net/eDinSMXNYMZHP9nAZ_sQkw==/48378511634444.jpg",
      }
    ],
    index: 0,
    play: false,
    lrc: ""
  },
  mutations: {
    changePlay (state) {
      state.play = !this.state.play
    },
    changePlayList (state, arr) {
      state.palyList = arr
      state.index = 0
    },
    changeIndex (state, index) {
      state.index = index
    },
    changeLrc (state, val) {
      state.lrc = val
    }
  },
  actions: {
    async getLrc (context, id) {
      let res = await axios.get(`/lyric?id=${id}`)
      console.log(res)
      context.commit("changeLrc",res.lrc.lyric)
    }
  },
  modules: {
  }
})
