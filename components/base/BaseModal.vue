<template>
  <BModal ref="baseModal" v-model="showModal" v-bind="config">
    <template v-slot:modal-header>
      <IconSuccess v-if="type === 'message'" />
      <h5 v-if="type !== 'testimonials'" class="modal-title">
        {{ config.title }}
      </h5>
      <button class="modal-close" @click="hideModal">
        <svg-icon name="cross" width="15" height="15" />
      </button>
    </template>
    <component :is="modalComponent" />
  </BModal>
</template>

<script>
import { mapState } from 'vuex'

import IconSuccess from '@/components/shared/IconSuccess'
import ModalForm from '@/components/modals/ModalForm'
import ModalMessage from '@/components/modals/ModalMessage'
import ModalTestimonials from '@/components/modals/ModalTestimonials'

export default {
  components: {
    IconSuccess,
    ModalForm,
    ModalMessage,
    ModalTestimonials
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapState({
      modal(state) {
        return state.modal[this.type]
      }
    }),
    modalComponent() {
      const name = `${this.type.charAt(0).toUpperCase()}${this.type.slice(1)}`
      return `Modal${name}`
    },
    visible(state) {
      return this.modal.visible
    },
    config(state) {
      const { type, modal } = this
      const modalId = `modal${type.charAt(0).toUpperCase()}${type.slice(1)}`

      let modalSize
      let modalClass
      let modalTitle

      if (type === 'form') {
        modalSize = 'md'
        modalClass = `modal-form modal-${this.modal.meta.name}`
        modalTitle = modal.meta.title
      } else if (type === 'message') {
        modalSize = 'sm'
        modalClass = `modal-message modal-${this.modal.meta.name}`
        modalTitle = modal.meta.title
      } else if (type === 'testimonials') {
        modalSize = 'md'
        modalClass = 'modal-testimonials'
        modalTitle = ''
      }

      return {
        id: modalId,
        size: modalSize,
        title: modalTitle,
        centered: true,
        hideFooter: true,
        modalClass
      }
    }
  },
  watch: {
    visible(newValue) {
      this.showModal = newValue
    }
  },
  methods: {
    hideModal() {
      this.$refs.baseModal.hide()
    }
  }
}
</script>

<style lang="scss">
.modal-title {
  width: 100%;
  padding-top: 1rem;
  font-size: 18px;
  color: #3e3e3e;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  color: $gray-dark-2;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  transition: color 0.3s;

  @include hover-focus-active() {
    color: $primary;
    outline: none;
  }
}

.modal-form {
  &.modal-feedback {
    .modal-header {
      padding-bottom: 0;
    }

    .modal-body {
      padding-top: 2px;
      padding-right: 25px;
      padding-bottom: 40px;
      padding-left: 25px;
    }

    @include media-breakpoint-up(sm) {
      .modal-dialog {
        max-width: 330px;
      }
    }

    @include media-breakpoint-up(md) {
      .modal-body {
        padding-right: 35px;
        padding-left: 35px;
      }

      .modal-dialog {
        max-width: 500px;
      }
    }
  }
}

.modal-testimonials {
  .modal-body {
    padding: 0;
  }

  .modal-header {
    padding: 0;
  }

  .modal-close {
    z-index: 1;
    color: $white;

    @include hover-focus-active() {
      color: $primary;
    }
  }

  @include media-breakpoint-up(sm) {
    .modal-dialog {
      max-width: 330px;
    }
  }

  @include media-breakpoint-up(md) {
    .modal-dialog {
      max-width: 475px;
    }

    .modal-close {
      top: 5px;
      right: 4px;
      color: $gray-dark-2;
    }
  }

  @include media-breakpoint-up(lg) {
    .modal-dialog {
      max-width: 590px;
    }
  }

  @include media-breakpoint-up(xl) {
    .modal-close {
      top: 8px;
      right: 7px;
    }

    .modal-dialog {
      max-width: 570px;
    }
  }

  @include media-breakpoint-up(xxl) {
    .modal-dialog {
      max-width: 696px;
    }
  }
}
</style>
