/* 권한이 필요한 페이지에 다음을 추가합니다
  middleware: ['auth'],
* */
export default function ({ store, route, redirect }) {
  // 권한이 없는 경우 로그인 페이지로 리다이렉션됩니다
  if (!store.getters['auth/loggedIn']) return redirect('/auth/login')
  // 로그인된 경우, 로그인페이지를 홈으로 리다이렉션합니다
  // else if (route.fullPath === '/auth/login') return redirect('/')
}
