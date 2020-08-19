<template>
  <div
    :class="{
      'masthead--homepage': isHomePage,
      'masthead--bg-white': isBgWhite || !isHomePage,
      'masthead--animate': isHomePage,
      'masthead--animated': isAnimationFinished,
      'masthead--nav-active': isSiteNavActive,
      'masthead--panel-active': isFloatPanelActive
    }"
    class="masthead"
  >
    <BContainer class="masthead__container">
      <div class="masthead__left">
        <TheBurger
          :is-active="isSiteNavActive"
          @toggle-status="toggleSiteNavMenu"
        />
        <TheLogo class="masthead__logo" />
        <div class="masthead__links">
          <div class="masthead__link">
            <div
              :class="{
                'masthead__catalog-trigger--active': isCatalogMenuActive,
                'masthead__catalog-trigger--bordered': isCatalogPage
              }"
              class="masthead__catalog-trigger"
              @click="toggleCatalogMenu"
            >
              <span>{{ $t('catalogPage.catalog') }}</span>
              <svg-icon name="chevron" class="masthead__chevron-icon" />
            </div>
          </div>
          <NuxtLink
            v-for="item in topMenu.columns"
            :key="item.id"
            :to="$i18n.path(item.slug)"
            class="masthead__link"
            exact-active-class="masthead__link--active"
            exact
          >
            {{ item.name }}
          </NuxtLink>
          <a
            :href="`tel:${contacts.phone}` | convertPhone"
            class="masthead__link masthead__phone"
          >
            {{ contacts.phone }}
          </a>
        </div>
      </div>
      <div class="masthead__right">
        <TheFunctions />
        <!-- <TheAuthButtons /> -->
        <TheLangToggler />
      </div>
    </BContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'

import TheFunctions from './TheFunctions'
// import TheAuthButtons from './TheAuthButtons'
import TheBurger from './TheBurger'
import TheLangToggler from './TheLangToggler'
import TheLogo from '@/components/shared/TheLogo'

import phoneConversion from '@/mixins/phone-conversion'

export default {
  components: {
    TheFunctions,
    // TheAuthButtons,
    TheBurger,
    TheLangToggler,
    TheLogo
  },
  mixins: [phoneConversion],
  props: {
    isSiteNavActive: {
      type: Boolean,
      required: true
    },
    isCatalogMenuActive: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isBgWhite: false,
      isPageScrolled: false,
      isAnimationFinished: false
    }
  },
  computed: {
    ...mapState({
      isBackgroundRevealed: (state) => state.ui.isBackgroundRevealed,
      isFloatPanelActive: (state) => state.ui.isFloatPanelActive,
      currLocale: (state) => state.locale,
      pageType: (state) => state.pageType,
      contacts: (state) => state.contacts
    }),
    topMenu() {
      return this.$store.getters.topMenu
    },
    isHomePage() {
      return (
        this.$route.path === '/' ||
        this.$route.path === `/${this.currLocale}` ||
        this.$route.path === `/${this.currLocale}/`
      )
    },
    isCatalogPage() {
      return this.pageType === 'catalog'
    }
  },
  watch: {
    isBackgroundRevealed: 'animate',
    isCatalogMenuActive: 'setBackground',
    isSiteNavActive: 'setBackground'
  },
  mounted() {
    if (!this.isHomePage) {
      this.isAnimationFinished = true
    }

    window.addEventListener('scroll', this.onPageScroll)
    this.onPageScroll()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onPageScroll)
  },
  methods: {
    animate(status) {
      if (status && this.isHomePage) {
        gsap.to(this.$el, {
          y: 0,
          duration: 1,
          ease: 'expo.out(1, 0.3)',
          onComplete: () => (this.isAnimationFinished = true)
        })
      }
    },
    setAnimationComplete() {
      this.$el.classList.add('masthead--animated')
    },
    onOutSideClick(event) {
      const isTrigger =
        event.target.classList.contains('masthead__catalog-trigger') ||
        event.target.parentNode.classList.contains('masthead__catalog-trigger')

      /* istanbul ignore else */
      if (!isTrigger) {
        this.$emit('toggle-catalog-menu', false)

        document.body.removeEventListener('mouseup', this.onOutSideClick)
      }
    },
    toggleCatalogMenu() {
      if (!this.isCatalogMenuActive) {
        document.body.addEventListener('mouseup', this.onOutSideClick)
      }

      this.$emit('toggle-catalog-menu', !this.isCatalogMenuActive)
    },
    toggleSiteNavMenu() {
      this.$emit('toggle-site-nav', !this.isSiteNavActive)
    },
    setBackground(status) {
      /* istanbul ignore else */
      if (status !== this.isBgWhite && !this.isPageScrolled) {
        this.isBgWhite = status
      }
    },
    onPageScroll() {
      const isMenuActive = this.isSiteNavActive || this.isCatalogMenuActive

      /* istanbul ignore next */
      if (window.pageYOffset > 0 && !this.isBgWhite) {
        this.isPageScrolled = true
        this.isBgWhite = true
      } else if (window.pageYOffset <= 0 && this.isBgWhite && !isMenuActive) {
        this.isPageScrolled = false
        this.isBgWhite = false
      }
    },
    login() {
      this.$auth.loginWith('local', {
        data: {}
      })
    },
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss">
.masthead {
  height: 50px;

  &--bg-white {
    background-color: $white;
    box-shadow: 2px 2px 12px rgba(41, 54, 136, 0.1);
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  &__left,
  &__right {
    display: flex;
    align-items: center;
  }

  &__logo {
    width: 118px;
    margin-left: 18px;
  }

  &__links {
    display: none;
  }

  &__catalog-trigger {
    position: relative;
    cursor: pointer;

    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      content: '';
      background-color: transparent;
      transition: background-color 0.3s;
    }

    &:hover {
      color: $primary;
    }

    &--bordered {
      &::before {
        background-color: $black;
      }
    }

    &--active {
      svg {
        transform: rotate(180deg);
      }
    }

    svg {
      transition: transform 0.3s;
    }
  }

  &__dropdown-lang {
    display: none;
  }

  @include media-breakpoint-down(sm) {
    &--panel-active {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      transform: top 0.3s;
    }
  }

  @include media-breakpoint-down(md) {
    background: $white;

    &--nav-active {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      transform: top 0.3s;
    }
  }

  @include media-breakpoint-up(md) {
    height: 60px;

    &__logo {
      width: 132px;
      margin-left: 30px;
    }

    &__link {
      line-height: 60px;

      &:hover {
        text-decoration: none;
      }
    }

    &__link--danger:not(:hover) {
      color: $primary;
    }
  }

  @include media-breakpoint-up(lg) {
    position: relative;
    z-index: 1;
    transition: background-color 0.3s, box-shadow 0.3s;

    &--animate:not(&--animated) {
      transform: translateY(-60px);
    }

    &__links {
      display: flex;
      align-items: center;
      margin-left: 40px;
    }

    &__link {
      color: $body-color;

      &:not(:last-child) {
        margin-right: 30px;
      }

      &--active {
        color: $primary;
      }
    }

    &__chevron-icon {
      width: 10px;
      height: 10px;
    }

    &__phone {
      margin-left: 15px;
    }

    &__dropdown-lang {
      display: block;
    }
  }

  @include media-breakpoint-up(xl) {
    &__links {
      margin-left: 100px;
    }

    &__link {
      &:not(:last-child) {
        margin-right: 50px;
      }
    }

    &__phone {
      margin-left: 20px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &:not(&--homepage) &__right {
      padding-right: 0;
    }

    &__right {
      padding-right: 120px;
      transition: padding-right 0.5s;
    }
  }
}

.has-banner .masthead--animate:not(.masthead--animated) {
  @include media-breakpoint-up(lg) {
    transform: translateY(-90px);
  }
}

@include media-breakpoint-up(xxl) {
  .masthead--homepage.masthead--bg-white .masthead__right {
    padding-right: 0;
  }
}
</style>
