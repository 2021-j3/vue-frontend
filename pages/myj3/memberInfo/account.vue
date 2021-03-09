<template>
  <div class="myAccount">
    <AccountUpdateForm
      :cur-data="accountFromDB"
      :onsubmit="onsubmit"
      class="pa-5"
    ></AccountUpdateForm>
  </div>
</template>

<script>
export default {
  name: 'MyAccount',
  data: () => {
    return {}
  },
  computed: {
    accountFromDB() {
      return this.$store.getters['account/getAccount']
    },
  },
  created() {
    this.$store.dispatch('account/fetchAccount')
  },
  methods: {
    onsubmit(value) {
      console.log(value)
      this.$store.dispatch('account/updateAccount', value)
    },
  },
}
</script>

<style scoped></style>
