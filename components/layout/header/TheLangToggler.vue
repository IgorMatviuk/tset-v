<template>
  <div
    id="langListSync"
    :class="{ 'lang-toggler--active': isVisible }"
    class="lang-toggler"
    @click="toggleVisibility"
  >
    <div class="lang-toggler__active-lang">
      <span>{{ locale }}</span>
      <svg-icon name="chevron" class="lang-toggler__icon" />
    </div>
    <BPopover :show.sync="isVisible" target="langListSync" placement="bottom">
      <div class="lang-toggler-popover">
        <div
          v-for="(item, index) in locales"
          :key="index"
          class="lang-toggler-popover__item"
        >
          <a
            v-if="item !== locale"
            :href="getLocalizedPath(item)"
            class="lang-toggler-popover__link"
          >
            {{ item }}
          </a>
          <div
            v-else
            class="lang-toggler-popover__link lang-toggler-popover__link--active"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </BPopover>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isVisible: false
    }
  },
  computed: {
    ...mapState(['locale', 'locales', 'fallbackLocale'])
  },
  mounted() {
    document.addEventListener('mouseup', this.hideOnOutSideClick)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.hideOnOutSideClick)
  },
  methods: {
    getLocalizedPath(locale) {
      if (locale === this.fallbackLocale) {
        return this.$route.fullPath.replace(`/${this.locale}/`, '/')
      }

      return `/${locale}${this.$route.fullPath}`
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible
    },
    hideOnOutSideClick() {
      if (this.isVisible) {
        this.isVisible = false
      }
    }
  }
}
</script>

<style lang="scss">
.lang-toggler {
  display: none;
  height: 40px;
  margin-left: 22px;
  line-height: 40px;

  &--active &__icon {
    transform: rotate(180deg);
  }

  &__active-lang {
    font-size: 14px;
    cursor: pointer;
  }

  &__icon {
    width: 10px;
    height: 10px;
    transition: transform 0.3s;
  }

  @include media-breakpoint-up(md) {
    display: block;
    height: 60px;
    margin-left: 35px;
    line-height: 60px;
  }
}

.lang-toggler-popover {
  padding: 10px;

  &__item {
    display: block;
  }

  &__link {
    color: $body-color;

    &:hover {
      text-decoration: none;
    }

    &--active {
      color: $primary;
    }
  }
}
</style>
