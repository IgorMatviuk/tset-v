import Vue from 'vue'

import { mutationTypes as modalMutationTypes } from '@/store/modal'

Vue.directive('dynamic-modal', {
  bind(el, binding, vnode) {
    function onModalShow() {
      const store = vnode.context.$store
      const type = binding.arg
      const config =
        binding.value && binding.value.config ? binding.value.config : {}
      const meta = { type, ...config }

      store.commit(`modal/${modalMutationTypes.SET_MODAL_META}`, meta)

      store.commit(`modal/${modalMutationTypes.SET_MODAL_VISIBILITY_TOGGLE}`, {
        type,
        status: true
      })

      if (binding.value && binding.value.data) {
        const data = { ...binding.value.data }
        store.commit(`modal/${modalMutationTypes.SET_MODAL_DATA}`, {
          type,
          data
        })
      }
    }

    el.__onModalShow__ = onModalShow

    el.addEventListener('click', onModalShow)
  },
  unbind(el) {
    el.removeEventListener('click', el.__onModalShow__)
  }
})
