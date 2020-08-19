<template>
  <div class="checkout">
    <form novalidate @submit.prevent="placeOrder">
      <BlockCheckoutInfoContacts
        v-show="isVisible || checkoutStep === checkoutSteps.contactInfo"
        ref="contacts"
        v-model="$v.formData"
        class="checkout__item checkout__item--contacts"
        @non-defeault-country="setAbroadDeliveryOnly"
      />
      <BlockCheckoutInfoDelivery
        v-show="isVisible || checkoutStep === checkoutSteps.deliveryInfo"
        v-model="$v.formData"
        class="checkout__item checkout__item--delivery"
        @country-change="onCountryChange"
        @region-change="onRegionChange"
        @state-change="onStateChange"
      />
      <BlockCheckoutInfoPayment
        v-show="isVisible || checkoutStep === checkoutSteps.paymentInfo"
        v-model="$v.formData"
        :is-abroad-delivery="isAbroadDelivery"
        class="checkout__item checkout__item--payment"
      />
      <ButtonLoading
        v-show="isVisible || checkoutStep === checkoutSteps.paymentInfo"
        :is-loading="isLoading"
        :text="$t('checkoutPage.checkout')"
        :disabled="$v.$invalid"
        class="checkout__submit"
        type="submit"
      />
      <div
        v-show="isVisible || checkoutStep === checkoutSteps.paymentInfo"
        class="checkout__info"
      >
        {{ $t('checkoutPage.publicOffer.message') }}
        <NuxtLink class="checkout__link" :to="$i18n.path('privacy-policy')">
          {{ $t('checkoutPage.publicOffer.name') }}
        </NuxtLink>
      </div>
    </form>
    <BButton
      v-if="!isVisible && checkoutStep !== checkoutSteps.paymentInfo"
      :disabled="isGroupValid"
      class="checkout-page__button"
      block
      variant="primary"
      @click="goToNextStep"
    >
      {{ $t('navigation.forward') }}
    </BButton>
    <form
      v-if="showLiqPayForm"
      ref="liqPayForm"
      method="POST"
      action="https://www.liqpay.ua/api/3/checkout"
      accept-charset="utf-8"
      class="visually-hidden"
    >
      <input :value="liqPayCredentials.data" type="hidden" name="data" />
      <input
        :value="liqPayCredentials.signature"
        type="hidden"
        name="signature"
      />
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import _snakecase from 'lodash.snakecase'

import BlockCheckoutInfoContacts from './BlockCheckoutInfoContacts'
import BlockCheckoutInfoDelivery from './BlockCheckoutInfoDelivery'
import BlockCheckoutInfoPayment from './BlockCheckoutInfoPayment'
import ButtonLoading from '@/components/shared/ButtonLoading'

import { mutationTypes as modalMutationTypes } from '@/store/modal'
import { mutationTypes as cartMutationTypes } from '@/store/cart'
import { mutationTypes as localStorageMutationTypes } from '@/store/localStorage'

import { DELIVERY_METHODS, PAYMENT_METHODS } from '@/utils/constants'

/* istanbul ignore next */
const onlyLetters = (value) =>
  /^([A-zА-яЁёА-Яа-яЁёЇїІіЄєҐґ\-'])+$/gm.test(value)

/* istanbul ignore next */
const onlyText = (value) =>
  /^([A-zА-яЁёА-Яа-яЁёЇїІіЄєҐґ0-9\-\\.,;:?!'"()\s]||)+$/gm.test(value)

export default {
  components: {
    BlockCheckoutInfoContacts,
    BlockCheckoutInfoDelivery,
    BlockCheckoutInfoPayment,
    ButtonLoading
  },
  mixins: [validationMixin],
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    checkoutStep: {
      type: Number,
      required: true
    },
    checkoutSteps: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: {
        contactInfo: {
          isGuest: true, // TODO: set dynamic in the future release
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          comment: ''
        },
        deliveryInfo: {
          deliveryMethod: DELIVERY_METHODS.NOVAPOSHTA,
          deliveryCountry: '',
          deliveryRegion: '',
          deliveryState: '',
          deliveryOffice: '',
          deliveryAddress: '',
          deliveryCity: ''
        },
        paymentInfo: {
          paymentMethod: ''
        }
      },
      liqPayCredentials: {
        data: null,
        signature: null
      },
      isLoading: false
    }
  },
  computed: {
    deliveryMethod() {
      return this.formData.deliveryInfo.deliveryMethod
    },
    paymentMethod() {
      return this.formData.paymentInfo.paymentMethod
    },
    localStorage() {
      return this.$store.state.localStorage
    },
    isAbroadDelivery() {
      return this.deliveryMethod === DELIVERY_METHODS.ABROAD
    },
    isGroupValid() {
      return (
        (this.checkoutStep === this.checkoutSteps.contactInfo &&
          this.$v.formData.contactInfo.$invalid) ||
        (this.checkoutStep === this.checkoutSteps.deliveryInfo &&
          this.$v.formData.deliveryInfo.$invalid)
      )
    },
    showLiqPayForm() {
      return this.paymentMethod === PAYMENT_METHODS.LIQPAY
    }
  },
  watch: {
    deliveryMethod() {
      this.dropDeliveryRelatedValues()
      this.$nextTick(() => this.$v.$reset())
    }
  },
  validations() {
    const commonOptions = {
      contactInfo: {
        // userStatus: {
        //   required
        // },
        firstName: {
          required,
          minLength: minLength(3),
          onlyLetters
        },
        lastName: {
          required,
          minLength: minLength(3),
          onlyLetters
        },
        phone: {
          required,
          /* istanbul ignore next */
          phone() {
            const { tel } = this.$refs.contacts.$refs
            return tel ? tel.phoneObject.isValid : false
          }
        },
        email: {
          email,
          required
        },
        comment: {
          onlyText
        }
      },
      deliveryInfo: {
        deliveryMethod: {
          required
        },
        deliveryCountry: {},
        deliveryCity: {},
        deliveryRegion: {},
        deliveryState: {},
        deliveryOffice: {},
        deliveryAddress: {}
      },
      paymentInfo: {
        paymentMethod: {
          required
        }
      }
    }

    /* istanbul ignore else */
    if (this.deliveryMethod === DELIVERY_METHODS.NOVAPOSHTA) {
      return {
        formData: {
          ...commonOptions,
          deliveryInfo: {
            deliveryMethod: {
              required
            },
            deliveryCountry: {},
            deliveryRegion: {
              required
            },
            deliveryState: {
              required
            },
            deliveryOffice: {
              required
            },
            deliveryAddress: {}
          }
        }
      }
    }

    /* istanbul ignore else */
    if (this.deliveryMethod === DELIVERY_METHODS.LOCAL) {
      return {
        formData: {
          ...commonOptions,
          deliveryInfo: {
            deliveryMethod: {
              required
            },
            deliveryCountry: {},
            deliveryRegion: {
              required
            },
            deliveryState: {
              required
            },
            deliveryOffice: {},
            deliveryAddress: {
              required
            }
          }
        }
      }
    }

    /* istanbul ignore else */
    if (this.deliveryMethod === DELIVERY_METHODS.ABROAD) {
      return {
        formData: {
          ...commonOptions,
          deliveryInfo: {
            deliveryMethod: {
              required
            },
            deliveryCountry: {
              required
            },
            deliveryCity: {},
            deliveryOffice: {},
            deliveryAddress: {}
          }
        }
      }
    }
  },
  methods: {
    setAbroadDeliveryOnly() {
      this.formData.deliveryInfo.deliveryMethod = DELIVERY_METHODS.ABROAD
    },
    dropDeliveryRelatedValues() {
      this.formData.deliveryInfo.deliveryCountry = null
      this.formData.deliveryInfo.deliveryCity = null
      this.formData.deliveryInfo.deliveryRegion = null
      this.formData.deliveryInfo.deliveryState = null
      this.formData.deliveryInfo.deliveryOffice = null
      this.formData.deliveryInfo.deliveryAddress = null
      this.formData.paymentInfo.paymentMethod = null
    },
    getOrderPayload() {
      const order = {
        cart_id: this.localStorage.cartId
      }

      for (const section in this.formData) {
        const dataset = this.formData[section]
        const sectionSnakeKey = _snakecase(section)

        order[sectionSnakeKey] = {}

        for (const prop in dataset) {
          if (dataset[prop]) {
            const propSnakeKey = _snakecase(prop)
            order[sectionSnakeKey][propSnakeKey] = dataset[prop]
          }
        }
      }

      return order
    },
    async placeOrder() {
      this.$v.$touch()

      /* istanbul ignore else */
      if (!this.$v.$invalid) {
        this.isLoading = true

        const orderPayload = this.getOrderPayload()

        // FIXME: temporary solution
        const STAGE_API_URL = 'https://back.virna.com.ua'
        const createdOrder = await this.$axios.$post(
          `${STAGE_API_URL}/api/checkout/save-order`,
          orderPayload
        )

        this.isLoading = false

        this.$store.commit(
          `localStorage/${localStorageMutationTypes.SET_CART_ID}`,
          null
        )

        if (this.paymentMethod === PAYMENT_METHODS.LIQPAY) {
          this.liqPayCredentials.data = createdOrder.data
          this.liqPayCredentials.signature = createdOrder.signature

          this.$nextTick(() => this.$refs.liqPayForm.submit())
        } else {
          this.$store.commit(`cart/${cartMutationTypes.SET_ORDER_SAVE}`)

          this.$store.commit(`modal/${modalMutationTypes.SET_MODAL_META}`, {
            type: 'message',
            title: this.$t('modals.orderMessage.title'),
            content: this.$t('modals.orderMessage.content')
          })

          this.$store.commit(
            `modal/${modalMutationTypes.SET_MODAL_VISIBILITY_TOGGLE}`,
            { type: 'message', status: true }
          )
        }
      }
    },
    goToNextStep() {
      /* istanbul ignore else */
      if (!this.isGroupValid) {
        this.$emit('next-step')
      }
    },
    onCountryChange() {
      this.formData.deliveryInfo.deliveryCity = null
    },
    onRegionChange() {
      this.formData.deliveryInfo.deliveryState = null
      this.formData.deliveryInfo.deliveryOffice = null
    },
    onStateChange() {
      this.formData.deliveryInfo.deliveryOffice = null
    }
  }
}
</script>

<style lang="scss">
.checkout {
  &__item {
    &:not(:last-of-type) {
      margin-bottom: 45px;
    }

    &--payment:not(:last-of-type) {
      margin-bottom: 26px;
    }
  }

  &__submit {
    min-width: 290px;
    font-size: 14px;
  }

  &__info {
    margin-top: 22px;
    font-size: 10px;
    line-height: 13px;
    color: $text-color;
    letter-spacing: -0.01em;
  }

  &__link {
    display: block;
    color: $primary;
    text-decoration: underline;
    transition: opacity 0.3s;

    @include hover-focus-active {
      text-decoration: underline;
      opacity: 0.8;
    }
  }

  @include media-breakpoint-down(md) {
    &__item {
      &:not(:last-of-type) {
        margin-bottom: 39px;
      }

      &--payment:not(:last-of-type) {
        margin-bottom: 29px;
      }
    }
  }

  @include media-breakpoint-down(sm) {
    &__item {
      min-height: 62.5vh;

      &--payment {
        min-height: 56.5vh;
      }
    }

    &__submit {
      min-width: 100%;
    }
  }
}
</style>
