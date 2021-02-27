export const state = () => ({
  token: '',
})

export const mutations = {
  SET_TOKEN(state, value) {
    state.authorization = value
  },
}
export const getters = {
  token(state) {
    return state.token
  },
}
