<template>
  <div class="footer__pages">
    <button
      :aria-expanded="isVisible ? 'true' : 'false'"
      :class="{ 'footer__list-title--active': isVisible }"
      class="footer__list-title"
      @click="onCollapse"
    >
      {{ column.name }}
      <svg-icon
        v-if="allowCollapse"
        class="footer__collapse-icon"
        name="chevron"
        width="10"
        height="10"
      />
    </button>
    <BCollapse v-model="isVisible">
      <ul class="footer__list">
        <li
          v-for="(item, index) in column.items"
          :key="index"
          class="footer__list-item"
        >
          <span
            v-if="$route.params.pathMatch === item.slug"
            class="footer__link footer__link--active"
          >
            {{ item.name }}
          </span>
          <NuxtLink
            v-else
            :to="$i18n.path(`${item.slug}`)"
            class="footer__link"
            exact-active-class="footer__link--active"
            exact
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </BCollapse>
  </div>
</template>

<script>
import responsiveCollapse from '@/mixins/responsive-collapse'

export default {
  mixins: [responsiveCollapse],
  props: {
    column: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isVisible: true,
      allowCollapse: false
    }
  }
}
</script>
