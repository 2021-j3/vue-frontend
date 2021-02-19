// CategoryList.vue 에서 사용하는 store

export const state = () => ({
  // 상태를 표현하는 변수
  categoryTree: {},
  categoryList: {},
  dummyCategoryList: [
    {
      category_id: 1,
      title: '전체카테고리',
    },
    {
      category_id: 2,
      title: '식품전체',
      sub: [
        { category_id: 3, title: '채소' },
        { category_id: 4, title: '수산물' },
        { category_id: 5, title: '정육 계란' },
        { category_id: 6, title: '간편식' },
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
    // category tree를 만듦니다
    state.categoryTree = {}
    Object.entries(CategoryList).forEach((kv) => {
      state.categoryTree[kv[1].category_id] = kv[1]
      state.categoryTree[kv[1].category_id].sub = []
      if (kv[1].parent_id !== null)
        state.categoryTree[kv[1].parent_id].sub.push(kv[1])
    })
    // state.categoryList = []
    // state.categoryList.push(CategoryList)
    state.categoryList = { ...CategoryList }
    console.log('this is cat list', CategoryList, state.categoryList)
  },
}

export const actions = {
  /**
   * 카테고리 목록을 불러오는 메소드
   * @param context
   * @param id
   */
  loadCategories(context) {
    this.$api
      .get('/categories')
      // .then((data) => data.data)
      .then(
        (data) =>
          new Promise((resolve) => {
            // 오래걸리는 쿼리
            console.log(
              'store/categoryList.js/actions/loadCategoryList:\n',
              data
            )
            context.commit('setCategoryList', data)
            resolve()
          })
      )
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
  getCategoryTree(state) {
    const cats = Object.entries(state.categoryTree)
      // 루트와 첫번째 자식만 출력한다
      .filter((v) => v[1].parent_id === null || v[1].parent_id === 1)
      // 다시 값만 남긴다
      .map((v) => v[1])
    console.log('store/CategoryList.js/actions/getCategoryTree:\n', cats)
    return cats
  },
}
