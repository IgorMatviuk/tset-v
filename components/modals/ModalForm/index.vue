<template>
  <div>
    <div v-if="modal.meta.actionText" class="modal-action">
      {{ modal.meta.actionText }}
    </div>
    <ModalFormGroup
      :fields="modal.meta.fields"
      :submit-text="modal.meta.submitText"
      :action="modal.meta.action"
      @submit="onFormSubmit"
    />
    <div
      v-if="modal.meta.links"
      :class="modalLinksClassName"
      class="modal-links"
    >
      <div
        v-for="(link, index) in modal.meta.links"
        :key="getLinkKey(index, link.nextModal)"
        :class="getLinkClassName(link.nextModal)"
      >
        <span v-if="link.label">{{ link.label }}</span>
        <span
          v-dynamic-modal:form="createModalConfig(link.nextModal)"
          class="next-modal-trigger"
          :class="{ 'next-modal-trigger--colored': link.label }"
        >
          {{ link.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ModalFormGroup from './ModalFormGroup'

import modalConfig from '@/mixins/modal-config'
import { mutationTypes as modalMutationTypes } from '@/store/modal'

export default {
  components: {
    ModalFormGroup
  },
  mixins: [modalConfig],
  computed: {
    ...mapState({
      modal: (state) => state.modal.form
    }),
    modalLinksClassName() {
      const { links } = this.modal.meta
      const isCenter = links && links.length === 1
      const isBetween = links && links.length > 1

      return {
        'justify-center': isCenter,
        'justify-between': isBetween
      }
    }
  },
  methods: {
    getLinkClassName(nextModal) {
      return `link-${nextModal}`
    },
    getLinkKey(index, nextModal) {
      return `${nextModal}_${index}`
    },
    onFormSubmit(data) {
      this.$store.commit(
        `modal/${modalMutationTypes.SET_MODAL_VISIBILITY_TOGGLE}`,
        { type: 'form', status: false }
      )

      const { showSuccessMessage } = this.modal.meta.action

      /* istanbul ignore else */
      if (showSuccessMessage) {
        this.$store.commit(
          `modal/${modalMutationTypes.SET_MODAL_VISIBILITY_TOGGLE}`,
          { type: 'message', status: true }
        )
      }
    }
  }
}
</script>

<style lang="scss">
.modal-action {
  margin-bottom: 14px;
  font-size: 11px;
  color: $gray-dark-1;
  text-align: center;
}

.modal-links {
  display: flex;
  margin-top: 18px;
  font-size: 10px;
  color: $text-color;

  &.justify-center {
    justify-content: center;
  }

  &.justify-between {
    justify-content: space-between;
  }

  .next-modal-trigger {
    cursor: pointer;

    &:hover {
      color: $link-hover-color;
    }

    &--colored {
      color: $primary;
    }
  }
}
</style>
