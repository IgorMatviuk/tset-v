<template>
  <div
    ref="buttonContainer"
    :style="buttonStyle"
    class="collections__thumbs-container"
  >
    <NuxtLink
      v-for="(item, index) in collections"
      ref="categoriesButton"
      :key="item.id"
      :to="$i18n.path(`${item.slug}`)"
      :class="{
        'collections__button--active': activeItemIndex
          ? activeItemIndex === index
          : index === 0
      }"
      class="collections__button"
    >
      {{ item.name }}
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    collections: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeItemIndex: null,
      offsetLeft: 0
    }
  },
  computed: {
    buttonStyle() {
      return { transform: `translateX(-${this.offsetLeft}px)` }
    }
  },
  mounted() {
    this.$bus.$on('collection:slide-change', this.changeActiveCategories)
  },
  beforeDestroy() {
    this.$bus.$off('collection:slide-change', this.changeActiveCategories)
  },
  methods: {
    changeActiveCategories(activeIndex) {
      const activeElement = this.$refs.categoriesButton[activeIndex].$el

      this.activeItemIndex = activeIndex
      this.offsetLeft = activeElement.offsetLeft
    }
  }
}
</script>
