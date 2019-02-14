/**
 * account
 * password
 * isRemberPassword
 * isAutoLogin
 */
const state = {
  account: '',
  isLogin: false,
}

const mutations = {
  SET_ACCOUNT(state, value) {
    state.account = value
  },
  SET_ISLOGIN(state, value) {
    state.isLogin = value
  }
}

const actions = {
  setAccount({
    commit
  }, value) {
    commit('SET_ACCOUNT', value)
  },
  setIsLogin({commit}, value) {
    commit('SET_ISLOGIN', value)
  }
}

const getters = {
  getLoginAccount: (state) => {
    return state.account
  },
  getIsLogin: (state) => {
    return state.isLogin
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
