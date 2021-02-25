<template>
  <div class="cart_item">
    <v-row>
      <!--  왼쪽 컬럼-->
      <v-col cols="8" offset="1">
        <!--카트 아이템 리스트-->
        <v-card color="yellow">
          <v-list>
            <!--리스트 헤더-->
            <v-list-item>
              <v-list-item-action class="ma-1">
                <v-btn
                  depressed
                  :input-value="allNodesSelected"
                  @click.stop="toggleCompleteSelection"
                  >전체선택
                </v-btn>
              </v-list-item-action>
              <v-list-item-action class="ma-1">
                <v-btn text :disabled="noNodesSelected" @click="deleteNodes">
                  선택삭제
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <!--리스트 아이템-->
            <v-list-item-group v-model="selectedNodeIds" multiple>
              <v-list-item
                v-for="cartItem in cart"
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
                  <v-list-item-content class="ml-5">
                    <v-flex xs5>
                      <v-text-field
                        v-model="cartItem.quantity"
                        outlined
                        hide-details
                        class="expand ma-0 pa-0"
                        dense
                        type="number"
                        width="1"
                        min="1"
                      ></v-text-field>
                    </v-flex>
                  </v-list-item-content>
                  <v-spacer />
                  <v-list-item-action class="ml-5">
                    {{ cartItem.price }} 원
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
          <v-card color="yellow"> 주소 </v-card>
          <v-card color="red">
            <!-- 선택지 -->
            <v-layout class="options mt-4" justify-end>
              <v-flex xs3 align-self-center
                ><span>{{ totalPrice }} 원</span>
              </v-flex>
            </v-layout>
            <!-- 장바구니, 구매 -->
            <v-layout justify-space-between>
              <v-spacer></v-spacer>
              <v-btn class="ma-1" x-large color="indigo">바로구매</v-btn>
            </v-layout>
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
  data: () => ({
    cart: [
      {
        id: 0,
        cart_item_id: 1,
        active: true,
        thumbnailPath: 'https://placeimg.com/50/50/any',
        title: '상추',
        quantity: 1,
        price: 1000,
      },
      {
        id: 1,
        cart_item_id: 2,
        active: true,
        thumbnailPath: 'https://placeimg.com/50/50/any',
        title: '부리또',
        quantity: 1,
        price: 20000,
      },
      {
        id: 2,
        cart_item_id: 3,
        active: true,
        thumbnailPath: 'https://placeimg.com/50/50/any',
        title: '아스파라거스',
        quantity: 1,
        price: 3000,
      },
    ],
    selectedNodeIds: [],
  }),
  computed: {
    noNodesSelected() {
      return this.selectedNodeIds.length === 0
    },
    allNodesSelected() {
      return this.selectedNodeIds.length === this.cart.length
    },
  },
  methods: {
    deleteNodes(nodeIds) {
      for (const nodeId of this.selectedNodeIds) {
        this.deleteNode(nodeId)
      }
      this.selectedQueueIds = []
    },
    deleteNode(id) {
      this.cart = this.cart.filter((cart) => cart.id !== id)
    },
    toggleCompleteSelection() {
      if (this.allNodesSelected) {
        this.selectedNodeIds = []
      } else {
        this.selectedNodeIds = this.cart.map((item) => item.id)
      }
      console.log(this.selectedNodeIds)
    },
  },
}
</script>

<style scoped></style>
