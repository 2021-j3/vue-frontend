// account

export const state = () => ({
  login_info: {
    username: '',
    loggedIn: false,
  },
})

export const mutations = {
  SET_LOGIN_INFO(state, value) {
    state.login_info = value
    console.log('로그인 인포를 설정함', state.login_info)
  },
}

export const actions = {
  /**
   * 로그인 후, 토큰 저장 및 메인화면으로 이동
   * @param context
   * @param form
   */
  login(context, form) {
    return new Promise((resolve, reject) => {
      this.$apis
        .login(form)
        .then((data) => {
          context.commit('SET_LOGIN_INFO', {
            username: '',
            loggedIn: true,
          })
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
    // this.$auth
    //   .loginWith('local', { data: form })
    //   .then((response) => response.data)
    //   .then((data) => {
    //     console.log('store/token.js | actions/login:', data)
    //     this.$router.push('/')
    //     context.dispatch('cart/fetchCart', null, { root: true })
    //     // context.commit('SET_LOGIN_INFO', data)
    //   })
  },
  /**
   * 로그아웃 후 토큰 삭제 및 메인화면으로 이동
   * @param context
   */
  logout(context) {
    this.$apis.logout()
    this.$router.push('/')
    context.commit('SET_LOGIN_INFO', {
      username: '',
      loggedIn: false,
    })
  },
}
export const getters = {
  loggedIn(state) {
    return state.login_info.loggedIn
  },
}
