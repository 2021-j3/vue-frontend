<template>
  <div class="cart_item">
    <v-row> 장바구니 </v-row>
    <v-row>
      <v-col cols="8" offset="1">
        <v-card color="pink">
          <v-list subheader>
            <v-subheader>
              <v-btn depressed> 전체 선택 </v-btn>
              <v-btn depressed> 선택 삭제 </v-btn>
            </v-subheader>
            <v-list-item v-for="cartItem in cart" :key="cartItem.title">
              <template #default="{ active }">
                <v-list-item-action>
                  <v-checkbox :input-value="active"></v-checkbox>
                </v-list-item-action>
                <v-list-item-icon>
                  <v-img
                    :alt="`${cartItem.title}`"
                    :src="cartItem.thumbnailPath"
                  ></v-img>
                </v-list-item-icon>
                <v-list-item-content class="ml-5">
                  <v-list-item-title
                    v-text="cartItem.title"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-list>
          총 주문금액 : 얼마
        </v-card>
      </v-col>
      <v-col cols="1">
        <v-card color="white"> </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  // 로그인 불필요
  auth: false,
  data: () => ({
    cart: [
      {
        active: true,
        thumbnailPath: 'https://placeimg.com/50/50/any',
        title: '상추',
      },
      {
        active: true,
        thumbnailPath: 'https://placeimg.com/50/50/any',
        title: '부리또',
      },
      {
        thumbnailPath: 'https://placeimg.com/50/50/any',
        title: '아스파라거스',
      },
    ],
  }),
}
</script>

<style scoped></style>
