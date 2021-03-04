<template>
  <v-data-table :headers="headers" :items="addresses" class="elevation-1">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>주문내역</v-toolbar-title>
        <v-divider class="mx-4" vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn-toggle v-model="range" tile color="orange" group>
          <v-btn value="1day">오늘</v-btn>
          <v-btn value="14day">14일</v-btn>
          <v-btn value="30day">한달</v-btn>
          <v-btn value="365day">일년</v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </template>
    <template #[`item.this_is_default`]="{ item }"
      ><v-simple-checkbox v-model="item.this_is_default"></v-simple-checkbox
    ></template>
    <template #[`item.actions`]="{ item }">
      <v-btn text @click="confirmOrder(item)">구매확정</v-btn>
      <br />
      <v-btn text @click="cancelOrder(item)">취소</v-btn>
    </template>
    <template #no-data> 카트를 사용하기 위해서는 주소가 필요합니다 </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    headers: [
      { text: '주문 정보', value: 'order_info', align: 'start' },
      { text: '상품 정보', value: 'item_info' },
      { text: '상태', value: 'status', sortable: false },
      { text: '요청', value: 'actions', sortable: false },
    ],
    range: '',
  }),

  computed: {
    addresses() {
      return [{ order_info: '인포', item_info: '인포2', status: 'status' }]

      // return this.$store.getters['address/addresses']
    },
  },
  methods: {
    checkDetail(item) {
      console.log(item)
      const id = 1
      this.$router.push('orders/' + id)
    },
    confirmOrder(item) {
      console.log(item)
    },
    cancelOrder(item) {
      console.log(item)
    },
  },
}
</script>
