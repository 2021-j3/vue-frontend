<template>
  <v-card color="yellow" elevation="0" min-width="80">
    <v-text-field
      v-model="_number"
      class="centered-input ma-0"
      dense
      hide-details
      suffix="개"
      type="number"
      @click.stop
    >
      <v-icon slot="append-outer" class="ml-n2" @click.stop="increase">
        mdi-plus
      </v-icon>
      <v-icon slot="prepend" class="mr-n2" @click.stop="decrease">
        mdi-minus
      </v-icon>
    </v-text-field>
  </v-card>
</template>

<script>
export default {
  name: 'MinusPlus',
  props: {
    number: { type: Number, default: 1 },
    onIncrease: {
      type: Function,
      default: null,
    },
    onDecrease: {
      type: Function,
      default: null,
    },
    refObject: { type: Object, default: null },
    minNum: { type: Number, default: 1 },
    maxNum: { type: Number, default: 100000000 },
  },
  computed: {
    _number: {
      get() {
        return this.$props.number
      },
      set(value) {
        value = parseInt(value)
        if (value < this.$props.minNum) value = this.$props.minNum
        // this.$emit('update:number', value, this.refObject)
        this.emitOptional(value, this.refObject)
      },
    },
  },
  methods: {
    decrease() {
      let newNum = this._number - 1
      if (newNum < this.$props.minNum) newNum = this.$props.minNum
      // this.$emit('update:number', newNum, this.refObject)
      this.emitOptional(newNum, this.refObject)
    },
    increase() {
      let newNum = this._number + 1
      if (newNum > this.$props.maxNum) newNum = this.$props.maxNum
      // this.$emit('update:number', newNum, this.refObject)
      this.emitOptional(newNum, this.refObject)
    },
    emitOptional(newNum, ref) {
      if (this.refObject !== null) this.$emit('update', newNum, ref)
      else this.$emit('update', newNum)
    },
  },
}
</script>

<style scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
