const state = {
  account: '',
  isLogin: false,
  openId: ''
}

const mutations = {
  SET_ACCOUNT (state, value) {
    state.account = value
  },
  SET_ISLOGIN (state, value) {
    state.isLogin = value
  },
  SET_OPENID (state, value) {
    state.openId = value
  }
}

const actions = {
  setAccount ({
    commit
  }, value) {
    commit('SET_ACCOUNT', value)
  },
  setIsLogin ({commit}, value) {
    commit('SET_ISLOGIN', value)
  },
  setOpenId ({commit}, value) {
    commit('SET_OPENID', value)
  }
}

const getters = {
  getLoginAccount: (state) => {
    return state.account
  },
  getIsLogin: (state) => {
    return state.isLogin
  },
  getOpenId: (state) => {
    return state.openId
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
