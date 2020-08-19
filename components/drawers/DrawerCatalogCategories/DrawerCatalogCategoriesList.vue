<template>
  <div class="mobile-categories">
    <ul class="mobile-categories__list">
      <template v-for="category in categories">
        <template v-if="category.categories && category.categories.length">
          <template v-for="subcategory in category.categories">
            <li
              :key="subcategory.id"
              class="mobile-categories__list-item"
              @click="closeCatalogDrawers"
            >
              <NuxtLink
                v-if="!getLinkIsActive(category, subcategory)"
                :to="getCategoryPath(category, subcategory)"
                class="mobile-categories__link"
              >
                {{ subcategory.name }}
              </NuxtLink>
              <span
                v-else
                class="mobile-categories__link mobile-categories__link--active"
              >
                {{ subcategory.name }}
              </span>
              <svg-icon
                class="mobile-categories__icon"
                name="chevron"
                width="10"
                height="10"
              />
            </li>
          </template>
        </template>
        <template v-else>
          <li
            :key="category.id"
            class="mobile-categories__list-item"
            @click="closeCatalogDrawers"
          >
            <NuxtLink
              v-if="!getLinkIsActive(category, category)"
              :to="getCategoryPath(category, category)"
              class="mobile-categories__link"
            >
              {{ category.name }}
            </NuxtLink>
            <span
              v-else
              class="mobile-categories__link mobile-categories__link--active"
            >
              {{ category.name }}
            </span>
            <svg-icon
              class="mobile-categories__icon"
              name="chevron"
              width="10"
              height="10"
            />
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mutationTypes } from '@/store/ui'

export default {
  computed: {
    ...mapState({
      categories: (state) => state.catalog.categories
    })
  },
  methods: {
    getCategoryPath(category, childCategory) {
      if (category.slug === childCategory.slug) {
        return this.$i18n.path(category.slug)
      }

      return this.$i18n.path(`${category.slug}/${childCategory.slug}`)
    },
    getLinkIsActive(category, childCategory) {
      const path = this.getCategoryPath(category, childCategory)
      return this.$route.path === path
    },
    closeCatalogDrawers() {
      this.$store.commit(
        `ui/${mutationTypes.SET_CATEGORIES_DRAWER_VISIBILITY_TOGGLE}`,
        false
      )
    }
  }
}
</script>

<style lang="scss">
.mobile-categories {
  &__list {
    @include list-unstyled();

    margin-bottom: 0;
  }

  &__list-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $light-3;
  }

  &__link {
    display: inline-block;
    flex-grow: 1;
    font-size: 12px;
    line-height: 49px;

    &--active {
      color: $primary;
    }
  }

  &__icon {
    align-self: center;
    width: 10px;
    height: 10px;
    transform: rotate(-90deg);
  }
}
</style>
