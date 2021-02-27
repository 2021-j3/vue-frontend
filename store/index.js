// 전역 에서 사용하는 store

export const state = () => ({
  // 상태를 표현하는 변수
  // status: '사실 쓸 일이 별로 없다'
})

export const mutations = {
  // state 를 변경하는 메소드, 이 메소드를 사욯해서 변경해야함 한다
  // setStatus(state){ state.status = '정해진로직' }
  // param 없이, 혹은 하나의 param 만 사용할 수 있으므로 필요한 경우 객체를 인자로 사용한다
  // setStatus(state, param){ state.status = param.meaningfulAccessor }
  // store/index.js는 root 모듈로 rootState 를 통해 접근할 수 있다
  // setRootStatus(state, param, rootState) { rootState.status = ... }
  // .vue 에서 mutation을 호출할 때는 this.$store.commit('뮤테이션이름', 인자

  SET_TOKEN(state, name) {
    state.sessionStorage.token = name
  },
}

export const actions = {
  // axios 등 비동기를 사용하는 메소드, mutation 보다 먼저 실행되므로 mutation 을 호출 할 수 있다
  // getAccount(context){
  // nuxt.js는 inject한 플러그인 이름에 ""$를 붙여서"" 주입해준다
  //   this.$api.get('/accounts/' + id).then((http)=> {context.commit('뮤테이션이름', {키: '값'}).catch(error => {})})
  // }
  // .vue 에서 action을 호출할 때는 this.$store.dispatch('액션이름', 인자)
}

export const getters = () => ({
  // 계산된 속성을 반환하는 메소드
  // getStatus(state) { return '{status: ' + state.status + '}' }
})
