// cart

export const state = () => ({
  default_address: {},
  default_address_no: 0,
  addresses: [],
  initAddress: {
    address_id: -1,
    address: '',
    road_address: '',
    city: '',
    province: '',
    country: '',
    zip_code: '',
  },
})

export const mutations = {
  SET_ADDRESSES(state, item) {
    state.addresses = item
  },
  ADD_ADDRESS(state, item) {
    console.log('push data')
    state.addresses.push(item)
  },
  UPDATE_ADDRESS(state, item) {
    const id = state.addresses.indexOf(item).address_id
    Object.assign(state.addresses[id], item)
  },
}

export const actions = {
  createAddress(context, item) {
    console.log(item)
    this.$api.post('/address', item).then((data) => {
      context.commit('ADD_ADDRESS', item)
    })
  },

  fetchAddresses(context) {
    this.$api.get('/address/my').then((data) => {
      context.commit('SET_ADDRESSES', data)
    })
  },

  updateAddress(context, item) {
    const id = context.state.addresses.indexOf(item).address_id
    this.$api.put('/address/' + id, item).then((data) => {
      context.commit('UPDATE_ADDRESS', item)
    })
  },

  deleteAddress(context, item) {
    const id = context.state.addresses.indexOf(item).address_id
    this.$api.delete('/address/' + id)
  },
}

export const getters = {
  addresses(state) {
    return state.addresses
  },
  initAddress(state) {
    return state.initAddress
  },
}
