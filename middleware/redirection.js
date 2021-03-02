export default function ({ store, route, redirect }) {
  // memberInfo 는 주문내역을 우선적으로 보여줌
  if (route.fullPath === '/myj3' || route.fullPath === '/myj3/memberInfo')
    return redirect('/myj3/memberInfo/orders')
}
