<template>
  <div class="myAccount">
    <account-update-form
      :onsubmit="onsubmit"
      class="pa-5"
    ></account-update-form>
  </div>
</template>

<script>
export default {
  name: 'MyAccount',
  methods: {
    onsubmit(value) {
      console.log(value)
      this.$store.dispatch('account/updateAccount', value)
    },
  },
}
</script>

<style scoped></style>
