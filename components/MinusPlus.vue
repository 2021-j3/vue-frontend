<template>
  <v-flex xs2>
    <v-text-field
      v-model="number"
      outlined
      hide-details
      class="expand ma-0 pa-0"
      dense
      width="1"
      prepend-inner-icon="mdi-minus-circle-outline"
      append-icon="mdi-plus-circle-outline"
      min="1"
      @click:prepend-inner="decrease"
      @click:append="increase"
    ></v-text-field>
  </v-flex>
</template>

<script>
export default {
  name: 'MinusPlus',
  data() {
    return {
      number: 0,
    }
  },
  methods: {
    decrease() {
      this.number -= 1
    },
    increase() {
      this.number += 1
    },
  },
}
</script>

<style scoped></style>
