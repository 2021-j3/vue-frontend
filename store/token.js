// account

export const state = () => ({
  login_info: {
    username: '',
    token: '',
  },
})

export const mutations = {
  SET_LOGIN_INFO(state, value) {
    state.login_info = value
  },
}

export const actions = {
  /**
   * 로그인 후, 토큰 저장 및 메인화면으로 이동
   * @param context
   * @param form
   */
  login(context, form) {
    this.$auth
      .loginWith('local', { data: form })
      .then((response) => response.data)
      .then((data) => {
        console.log('store/token.js | actions/login:', data)
        this.$router.push('/')
        context.dispatch('cart/fetchCart', null, { root: true })
        context.commit('SET_LOGIN_INFO', data)
      })
  },
  /**
   * 로그아웃 후 토큰 삭제 및 메인화면으로 이동
   * @param context
   */
  logout(context) {
    this.$auth.logout()
    this.$router.push('/')
    context.commit('SET_LOGIN_INFO', {})
  },
}

export const getters = {
  getAuthorization(state) {
    return 'Bearer ' + state.login_info.token
  },
  getEmail(state) {
    return state.login_info.username
  },
}
