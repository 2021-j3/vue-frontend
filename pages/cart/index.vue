<template>
  <div class="cart_item">
    <v-row>
      <!--  왼쪽 컬럼-->
      <v-col cols="8" offset="1">
        <!--카트 아이템 리스트-->
        <v-card color="yellow">
          <v-list>
            <!--리스트 조작 버튼-->
            <v-list-item>
              <v-list-item-action class="ma-1">
                <v-btn
                  depressed
                  :input-value="allItemsSelected"
                  @click.stop="toggleCompleteSelection"
                  >전체선택
                </v-btn>
              </v-list-item-action>
              <v-list-item-action class="ma-1">
                <v-btn text :disabled="noItemsSelected" @click="deleteItems">
                  선택삭제
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <!--리스트 아이템-->
            <v-list-item-group v-model="selectedList" multiple>
              <v-list-item
                v-for="cartItem in cart.cart_items"
                :key="cartItem.cart_item_id"
              >
                <template #default="{ active }">
                  <v-list-item-action class="ma-1">
                    <v-checkbox
                      :input-value="active"
                      :true-value="cartItem.id"
                    />
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
                  <v-spacer />
                  <v-list-item-action>
                    <v-row>
                      <v-col cols="5" offset="4">
                        <minus-plus
                          :ref-object="cartItem"
                          :number="cartItem.quantity"
                          @update="onChanged"
                        ></minus-plus>
                      </v-col>
                      <v-col cols="3">{{ cartItem.price }} 원</v-col>
                    </v-row>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
          yellow
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card>
          <v-card color="yellow pa-5">
            <v-card-title>배송지</v-card-title>
            <v-card-text>{{ shippingAddress }}</v-card-text>
          </v-card>
          <v-card color="red pa-5">
            <v-card-title>결제 예정 금액</v-card-title>
            <v-layout justify-space-between>
              <span class="text-left"> 전체금액 </span>
              <span class="text-right">{{ item_price_total }} 원 </span>
            </v-layout>
            <v-layout justify-space-between>
              <span class="text-left"> 할인 금액 </span>
              <span> -{{ item_discount }} 원 </span>
            </v-layout>
            <v-layout justify-space-between>
              <span class="text-left"> 배송비 </span>
              <span> +{{ shipping }} 원 </span>
            </v-layout>
            <v-layout justify-space-between>
              <span>적용 금액</span>
              <span>{{ final_price }} 원</span>
            </v-layout>
            <!-- 장바구니, 구매 -->
            <v-btn color="indigo" class="mt-5" block>결제하기</v-btn>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  // 로그인 불필요
  auth: false,
  data: () => ({}),
  computed: {
    cart() {
      return this.$store.getters['cart/cart']
    },
    selectedList: {
      get() {
        return this.$store.getters['cart/selectedCartItems']
      },
      set(value) {
        console.log(value)
        this.$store.dispatch('cart/setSelectedCartItem', value)
      },
    },
    noItemsSelected() {
      return this.$store.getters['cart/noItemsSelected']
    },
    allItemsSelected() {
      return this.$store.getters['cart/allItemsSelected']
    },
    item_price_total() {
      return this.$store.getters['cart/item_price_total']
    },
    item_discount() {
      return this.$store.getters['cart/item_discount']
    },
    shipping() {
      return this.$store.getters['cart/shipping']
    },
    final_price() {
      return this.$store.getters['cart/final_price']
    },
    shippingAddress(state) {
      return this.$store.getters['cart/shippingAddress']
    },
  },
  created() {
    this.$store.dispatch('cart/fetchCart')
  },
  methods: {
    deleteItems() {
      this.$store.dispatch('cart/deleteSelectedCartItems')
    },
    toggleCompleteSelection() {
      this.$store.dispatch('cart/toggleSelectedCartItems')
    },
    onChanged(value, ref) {
      console.log(value, ref)
      this.$store.dispatch('cart/setCartItemQuantity', {
        cartItemId: ref.cart_item_id,
        quantity: value,
      })
    },
  },
}
</script>
<style scoped></style>
