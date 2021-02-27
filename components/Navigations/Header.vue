<template>
  <div class="search_bar">
    <v-card height="120" color="green">
      <!--타이틀, 검색, 아이콘 버튼-->
      <v-row>
        <v-col cols="1" offset="1">
          <!--타이틀-->
          <v-layout justify-start>
            <h1>j3</h1>
          </v-layout>
        </v-col>
        <v-col cols="5">
          <!--검색창-->
          <v-card flat class="justify-content pa-2 pt-0 pb-2">
            <v-text-field
              v-model="queryString"
              hide-details
              append-icon="mdi-magnify"
              single-line
              full-width
              dense
              class="pt-0 mt-0"
              @click:append="searchByQueryString"
              @keydown.enter="searchByQueryString"
            ></v-text-field>
          </v-card>
        </v-col>
        <v-col cols="4">
          <!--회원정보 버튼-->
          <v-layout v-if="loggedIn" justify-end>
            <v-btn text @click.prevent="logout">로그아웃</v-btn>
            <v-btn text :to="{ path: '/myj3/memberInfo' }">회원정보</v-btn>
            <v-btn text :to="{ path: '/cart' }">장바구니</v-btn>
          </v-layout>
          <v-layout v-else justify-end>
            <v-btn text :to="{ path: '/auth/login' }">로그인</v-btn>
            <v-btn text :to="{ path: '/auth/register' }">회원가입</v-btn>
          </v-layout>
        </v-col>
      </v-row>
      <!--툴바-->
      <v-row>
        <v-col cols="10" offset="1">
          <!--툴바 / 카테고리 메뉴-->
          <v-menu v-model="categoriesMenu">
            <!--툴바 / 카테고리 메뉴 / 메뉴버튼-->
            <template #activator="{ on, attrs }">
              <v-btn
                text
                dark
                icon
                v-bind="attrs"
                min-width="100"
                v-on="on"
                @mouseover="categoriesMenu = true"
              >
                <v-icon>mdi-menu</v-icon>
                전체 카테고리
              </v-btn>
            </template>
            <!--툴바 / 카테고리 메뉴 / 팝업-->
            <v-card
              color="blue"
              flex
              class="mx-auto"
              @mouseleave="
                drawer = false
                categoriesMenu = false
              "
            >
              <v-layout align-start>
                <v-list color="blue" style="z-index: 3 !important">
                  <v-list-item
                    v-for="(category, i) in categories"
                    :key="i"
                    :to="'/categories/' + category.id"
                  >
                    <v-list-item-content
                      @mouseover="
                        drawer = true
                        selectedCategory = category
                      "
                    >
                      <v-list-item-title>
                        {{ category.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-card :elevation="0">
                  <v-navigation-drawer
                    v-if="selectedCategory"
                    v-model="drawer"
                    color="blue"
                  >
                    <v-list v-if="selectedCategory.sub">
                      <v-list-item
                        v-for="(sub, j) in selectedCategory.sub"
                        :key="j"
                        :to="'/categories/' + sub.id"
                      >
                        <v-list-item-title>
                          {{ sub.title }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-navigation-drawer>
                </v-card>
              </v-layout>
            </v-card>
          </v-menu>
          <!--기타 메뉴-->
          <v-btn text href="/categories/new" tile>신상품</v-btn>
          <v-btn text href="/categories/best" tile>베스트</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      drawer: false,
      selectedCategory: null,
      categoriesMenu: false,
      loggedIn: false,
    }
  },
  computed: {
    queryString: {
      get() {
        return this.$store.getters['products/getQuery']
      },
      set(query) {
        this.$store.dispatch('products/setCondition', { query })
      },
    },

    categories() {
      return this.$store.getters['categories/getCategoryTree']
    },
  },
  created() {
    this.$store.dispatch('categories/loadCategories')
    this.loggedIn = this.$auth.loggedIn
  },
  methods: {
    searchByQueryString() {
      this.$store.dispatch('products/findProducts')
    },
    logout() {
      this.$store.dispatch('myAuth/logout')
    },
  },
}
</script>

<style scoped></style>
