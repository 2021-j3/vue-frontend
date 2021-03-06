// // const strategy = 'local'
// //
// // export default async function({app}){
// //   const { $axios, $auth } = app
// //   let token = $auth.getToken(strategy)
// //
// //   if(token){
// //     $axios.get('/')
// //   }
// // }
// //
// // export default function ({ $auth }, redirect) {
// //   if (!$auth.loggedIn) {
// //   }
// //
// //   // const username = $auth.user.username
// // }
export default function ({ app }) {
  if (!app.$auth.loggedIn) {
    return
  }
  // app.$api.setHeader()
  console.warn(
    'store/auth.js | : TODO: 로그인 후 커스텀 동작을 정의할 수 있습니다 '
  )
}
