<template>
  <div class="search_bar">
    <v-card height="200px">
      <v-row
        ><v-col cols="8" offset="2">
          <v-layout justify-center>
            <h1>j3</h1>
            <v-spacer />
            <v-card class="justify-content" flat height="100px">
              <v-toolbar floating>
                <v-text-field
                  hide-details
                  append-icon="mdi-magnify"
                  single-line
                ></v-text-field>
              </v-toolbar>
            </v-card>
            <v-spacer />
            <v-btn text>회원정보</v-btn>
            <v-btn text>카드</v-btn>
          </v-layout>
        </v-col>
      </v-row>
      <v-row
        ><v-col cols="8" offset="2">
          <v-menu tile>
            <template #activator="{ on, attrs }">
              <v-btn text dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-menu</v-icon>
                전체 카테고리
              </v-btn>
            </template>
            <v-card
              color="blue"
              flex
              class="mx-auto"
              @mouseleave="drawer = false"
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
                <v-card>
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
      showCategories: false,
    }
  },
  computed: {
    categories() {
      return this.$store.getters['categories/getCategoryList']
    },
  },
}
</script>

<style scoped></style>
