import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
import * as getters from './getters'
// import state from './state'
// import mutations from './mutations'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    loginStatus: {},
    newsCategories: {}
  },
  mutations: {
    setLoginStatus (state, val) {
      state.loginStatus = val
    },
    setNewsCategories (state, val) {
      state.newsCategories = val
    }
  },
  actions: {
    async nuxtServerInit ({ commit, state }, { req, app }) { // !参数一{dispatch,commit,getters,state} 参数二 {req,res,app}
      // !
      const loginStatusData = await app.$axios.get('http://www.gaohangtt.com/api/Customer/GetCurCustomer')
      commit('setLoginStatus', loginStatusData.data)
      const newsCategoriesData = await app.$axios.get('http://www.gaohangtt.com/api/News/GetAllNewsCategories')
      commit('setNewsCategories', newsCategoriesData.data)
      console.log(process.env.NODE_ENV)
    }
  },
  getters
})

export default store
