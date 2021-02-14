// CategoryList.vue 에서 사용하는 store

export const state = () => ({
  // 상태를 표현하는 변수
  categoryList: [],
  dummyCategoryList: [
    {
      id: 1,
      title: '전체카테고리',
    },
    {
      id: 2,
      title: '식품전체',
      sub: [
        { id: 3, title: '채소' },
        { id: 4, title: '수산물' },
        { id: 5, title: '정육 계란' },
        { id: 6, title: '간편식' },
      ],
    },
  ],
})

export const mutations = {
  setCategoryList(state, CategoryList) {
    console.log(
      'store/CategoryList.js/mutations/setCategoryListList:\n',
      CategoryList
    )
    state.categoryList = []
    state.categoryList.push(CategoryList)
  },
}

export const actions = {
  loadCategoryList(context, id) {
    console.log('store/CategoryList.js/actions/loadCategoryList:\nid is', id)
    this.$api
      .get('/Categories/' + id)
      .then((data) => data.data)
      .then((data) => {
        console.log('store/CategoryList.js/actions/loadCategoryList:\n', data)
        context.commit('setCategoryList', data)
      })
      .catch((error) => {
        console.error(
          'store/CategoryList.js/actions/loadCategoryList:\n',
          error
        )
      })
  },
}

export const getters = {
  // 계산된 속성을 반환하는 메소드
  getCategoryList(state) {
    if (state.categoryList.length > 0) {
      console.log(
        'store/CategoryList.js/actions/getCategoryList:\n',
        state.categoryList
      )
      return state.categoryList
    } else {
      console.log(
        'store/CategoryList.js/actions/getCategoryList:\n',
        state.dummyCategoryList
      )
      return state.dummyCategoryList
    }
  },
}
