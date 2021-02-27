// account

export const state = () => ({
  // 상태를 표현하는 변수
})

export const mutations = {}

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
        console.log('store/myAuth.js actions/login:', data)
        this.$router.push('/')
        context.commit('SET_TOKEN', data.token, { root: true })
      })
  },
  /**
   * 로그아웃 후 토큰 삭제 및 메인화면으로 이동
   * @param context
   */
  logout(context) {
    this.$auth.logout()
    this.$router.push('/')
    context.commit('SET_TOKEN', '', { root: true })
  },
}

export const getters = {
  getAuthorization(state, getters, rootState, rootGetters) {
    const token = rootGetters['sessionStorage/token']
    console.log(token)
    return 'Bearer ' + token
  },
}
