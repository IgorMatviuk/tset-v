import { mapState } from 'vuex'

import { mutationTypes as catalogMutationsTypes } from '@/store/catalog'
import { mutationTypes as uiMutationsTypes } from '@/store/ui'

export default {
  data() {
    return {
      orderList: [
        // prettier-ignore
        { title: this.$t('catalogPage.sorting.popularity'), type: 'popularity' },
        { title: this.$t('catalogPage.sorting.priceAsc'), type: 'price-asc' },
        { title: this.$t('catalogPage.sorting.priceDesc'), type: 'price-desc' },
        { title: this.$t('catalogPage.sorting.new'), type: 'new' }
      ]
    }
  },
  computed: {
    ...mapState({
      order: (state) => state.catalog.order
    }),
    activeOrder() {
      return this.orderList.find((list) => list.type === this.order)
    }
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible
    },
    toggleOrder(order) {
      this.$store.commit(`catalog/${catalogMutationsTypes.SET_ORDER}`, order)

      this.$store.commit(
        `ui/${uiMutationsTypes.SET_FILTERS_DRAWER_VISIBILITY_TOGGLE}`,
        false
      )

      const nextQuery = Object.keys(this.$route.query).reduce(
        (nextQuery, key) => {
          if (key !== 'order') {
            nextQuery[key] = this.$route.query[key]
          }

          return nextQuery
        },
        {}
      )

      if (order !== 'popularity') {
        nextQuery.order = order
      }

      this.$router.push({ path: this.$route.path, query: nextQuery })
    }
  }
}
