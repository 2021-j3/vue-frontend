// CategoryList.vue 에서 사용하는 store
const FILE_NAME = 'store/categories'
export const state = () => ({
  // 상태를 표현하는 변수
  categoryList: {},
})

export const mutations = {
  setCategoryList(state, categoryList) {
    // category tree를 만듦니다
    state.categoryList = {}
    Object.entries(categoryList).forEach((kv) => {
      state.categoryList[kv[1].category_id] = kv[1]
      state.categoryList[kv[1].category_id].sub = []
      if (kv[1].parent_id !== null)
        state.categoryList[kv[1].parent_id].sub.push(kv[1])
    })
    console.log(
      FILE_NAME + '| mutations/setCategoryListList : 카테고리 리스트 생성됨=',
      state.categoryList
    )
  },
}

export const actions = {
  /**
   * 카테고리 목록을 불러오는 메소드
   * @param context
   */
  loadCategories(context) {
    this.$apis
      .getAllCategories()
      .then(
        (data) =>
          new Promise((resolve) => {
            // 오래걸리는 작업
            context.commit('setCategoryList', data)
            console.log(
              FILE_NAME +
                '| actions/loadCategoryList : 카테고리 리스트 생성완료',
              data
            )
            resolve()
          })
      )
      .catch((error) => {
        console.error(
          FILE_NAME + '| actions/loadCategoryList : 에러 발생=',
          error
        )
      })
  },
}

export const getters = {
  // 계산된 속성을 반환하는 메소드
  getCategoryTree(state) {
    const cats = Object.entries(state.categoryList)
      // 루트와 첫번째 자식만 출력한다
      .filter((v) => v[1].parent_id === null || v[1].parent_id === 1)
      // 다시 값만 남긴다
      .map((v) => v[1])
    console.log(
      FILE_NAME +
        " | actions/getCategoryTree : 부모가 ' 전체 카테고리 '인 루트 노드만 필터링 함",
      cats
    )
    return cats
  },
}
