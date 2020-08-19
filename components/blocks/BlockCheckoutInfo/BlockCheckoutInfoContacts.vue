<template>
  <div class="checkout-info">
    <div class="checkout-info__title">{{ $t('checkoutPage.contactInfo') }}</div>
    <!-- <BFormGroup class="checkout-info__group">
      <BFormRadioGroup
        v-model="value.contactInfo.isGuest.$model"
        class="checkout-info__radio-group"
        name="status"
      >
        <BFormRadio
          :class="{ error: value.contactInfo.isGuest.$error }"
          class="checkout-info__radio"
          value="true"
        >
          Новый покупатель
        </BFormRadio>
        <BFormRadio
          :class="{ error: value.contactInfo.isGuest.$error }"
          class="checkout-info__radio"
          value="false"
        >
          Постоянный клиент
        </BFormRadio>
      </BFormRadioGroup>
    </BFormGroup> -->
    <BFormGroup
      class="checkout-info__group custom-field-group"
      :label="$t('form.labels.first_name')"
      label-for="checkoutFirstName"
      label-class="checkout-info__label custom-label custom-label--required"
      label-cols-md="3"
    >
      <BFormInput
        id="checkoutFirstName"
        v-model.trim="value.contactInfo.firstName.$model"
        :class="{ error: value.contactInfo.firstName.$error }"
        class="checkout-info__input"
        type="text"
        :trim="true"
        :placeholder="$t('form.placeholders.first_name')"
      />
      <template v-if="value.contactInfo.firstName.$error">
        <div
          v-if="getShowModelError('firstName', 'required')"
          class="error-message"
        >
          {{ $t('form.errors.first_name.required') }}
        </div>
        <div
          v-else-if="getShowModelError('firstName', 'minLength')"
          class="error-message"
        >
          {{ $t('form.errors.first_name.minLength') }}
        </div>
      </template>
    </BFormGroup>
    <BFormGroup
      class="checkout-info__group custom-field-group"
      :label="$t('form.labels.last_name')"
      label-for="checkoutLastName"
      label-class="checkout-info__label custom-label custom-label--required"
      label-cols-md="3"
    >
      <BFormInput
        id="checkoutLastName"
        v-model.trim="value.contactInfo.lastName.$model"
        :class="{ error: value.contactInfo.lastName.$error }"
        class="checkout-info__input"
        type="text"
        :trim="true"
        :placeholder="$t('form.placeholders.last_name')"
      />
      <template v-if="value.contactInfo.lastName.$error">
        <div
          v-if="getShowModelError('lastName', 'required')"
          class="error-message"
        >
          {{ $t('form.errors.last_name.required') }}
        </div>
        <div
          v-else-if="getShowModelError('lastName', 'minLength')"
          class="error-message"
        >
          {{ $t('form.errors.last_name.minLength') }}
        </div>
      </template>
    </BFormGroup>
    <BFormGroup
      class="checkout-info__group custom-field-group"
      :label="$t('form.labels.phone')"
      label-for="checkoutPhone"
      label-class="checkout-info__label custom-label custom-label--required"
      label-cols-md="3"
    >
      <client-only>
        <vue-tel-input
          ref="tel"
          v-model.trim="value.contactInfo.phone.$model"
          v-bind="phoneOptions"
          :wrapper-classes="
            value.contactInfo.phone.$error
              ? 'form-control-phone form-control error'
              : 'form-control-phone form-control'
          "
          @country-changed="onPhoneCountryChange($event)"
        />
      </client-only>
      <template v-if="value.contactInfo.phone.$error">
        <div
          v-if="getShowModelError('phone', 'required')"
          class="error-message"
        >
          {{ $t('form.errors.phone.required') }}
        </div>
        <div
          v-else-if="getShowModelError('phone', 'phone')"
          class="error-message"
        >
          {{ $t('form.errors.phone.phone') }}
        </div>
      </template>
    </BFormGroup>
    <BFormGroup
      class="checkout-info__group custom-field-group"
      :label="$t('form.labels.email')"
      label-for="checkoutEmail"
      label-class="checkout-info__label custom-label custom-label--required"
      label-cols-md="3"
    >
      <BFormInput
        id="checkoutEmail"
        v-model.trim="value.contactInfo.email.$model"
        :class="{ error: value.contactInfo.email.$error }"
        class="checkout-info__input"
        type="email"
        :trim="true"
        :placeholder="$t('form.placeholders.email')"
      />
      <template v-if="value.contactInfo.email.$error">
        <div
          v-if="getShowModelError('email', 'required')"
          class="error-message"
        >
          {{ $t('form.errors.email.required') }}
        </div>
        <div
          v-else-if="getShowModelError('email', 'email')"
          class="error-message"
        >
          {{ $t('form.errors.email.email') }}
        </div>
      </template>
    </BFormGroup>
    <BFormGroup
      class="checkout-info__group custom-field-group"
      :label="$t('form.labels.comment')"
      label-for="checkoutComment"
      label-class="checkout-info__label custom-label"
      label-cols="12"
      label-cols-md="3"
    >
      <BFormTextarea
        id="checkoutComment"
        v-model.trim="value.contactInfo.comment.$model"
        :class="{ error: value.contactInfo.comment.$error }"
        class="checkout-info__input"
        type="text"
        :trim="true"
        :placeholder="$t('form.placeholders.comment')"
      />
    </BFormGroup>
  </div>
</template>

<script>
// import phoneCountry from '@/mixins/phone-country'

export default {
  // mixins: [phoneCountry],
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      phoneOptions: {
        inputId: 'checkoutPhone',
        inputClasses: 'checkout-info__input form-control',
        placeholder: this.$t('form.placeholders.phone'),
        validCharactersOnly: true,
        defaultCountry: 'UA',
        mode: 'international'
      }
    }
  },
  methods: {
    getShowModelError(fieldname, validatorName) {
      const validator = this.value.contactInfo[fieldname][validatorName]
      return typeof validator !== 'undefined' && !validator
    },
    onPhoneCountryChange(activeCountry) {
      /* -------- DO NOT REMOVE THIS! HARDCODE! -------- */
      /* istanbul ignore else */
      if (activeCountry.iso2 !== 'UA') {
        this.$emit('non-defeault-country')
      }
    }
  }
}
</script>

<style lang="scss">
.checkout-info {
  &__title {
    margin-bottom: 20px;
    font-size: 14px;
    line-height: 18px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__radio {
    &:not(:last-of-type) {
      margin-right: 25px;
    }
  }

  &__label {
    flex: 0 0 24%;
    max-width: 24%;
  }

  &__input {
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.05em;
  }

  @include media-breakpoint-down(xl) {
    &__label {
      flex: 0 0 29%;
      max-width: 29%;
    }
  }

  @include media-breakpoint-down(lg) {
    &__label {
      flex: 0 0 32%;
      max-width: 32%;
    }

    &__radio {
      &:not(:last-of-type) {
        margin-right: 26px;
      }
    }
  }

  @include media-breakpoint-down(md) {
    &__radio {
      &:not(:last-of-type) {
        margin-right: 22px;
      }
    }

    &__label {
      flex: 0 0 17.1%;
      max-width: 17.1%;
    }
  }

  @include media-breakpoint-down(sm) {
    &__title {
      margin-bottom: 14px;
    }

    &__label {
      flex: 0 0 100%;
      max-width: 100%;
    }

    &__group {
      margin-bottom: 12px;
    }
  }
}
</style>
