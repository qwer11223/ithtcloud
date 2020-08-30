import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search_keywords: '',
    checkedCities: [],
    loading: false
  },
  mutations: {
    search(state, keywords) {
      if (keywords !== undefined) {
        this.state.search_keywords = keywords
      }
    },
    checked(state, n) {
      this.state.checkedCities = n
    }
  },
  actions: {
  },
  modules: {
  }
})
