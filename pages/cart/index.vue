<template>
  <div class="cart_item">
    <v-row> 장바구니 </v-row>
    <v-row>
      <v-col cols="8" offset="1">
        <v-card color="white">
          <v-list subheader>
            <v-subheader>Recent chat</v-subheader>

            <v-list-item v-for="chat in recent" :key="chat.title">
              <v-list-item-avatar>
                <v-img :alt="`${chat.title} avatar`" :src="chat.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="chat.title"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon :color="chat.active ? 'deep-purple accent-4' : 'grey'">
                  mdi-message-outline
                </v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
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
  name: 'MyCart',
  // 로그인 불필요
  auth: false,
  data: () => ({
    recent: [
      {
        active: true,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Jason Oner',
      },
      {
        active: true,
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Mike Carlson',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Cindy Baker',
      },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Ali Connors',
      },
    ],
    previous: [
      {
        title: 'Travis Howard',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      },
    ],
  }),
}
</script>

<style scoped></style>
