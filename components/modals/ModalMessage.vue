<template>
  <div>{{ modal.meta.content }}</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      modal: (state) => state.modal.message
    })
  }
}
</script>

<style lang="scss">
.modal-message {
  .modal-header {
    flex-direction: column;
    align-items: center;
    padding-top: 35px;
    padding-bottom: 0;
  }

  .modal-title {
    padding-top: 25px;
    font-size: 14px;
    color: $black;
  }

  .modal-body {
    padding-top: 0;
    font-size: 14px;
    text-align: center;
  }
}
</style>
