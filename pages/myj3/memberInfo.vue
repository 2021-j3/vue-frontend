<template>
  <v-row>
    <v-col cols="2" offset="1">
      <v-card>
        <v-list-item-group v-model="selectedInfo" color="violet">
          <v-list-item
            v-for="(info, index) in infos"
            :key="index"
            :to="info.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="info.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-card>
    </v-col>
    <v-col cols="8">
      <nuxt-child></nuxt-child>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MemberInfo',
  data: () => ({
    selectedInfo: 0,
    infos: [
      { title: '주문내역', to: { name: 'myj3-memberInfo-orders' } },
      { title: '후기', to: { name: 'myj3-memberInfo-reviews' } },
      { title: '배송지관리', to: { name: 'myj3-memberInfo-addresses' } },
      { title: '개인정보수정', to: { name: 'myj3-memberInfo-account' } },
    ],
  }),
}
</script>

<style scoped></style>
