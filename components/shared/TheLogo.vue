<template>
  <div class="logo">
    <AppLogoSvg v-if="isHomePage" class="logo__img" />
    <NuxtLink v-else :to="$i18n.path('')" exact>
      <AppLogoSvg class="logo__img" />
    </NuxtLink>
  </div>
</template>

<script>
import AppLogoSvg from './AppLogoSvg'

export default {
  components: {
    AppLogoSvg
  },
  computed: {
    isHomePage() {
      const locale = this.$store.state.locale
      const path = this.$route.path

      return path === '/' || path === `/${locale}` || path === `/${locale}/`
    }
  }
}
</script>

<style lang="scss">
.logo {
  &__img {
    width: 132px;
    height: 18px;
  }
}
</style>
