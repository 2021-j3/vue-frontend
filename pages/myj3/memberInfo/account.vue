<template>
  <div class="myAccount">
    <account-update-form
      :email.sync="account.email"
      :onsubmit="onsubmit"
      class="pa-5"
    ></account-update-form>
  </div>
</template>

<script>
export default {
  name: 'MyAccount',
  data: () => {
    return {}
  },
  computed: {
    account() {
      console.log('form', this.$store.getters['account/account'])
      return this.$store.getters['account/account']
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
