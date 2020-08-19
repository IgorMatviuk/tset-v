<template>
  <div class="checkout-info">
    <div class="checkout-info__title">
      {{ $t('checkoutPage.deliveryMethod') }}
    </div>
    <BFormGroup class="checkout-info__group checkout-info__delivery-methods">
      <BFormRadioGroup
        v-model="value.deliveryInfo.deliveryMethod.$model"
        class="checkout-info__radio-group"
        name="delivery_method"
      >
        <BFormRadio
          :class="{ error: value.deliveryInfo.deliveryMethod.$error }"
          class="checkout-info__radio checkout-info__radio--delivery"
          value="novaposhta"
        >
          {{ $t('checkoutPage.delivery.novaposhta') }}
        </BFormRadio>
        <BFormRadio
          :class="{ error: value.deliveryInfo.deliveryMethod.$error }"
          class="checkout-info__radio checkout-info__radio--delivery"
          value="local"
        >
          {{ $t('checkoutPage.delivery.local') }}
        </BFormRadio>
        <BFormRadio
          :class="{ error: value.deliveryInfo.deliveryMethod.$error }"
          class="checkout-info__radio checkout-info__radio--delivery"
          value="abroad"
        >
          {{ $t('checkoutPage.delivery.abroad') }}
        </BFormRadio>
      </BFormRadioGroup>
    </BFormGroup>
    <div class="checkout-info__delivery-wrapper">
      <BFormGroup
        v-if="abroadDelivery"
        class="checkout-info__group custom-field-group"
        :label="$t('form.labels.country')"
        label-for="checkoutСountry"
        label-class="checkout-info__label checkout-info__label--delivery custom-label custom-label--required"
        label-cols-md="3"
      >
        <SelectWithSearch
          v-model="value.deliveryInfo.deliveryCountry"
          :options="countryOptions"
          field-id="checkoutСountry"
          option-field="name"
          assign-field="id"
          :placeholder="$t('form.placeholders.country')"
        />
      </BFormGroup>
      <template v-if="!abroadDelivery">
        <BFormGroup
          class="checkout-info__group custom-field-group"
          :label="$t('form.labels.region')"
          label-for="checkoutRegion"
          label-cols-md="3"
          :label-class="cityLabelClass"
        >
          <SelectWithSearch
            v-model="value.deliveryInfo.deliveryRegion"
            :options="regionOptions"
            field-id="checkoutRegion"
            option-field="name"
            assign-field="id"
            :placeholder="$t('form.placeholders.region')"
            @selected="onRegionSelected"
          />
        </BFormGroup>
        <BFormGroup
          :class="{ 'checkout-info__group--disabled': noRegionSelected }"
          class="checkout-info__group custom-field-group"
          :label="$t('form.labels.state')"
          label-for="checkoutState"
          label-cols-md="3"
          :label-class="cityLabelClass"
        >
          <SelectWithSearch
            v-model="value.deliveryInfo.deliveryState"
            :options="stateOptions"
            field-id="checkoutState"
            option-field="name"
            assign-field="id"
            :placeholder="$t('form.placeholders.state')"
            @selected="onStateSelected"
          />
        </BFormGroup>
      </template>
      <BFormGroup
        v-else
        class="checkout-info__group custom-field-group"
        :label="$t('form.labels.state')"
        label-for="checkoutСity"
        label-cols-md="3"
        :label-class="cityLabelClass"
      >
        <BFormInput
          id="checkoutCity"
          v-model.trim="value.deliveryInfo.deliveryCity.$model"
          :class="{ error: value.deliveryInfo.deliveryCity.$error }"
          class="checkout-info__input"
          type="text"
          :trim="true"
          :placeholder="$t('form.placeholders.state')"
        />
      </BFormGroup>
      <BFormGroup
        v-if="postalDelivery"
        :class="{ 'checkout-info__group--disabled': noStateSelected }"
        class="checkout-info__group custom-field-group"
        :label="$t('form.labels.office')"
        label-for="checkoutOffice"
        label-class="checkout-info__label checkout-info__label--delivery custom-label custom-label--required"
        label-cols-md="3"
      >
        <SelectWithSearch
          v-model="value.deliveryInfo.deliveryOffice"
          :options="officeOptions"
          field-id="checkoutOffice"
          option-field="name"
          assign-field="id"
          :placeholder="$t('form.placeholders.office')"
        />
      </BFormGroup>
      <BFormGroup
        v-if="targetDelivery"
        :class="{
          'checkout-info__group--disabled': noStateSelected
        }"
        class="checkout-info__group custom-field-group"
        :label="$t('form.labels.address')"
        label-for="checkoutAddress"
        :label-class="addressLabelClass"
        label-cols-md="3"
      >
        <BFormInput
          id="checkoutAddress"
          v-model.trim="value.deliveryInfo.deliveryAddress.$model"
          :class="{ error: value.deliveryInfo.deliveryAddress.$error }"
          class="checkout-info__input"
          type="text"
          :trim="true"
          :placeholder="$t('form.placeholders.address')"
        />
        <div
          v-if="value.deliveryInfo.deliveryAddress.$error"
          class="error-message"
        >
          {{ $t('form.errors.address.required') }}
        </div>
      </BFormGroup>
    </div>
    <div class="checkout-info__delivery-sale">
      {{ $t('checkoutPage.freeShipping.message') }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import SelectWithSearch from '@/components/shared/SelectWithSearch'

import { actionTypes as cartActionTypes } from '@/store/cart'

import { DELIVERY_METHODS } from '@/utils/constants'

export default {
  components: {
    SelectWithSearch
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      countryOptions: (state) => state.cart.countries,
      regionOptions: (state) => state.cart.regions,
      stateOptions: (state) => state.cart.states,
      officeOptions: (state) => state.cart.offices
    }),
    abroadDelivery() {
      return (
        this.value.deliveryInfo.deliveryMethod.$model ===
        DELIVERY_METHODS.ABROAD
      )
    },
    postalDelivery() {
      return (
        this.value.deliveryInfo.deliveryMethod.$model ===
        DELIVERY_METHODS.NOVAPOSHTA
      )
    },
    targetDelivery() {
      return (
        this.value.deliveryInfo.deliveryMethod.$model ===
          DELIVERY_METHODS.LOCAL ||
        this.value.deliveryInfo.deliveryMethod.$model ===
          DELIVERY_METHODS.ABROAD
      )
    },
    cityLabelClass() {
      return this.value.deliveryInfo.deliveryMethod.$model ===
        DELIVERY_METHODS.NOVAPOSHTA ||
        this.value.deliveryInfo.deliveryMethod.$model === DELIVERY_METHODS.LOCAL
        ? 'checkout-info__label checkout-info__label--delivery custom-label custom-label--required'
        : 'checkout-info__label checkout-info__label--delivery custom-label'
    },
    addressLabelClass() {
      return this.value.deliveryInfo.deliveryMethod.$model ===
        DELIVERY_METHODS.LOCAL
        ? 'checkout-info__label checkout-info__label--delivery custom-label custom-label--required'
        : 'checkout-info__label checkout-info__label--delivery custom-label'
    },
    noRegionSelected() {
      return (
        this.value.deliveryInfo.deliveryRegion &&
        !this.value.deliveryInfo.deliveryRegion.$model &&
        this.value.deliveryInfo.deliveryMethod.$model !==
          DELIVERY_METHODS.ABROAD
      )
    },
    noStateSelected() {
      return (
        this.value.deliveryInfo.deliveryState &&
        !this.value.deliveryInfo.deliveryState.$model &&
        this.value.deliveryInfo.deliveryMethod.$model !==
          DELIVERY_METHODS.ABROAD
      )
    }
  },
  methods: {
    async onRegionSelected(region) {
      this.$emit('region-change')

      const deliveryMethod = this.value.deliveryInfo.deliveryMethod.$model

      /* istanbul ignore else */
      if (deliveryMethod !== DELIVERY_METHODS.ABROAD) {
        await this.$store.dispatch(
          `cart/${cartActionTypes.GET_STATES}`,
          region.id
        )
      }
    },
    async onStateSelected(state) {
      this.$emit('state-change')

      const deliveryMethod = this.value.deliveryInfo.deliveryMethod.$model

      /* istanbul ignore else */
      if (deliveryMethod === DELIVERY_METHODS.NOVAPOSHTA) {
        await this.$store.dispatch(
          `cart/${cartActionTypes.GET_OFFICES}`,
          state.id
        )
      }
    }
  }
}
</script>

<style lang="scss">
.checkout-info {
  &__radio {
    &--delivery {
      margin-bottom: 10px;
    }
  }

  &__group--disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  &__delivery-wrapper {
    margin-top: -10px;
  }

  &__delivery-sale {
    margin-top: 28px;
    font-size: 12px;
    line-height: 15px;
    color: $primary;
  }

  @include media-breakpoint-down(md) {
    &__label {
      &--delivery {
        flex: 0 0 25.6%;
        max-width: 25.6%;
      }
    }
  }

  @include media-breakpoint-down(sm) {
    &__label {
      &--delivery {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }

    &__delivery-sale {
      margin-top: 16px;
      font-size: 11px;
      line-height: 14px;
    }
  }
}
</style>
