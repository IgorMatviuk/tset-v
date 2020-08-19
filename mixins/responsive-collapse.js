export default {
  created() {
    if (this.$device.isMobile) {
      this.isVisible = false
      this.allowCollapse = true
    }
  },
  mounted() {
    const mqlMd = matchMedia('(min-width: 768px)')

    mqlMd.addListener(() => {
      if (mqlMd.matches) {
        this.allowCollapse = false
        this.isVisible = true
      } else {
        this.allowCollapse = true
        this.isVisible = false
      }
    })
  },
  methods: {
    onCollapse() {
      if (this.allowCollapse) {
        this.isVisible = !this.isVisible
      }
    }
  }
}
