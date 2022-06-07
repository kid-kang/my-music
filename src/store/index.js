import { nanoid } from 'nanoid'
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
    lrc: [],
    enterMusicDetail: false,
    curTime: 0,
    token: localStorage.getItem("token") || false,
    userId: localStorage.getItem("userId") || 0
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
    },
    changeEnterMusicDetail (state) {
      state.enterMusicDetail = !state.enterMusicDetail
    },
    changeCurTime (state, val) {
      state.curTime = val
    },
    searchAndPush (state, val) {
      state.palyList.push(val)
    },
    setToken (state, val) {
      localStorage.setItem("token", val)
      state.token = val
    },
    setUserId (state, val) {
      localStorage.setItem("userId", val)
      state.userId = val
    }
  },
  actions: {
    async getLrc (context, id) {
      let res = await axios.get(`/lyric?id=${id}`)
      let format = res.lrc.lyric.split(/[(\r\n)\r\n]+/).map(val => {
        let min, sec, mill, lrc, id
        min = val.slice(1, 3)
        sec = val.slice(4, 6)
        mill = val.slice(7, 10)
        lrc = val.slice(11,)
        id = nanoid()
        if (isNaN(mill)) {
          mill = val.slice(7, 9)
          lrc = val.slice(10,)
        }
        let time = min * 1000 * 60 + sec * 1000 + mill * 1
        return { time, lrc, id }
      })
      format.forEach((val, i) => {
        let next = i === format.length - 1 ? Infinity : format[i + 1].time
        val.next = next
      })
      context.commit("changeLrc", format)
    }
  },
  modules: {
  }
})
