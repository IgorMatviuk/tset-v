export default {
  computed: {
    countryCode() {
      return this.$store.state.globals.countryCode
    }
  },
  mounted() {
    this.$nextTick(() => this.$refs.tel.choose(this.countryCode))
  }
}
