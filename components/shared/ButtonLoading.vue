<template>
  <BButton
    :disabled="isDisabled"
    :type="type"
    variant="primary"
    class="btn-loading"
  >
    <Spinner v-if="isLoading" />
    <span v-else>{{ text }}</span>
  </BButton>
</template>

<script>
import Spinner from './Spinner'

export default {
  components: {
    Spinner
  },
  props: {
    type: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isDisabled() {
      return this.isLoading || this.$attrs.disabled
    }
  }
}
</script>

<style>
.btn-loading {
  position: relative;
  height: 40px;
}
</style>
