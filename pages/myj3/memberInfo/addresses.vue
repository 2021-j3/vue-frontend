<template>
  <v-data-table :headers="headers" :items="addresses" class="elevation-1">
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>배송지 관리</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="initItem"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-form ref="form" v-model="valid" @submit.prevent="save">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.road_address"
                      label="주소"
                      required
                    ></v-text-field>
                  </v-row>

                  <v-row>
                    <v-text-field
                      v-model="editedItem.zip_code"
                      label="우편번호"
                      required
                    ></v-text-field>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text type="submit"> Save </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template #[`item.this_is_default`]="{ item }"
      ><v-simple-checkbox v-model="item.this_is_default"></v-simple-checkbox
    ></template>
    <template #[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template #no-data> 카트를 사용하기 위해서는 주소가 필요합니다 </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    valid: false,
    headers: [
      { text: '기본배송지', value: 'this_is_default', align: 'start' },
      { text: '주소', value: 'road_address' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    addresses() {
      return this.$store.getters['address/addresses']
    },
    defaultItem() {
      return this.$store.getters['address/initAddress']
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.$store.dispatch('address/fetchAddresses')
  },

  methods: {
    initItem() {
      this.editedItem = this.$store.getters['address/initAddress']
    },
    editItem(item) {
      this.editedIndex = this.addresses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.addresses.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.addresses.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.$store.dispatch('address/deleteAddress', this.editItem)
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch('address/updateAddress', this.editItem)
      } else {
        this.$store.dispatch('address/createAddress', this.editedItem)
      }
      this.close()
    },
  },
}
</script>
