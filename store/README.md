# STORE

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your Vuex Store files.
Vuex Store option is implemented in the Nuxt.js framework.

Creating a file in this directory automatically activates the option in the framework.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/vuex-store).
# 스토어

**이 디렉토리는 필수가 아니며 사용하지 않으려면 삭제할 수 있습니다.**

이 디렉토리에는 Vuex Store 파일이 포함되어 있습니다.
Vuex Store 옵션은 Nuxt.js 프레임 워크에서 구현됩니다.

이 디렉토리에 파일을 생성하면 프레임 워크의 옵션이 자동으로 활성화됩니다.

이 디렉터리 사용에 대한 자세한 내용은 [문서](https://nuxtjs.org/guide/vuex-store) 를 참조하세요.

vuex에 대해서는 다음을 참조하세요
[vuex 사용법](https://vuex.vuejs.org/kr/guide/modules.html)

# 네이밍 컨벤션 정리
[vue에서 제공하는 컨벤션](https://docs.vuestorefront.io/v1/guide/vuex/vuex-conventions.html) 을 정리한 것 입니다

module: 관련있는 기능단위로 묶여있어야 하며 짧은 이름을 갖거나 -(대쉬)로 이어서 만든다
> good:
> * product
> * products
> * compare-product
> 
> bad:
> * next_module
> * compare (무엇을 비교하는지 알 수 없으므로)

state: 값으로 nested 한 구조는 피해야 하며 _(언더스코어) 를 사용하고 무엇을 담는 지 알 수 있는 이름이어야 한다 uniqye한 id로 구분될 수 있는 값을 넣어야 한다 
> good:
> * "user_name": "alexander",
> * "cart_item": [ { "sku": "fasd", "qty": 3 }, { "sku": "hthd", "qty": 2 }  ]
> 
> bad:
> * available: {}, (뭐가 들었는지 명확한 이름이 아님)
> * chosen: {},

getters: vuex strict 모드로 vuex가 표준을 지키는지 확인할 수 있다. 
* is또는 get으로 시작하는 이름
* 모든 vuex 범위에서 unique한 이름
> good:
> * isUserLoggedIn
> * getCurrentProduct
> 
> bad:
> * total
> * product

actions: state내의 변경은 action또는 mutation을 통해서만 이뤄져야 한다

* 서버 또는 캐시에서 값을 가져올 때 사용 
* 같은 모듈 혹은 다른 모듈에서 다른 action을 dispatch 가능
* 거의 모든 action은 promise를 리턴한다

> good:
> * fetchProduct (가까운 데이터소스, 캐시, set에서 특정 id를 기준으로 프로덕트를 가져올때)
> * findProducts (쿼리 등으로 특정 프로덕트들를 가져올때 )
> * setCurrentProduct (파라미터는 id가 될 수 있음, 만약 null이면 현재 프로덕트를 제거하는 것이 좋음)
> * adCartItem
> * toggleMicrocart
> 
> bad:
> * product
> * reset

mutations: 뮤테이션은 상태를 변경하는 유일한 방법이 되어야 함, 동기로 동작해야 하며, 로직을 가져서는 안됨 (상태를 지키기 위한 경우가 아니라면 e.g. defualt value)

> good:
> * SET_PRODUCT (가장 흔한 타입, 프로덕트를 지정하거나, 삭제)
> * ADD_PRODUCT (새로운 프로퍼티를 추가할 때)
> * REMOVE_PRODUCT (프로덕트를 삭제할 때)
> 
> bad:
> * CATEGORY_UPD_CURRENT_CATEGORY (뭐하는지 알수 없음)
> * TAX_UPDATE_RULES (로직이 담기면 안됨)
