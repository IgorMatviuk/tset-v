<template>
  <div class="auth-buttons">
    <div v-if="$auth.loggedIn" id="myAccountSync" class="auth-buttons__wrapper">
      <BButton variant="outline-dark" class="auth-buttons__btn">
        Мой кабинет
      </BButton>
      <BPopover
        :show.sync="isMyAccountVisible"
        target="myAccountSync"
        placement="bottom"
        boundary-padding="15"
      >
        <TheMyAccountPopover />
      </BPopover>
    </div>
    <BButton
      v-else
      v-dynamic-modal:form="createModalConfig('login')"
      variant="outline-dark"
      class="auth-buttons__btn"
    >
      вход
    </BButton>
  </div>
</template>

<script>
import TheMyAccountPopover from './TheMyAccountPopover'

import modalConfig from '@/mixins/modal-config'

export default {
  components: {
    TheMyAccountPopover
  },
  mixins: [modalConfig],
  data() {
    return {
      isMyAccountVisible: false
    }
  },
  mounted() {
    document.addEventListener('mouseup', this.hideOnOutSideClick)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.hideOnOutSideClick)
  },
  methods: {
    hideOnOutSideClick() {
      if (this.isMyAccountVisible) {
        this.isMyAccountVisible = false
      }
    }
  }
}
</script>

<style lang="scss">
.auth-buttons {
  &__btn {
    display: none;
    min-width: 80px;
    height: 30px;
    font-weight: normal;
    line-height: 28px;
  }

  @include media-breakpoint-up(md) {
    margin-left: 62px;

    &__btn {
      display: block;
    }
  }

  @include media-breakpoint-up(lg) {
    margin-left: 30px;
  }
}
</style>
