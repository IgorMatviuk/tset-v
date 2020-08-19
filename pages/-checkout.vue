<template>
  <main class="checkout-page">
    <TheBreadcrumb :static-items="breadcrumb" />
    <BContainer>
      <button
        v-if="activeCheckoutStep > checkoutSteps.orderSummary"
        class="checkout-page__previous"
        @click="goToPrevStep"
      >
        <svg-icon
          name="chevron"
          class="checkout-page__icon"
          width="10"
          height="10"
        />
        {{ $t('navigation.back') }}
      </button>
      <div class="checkout-page__row">
        <h1
          v-show="activeCheckoutStep === checkoutSteps.orderSummary"
          class="checkout-page__title"
        >
          {{ $t('pages.cart') }}
        </h1>
        <template v-if="isCartNonEmpty">
          <BlockCheckoutInfo
            v-show="
              isVisible || activeCheckoutStep > checkoutSteps.orderSummary
            "
            class="checkout-page__info"
            :is-visible="isVisible"
            :checkout-step="activeCheckoutStep"
            :checkout-steps="checkoutSteps"
            @next-step="goToNextStep"
          />
          <BlockCheckoutOrder
            v-show="activeCheckoutStep === checkoutSteps.orderSummary"
            :order-summary="cart"
            class="checkout-page__order"
          />
          <div
            v-if="
              !isVisible && activeCheckoutStep === checkoutSteps.orderSummary
            "
            class="checkout-page__button-wrapper"
          >
            <BButton
              class="checkout-page__button"
              block
              variant="primary"
              @click="goToNextStep"
            >
              {{ $t('checkoutPage.checkout') }}
            </BButton>
          </div>
        </template>
        <BlockCheckoutEmpty v-else />
      </div>
      <!-- <BButton
        v-if="!isVisible && activeCheckoutStep === checkoutSteps.orderSummary"
        class="checkout-page__button"
        block
        variant="primary"
        @click="gotToNextStep"
      >
        оформить заказ
      </BButton> -->
      <LoadingOverlay v-if="isLoading" />
    </BContainer>
  </main>
</template>

<script>
import { mapState } from 'vuex'

import TheBreadcrumb from '@/components/layout/breadcrumb/TheBreadcrumb'
import BlockCheckoutInfo from '@/components/blocks/BlockCheckoutInfo'
import BlockCheckoutOrder from '@/components/blocks/BlockCheckoutOrder'
import BlockCheckoutEmpty from '@/components/blocks/BlockCheckoutEmpty'
import LoadingOverlay from '@/components/shared/LoadingOverlay'

import breadrumb from '@/mixins/breadrumb'

import pageActions from '@/utils/page-actions'

export default {
  components: {
    TheBreadcrumb,
    BlockCheckoutInfo,
    BlockCheckoutOrder,
    BlockCheckoutEmpty,
    LoadingOverlay
  },
  mixins: [breadrumb({ isStaticPage: true, pageName: 'cart' })],
  async fetch({ store }) {
    await pageActions.checkout({ store })
  },
  data() {
    return {
      isVisible: true,
      activeCheckoutStep: 1,
      checkoutSteps: {
        orderSummary: 1,
        contactInfo: 2,
        deliveryInfo: 3,
        paymentInfo: 4
      }
    }
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart.cartData,
      isLoading: (state) => state.cart.isLoading
    }),
    isCartNonEmpty() {
      const itemsQty = Number(this.cart.items_qty)
      return itemsQty > 0
    }
  },
  created() {
    if (this.$device.isMobile) {
      this.isVisible = false
    }
  },
  mounted() {
    const mqlMd = matchMedia('(min-width: 768px)')

    if (mqlMd.matches) {
      this.isVisible = true
      this.activeCheckoutStep = 1
    } else {
      this.isVisible = false
    }

    mqlMd.addListener(() => {
      if (mqlMd.matches) {
        this.isVisible = true
        this.activeCheckoutStep = 1
      } else {
        this.isVisible = false
      }
    })
  },
  methods: {
    goToNextStep() {
      this.activeCheckoutStep += 1
      this.scrollToTop()
    },
    goToPrevStep() {
      this.activeCheckoutStep -= 1
    },
    scrollToTop() {
      this.$scrollTo(document.body, 800, { force: true })
    }
  },
  head() {
    return {
      title: this.$t('pages.cart')
    }
  }
}
</script>

<style lang="scss">
.checkout-page {
  position: relative;
  flex-grow: 1;
  padding-bottom: 86px;

  &__row {
    @include make-row();
  }

  &__info {
    @include make-col(5);
    @include make-col-ready();
  }

  &__order {
    @include make-col(5);
    @include make-col-offset(1);
    @include make-col-ready();
  }

  &__title {
    @include make-col(12);
    @include make-col-ready();

    margin-bottom: 34px;
    font-size: 16px;
    line-height: 20px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__previous {
    display: none;
  }

  &__button-wrapper {
    @include make-col-ready();
  }

  @include media-breakpoint-down(xl) {
    &__order {
      @include make-col(6);
    }
  }

  @include media-breakpoint-down(lg) {
    padding-bottom: 44px;

    &__row {
      justify-content: space-between;
    }

    &__title {
      margin-bottom: 24px;
    }

    &__info {
      flex: 0 0 54%;
      max-width: 54%;
    }

    &__order {
      @include make-col-offset(0);

      flex: 0 0 42.5%;
      max-width: 42.5%;
    }
  }

  @include media-breakpoint-down(md) {
    padding-bottom: 46px;

    &__order {
      @include make-col(12);

      margin-bottom: 40px;
    }

    &__info {
      @include make-col(12);

      order: 1;
    }
  }

  @include media-breakpoint-down(sm) {
    padding-bottom: 49px;

    &__previous {
      @include reset-button-styles();

      display: flex;
      align-items: center;
      margin-bottom: 13px;
      margin-left: -2px;
      font-size: 9px;
      font-weight: 300;
      line-height: 25px;
      color: $text-color;
      letter-spacing: 0.07em;
    }

    &__icon {
      width: 10px;
      height: 10px;
      margin-right: 5px;
      margin-bottom: 1px;
      color: $gray-dark-2;
      transform: rotate(90deg);
    }

    &__order {
      margin-bottom: 25px;
    }

    &__button {
      font-size: 14px;
    }
  }
}
</style>
