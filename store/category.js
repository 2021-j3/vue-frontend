// Categories.vue 에서 사용하는 store

export const state = () => ({
  selectedCategory: {
    parent: {
      category_id: 0,
      title: 'dummy parent',
    },
    category_id: 1,
    title: 'dummy',
    sub: [
      {
        category_id: 2,
        title: 'dummy child',
      },
      {
        category_id: 3,
        title: 'dummy child2',
      },
    ],
  },
  categories: [
    { title: '파이썬 전체', category_id: 10 },
    { title: '머신러닝', category_id: 11 },
    { title: 'django / flask', category_id: 12 },
    { title: '웹크롤링', category_id: 13 },
    { title: '자동화', category_id: 14 },
  ],
  path_link: [],
})

export const mutations = {
  SET_CATEGORY_TREE_PATH(state, { categories, id }) {
    let cur = categories[id]
    state.path_link = [cur]
    while (cur !== undefined) {
      console.log(cur)
      state.path_link.unshift(categories[cur.parent_id])
      cur = categories[cur.parent_id - 1]
    }
    console.log('path', state.path_link)
  },
}

export const actions = {
  fetchCategory({ dispatch, commit, getters, rootGetters }, id) {
    const categories = getters['categories/getCategoryList']
    if (categories === undefined) return

    console.log('categories>>>', categories)
    commit('SET_CATEGORY_TREE_PATH', {
      categories,
      id: parseInt(id),
    })
  },
}

export const getters = {
  getCategory(state) {
    console.warn(
      'store/category | getters/getCategory : TODO: 카테고리스를 사용하도록 수정해야 합니다'
    )
    return state.categories
  },
}
