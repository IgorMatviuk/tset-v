<template>
  <div class="contacts-form">
    <div class="contacts-form__title">
      {{ $t('contacts.titles.form') }}
    </div>
    <form novalidate @submit.prevent="submitContactsForm">
      <div class="contacts-form__row">
        <BFormGroup
          class="contacts-form__group contacts-form__group--name custom-field-group"
          :label="$t('form.labels.first_name')"
          label-for="contactsFormName"
          label-class="contacts-form__label custom-label custom-label--required"
          label-cols="12"
        >
          <BFormInput
            id="contactsFormName"
            v-model.trim="$v.formData.name.$model"
            :class="{ error: $v.formData.name.$error }"
            class="contacts-form__input"
            type="text"
            :trim="true"
            :placeholder="$t('form.placeholders.first_name')"
          />
          <template v-if="$v.formData.name.$error">
            <div
              v-if="getShowModelError('name', 'required')"
              class="error-message"
            >
              {{ $t(`form.errors.first_name.required`) }}
            </div>
            <div
              v-else-if="getShowModelError('name', 'minLength')"
              class="error-message"
            >
              {{ $t(`form.errors.first_name.minLength`) }}
            </div>
            <div
              v-else-if="getShowModelError('name', 'onlyLetters')"
              class="error-message"
            >
              {{ $t(`form.errors.first_name.onlyLetters`) }}
            </div>
          </template>
        </BFormGroup>
        <BFormGroup
          class="contacts-form__group custom-field-group"
          :label="$t('form.labels.phone')"
          label-for="contactsFormPhone"
          label-class="contacts-form__label custom-label custom-label--required"
          label-cols="12"
        >
          <client-only>
            <vue-tel-input
              ref="tel"
              v-model.trim="$v.formData.phone.$model"
              v-bind="phoneOptions"
              :wrapper-classes="
                $v.formData.phone.$error
                  ? 'form-control-phone form-control error'
                  : 'form-control-phone form-control'
              "
            />
          </client-only>
          <template v-if="$v.formData.phone.$error">
            <div
              v-if="getShowModelError('phone', 'required')"
              class="error-message"
            >
              {{ $t(`form.errors.phone.required`) }}
            </div>
            <div
              v-else-if="getShowModelError('phone', 'phone')"
              class="error-message"
            >
              {{ $t(`form.errors.phone.phone`) }}
            </div>
          </template>
        </BFormGroup>
        <BFormGroup
          class="contacts-form__group contacts-form__group--email custom-field-group"
          :label="$t('form.labels.email')"
          label-for="contactsFormEmail"
          label-class="contacts-form__label custom-label custom-label--required"
          label-cols="12"
        >
          <BFormInput
            id="contactsFormEmail"
            v-model.trim="$v.formData.email.$model"
            :class="{ error: $v.formData.email.$error }"
            class="contacts-form__input"
            type="email"
            :trim="true"
            :placeholder="$t('form.placeholders.email')"
          />
          <template v-if="$v.formData.email.$error">
            <div
              v-if="getShowModelError('email', 'required')"
              class="error-message"
            >
              {{ $t(`form.errors.email.required`) }}
            </div>
            <div
              v-else-if="getShowModelError('email', 'email')"
              class="error-message"
            >
              {{ $t(`form.errors.email.email`) }}
            </div>
          </template>
        </BFormGroup>
        <BFormGroup
          class="contacts-form__group custom-field-group"
          :label="$t('form.labels.comment')"
          label-for="contactsFormComment"
          label-class="contacts-form__label custom-label"
          label-cols="12"
        >
          <BFormTextarea
            id="contactsFormComment"
            v-model.trim="$v.formData.comment.$model"
            :class="{ error: $v.formData.comment.$error }"
            class="contacts-form__input"
            :trim="true"
            :placeholder="$t('form.placeholders.comment')"
          />
          <template v-if="$v.formData.comment.$error">
            <div
              v-if="getShowModelError('comment', 'onlyText')"
              class="error-message"
            >
              {{ $t(`form.errors.comment.onlyText`) }}
            </div>
          </template>
        </BFormGroup>
      </div>
      <ButtonLoading
        :text="submitText"
        :is-loading="isLoading"
        type="submit"
        class="contacts-form__submit"
      />
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mutationTypes as modalMutationTypes } from '@/store/modal'

import ButtonLoading from '@/components/shared/ButtonLoading'

const onlyLetters = (value) =>
  /^([A-zА-яЁёА-Яа-яЁёЇїІіЄєҐґ\-'])+$/gm.test(value)
const onlyText = (value) =>
  /^([A-zА-яЁёА-Яа-яЁёЇїІіЄєҐґ0-9\-\\.,;:?!'"()\s]||)+$/gm.test(value)

export default {
  components: {
    ButtonLoading
  },
  mixins: [validationMixin],
  data() {
    return {
      phoneOptions: {
        inputId: 'contactsFormPhone',
        inputClasses: 'contacts-form__input form-control',
        placeholder: 'Ваш телефон',
        validCharactersOnly: true,
        mode: 'international'
      },
      isLoading: false,
      formData: {
        name: '',
        phone: '',
        email: '',
        comment: ''
      }
    }
  },
  computed: {
    submitText() {
      return this.$t('buttons.submit')
    }
  },
  methods: {
    submitContactsForm() {
      this.$v.$touch()

      /* istanbul ignore else */
      if (!this.$v.$invalid) {
        this.isLoading = true

        // TODO: submit form
        setTimeout(() => {
          this.isLoading = false

          this.$store.commit(`modal/${modalMutationTypes.SET_MODAL_META}`, {
            type: 'message',
            title: this.$t('modals.contactsMessage.title'),
            content: this.$t('modals.contactsMessage.content')
          })

          this.$store.commit(
            `modal/${modalMutationTypes.SET_MODAL_VISIBILITY_TOGGLE}`,
            { type: 'message', status: true }
          )
        }, 1000)
      }
    },
    getShowModelError(fieldname, validatorName) {
      const validator = this.$v.formData[fieldname][validatorName]
      return typeof validator !== 'undefined' && !validator
    }
  },
  validations: {
    formData: {
      name: {
        required,
        minLength: minLength(4),
        onlyLetters
      },
      phone: {
        required,
        phone() {
          const tel = this.$refs.tel
          return tel.phoneObject.isValid
        }
      },
      email: {
        email,
        required
      },
      comment: {
        onlyText
      }
    }
  }
}
</script>

<style lang="scss">
.contacts-form {
  &__title {
    margin-bottom: 17px;
    font-size: 14px;
    line-height: 18px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__row {
    margin-bottom: 30px;
  }

  &__group {
    margin-bottom: 10px;
  }

  &__submit {
    display: block;
    min-width: 250px;
    margin-right: auto;
    margin-left: auto;
  }

  @include media-breakpoint-up(md) {
    &__title {
      margin-bottom: 12px;
    }

    &__row {
      @include make-row();

      align-content: flex-end;
      align-items: flex-end;
      margin-bottom: 37px;
    }

    &__group {
      @include make-col(6);
      @include make-col-ready();

      margin-bottom: 8px;

      &--name {
        order: -2;
      }

      &--email {
        order: -1;
      }
    }

    &__submit {
      margin: 0;
    }
  }

  @include media-breakpoint-up(lg) {
    &__group {
      flex: 0 0 260px;
      max-width: 260px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__row {
      margin-bottom: 34px;
    }

    &__group {
      flex: 0 0 310px;
      max-width: 310px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__row {
      margin-bottom: 19px;
    }

    &__group {
      @include make-col(6);
    }
  }
}
</style>
