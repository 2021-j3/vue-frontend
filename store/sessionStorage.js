export const state = () => ({
  token: '',
  local_cart: {},
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
