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
  app.$api.setHeader()
  console.log('custom login is here')
}
