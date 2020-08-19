<template>
  <transition name="fade">
    <div v-if="isTermsOfUseVisible" class="terms-of-use">
      <div class="terms-of-use__content">
        <div class="terms-of-use__text">
          {{ $t('termsOfUse.content') }}
          <NuxtLink
            :to="$i18n.path('privacy-policy')"
            class="terms-of-use__link"
            @click.native="closeTermsOfUse"
          >
            {{ $t('termsOfUse.linkText') }}
          </NuxtLink>
        </div>
        <BButton
          variant="primary"
          class="terms-of-use__btn-accept"
          @click="closeTermsOfUse"
        >
          {{ $t('buttons.accept') }}
        </BButton>
        <button
          class="terms-of-use__close"
          type="button"
          @click="closeTermsOfUse"
        >
          <svg-icon
            name="close"
            class="terms-of-use__icon"
            width="14"
            height="14"
          />
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mutationTypes as uiMutationTypes } from '@/store/ui'

export default {
  computed: {
    isTermsOfUseVisible() {
      return this.$store.state.ui.isTermsOfUseVisible
    }
  },
  methods: {
    closeTermsOfUse() {
      this.$store.commit(
        `ui/${uiMutationTypes.SET_TERMS_OF_USE_VISIBILITY_TOGGLE}`,
        false
      )
    }
  }
}
</script>

<style lang="scss">
.terms-of-use {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 11;
  padding: 25px 0;
  background-color: $white;
  box-shadow: -2px -2px 12px rgba(41, 54, 136, 0.1);

  &__content {
    position: relative;
    max-width: 1200px;
    padding-right: 15px;
    padding-left: 15px;
    margin: 0 auto;
    font-size: 13px;
    line-height: 15px;
    color: $gray-dark-2;
  }

  &__link {
    color: $black;
    text-decoration: underline;

    @include hover-focus-active() {
      color: $black;
      text-decoration: underline;
    }
  }

  &__close {
    @include reset-button-styles();

    position: absolute;
    top: -25px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: $gray-light-1;
    transition: color 0.3s;

    @include hover-focus-active() {
      color: $primary;
    }
  }

  &__icon {
    width: 14px;
    height: 14px;
  }

  @include media-breakpoint-down(lg) {
    padding: 15px 0;

    &__content {
      padding-right: 30px;
      padding-left: 15px;
      font-size: 12px;
      line-height: 14px;
    }

    &__close {
      top: -15px;
    }
  }

  @include media-breakpoint-down(sm) {
    &__btn-accept {
      min-width: 130px;
      height: 30px;
      margin-top: 15px;
      font-size: 12px;
      line-height: 28px;
    }
  }

  @include media-breakpoint-up(md) {
    &__content {
      display: flex;
      align-items: center;
      padding-right: 50px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__content {
      padding-right: 60px;
    }

    &__text {
      padding-right: 30px;
    }
  }
}
</style>
