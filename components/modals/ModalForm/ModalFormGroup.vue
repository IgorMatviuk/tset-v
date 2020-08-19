<template>
  <form novalidate @submit.prevent="onFormSubmit">
    <BFormGroup
      v-for="(field, index) in fields"
      :key="`${action.method}_${field.name}_${index}`"
      :label="field.label"
      :label-class="{
        'custom-label': true,
        'custom-label--required': field.validation.required,
        'custom-label--ratings': field.type === 'ratings',
        'custom-label--file': field.type === 'file'
      }"
    >
      <client-only v-if="field.type === 'tel'">
        <vue-tel-input
          ref="tel"
          v-model.trim="$v.formData[field.name].$model"
          v-bind="field.options"
          :wrapper-classes="
            $v.formData[field.name].$error
              ? 'form-control-phone form-control error'
              : 'form-control-phone form-control'
          "
        />
      </client-only>
      <Ratings
        v-else-if="field.type === 'ratings'"
        v-model.trim="$v.formData[field.name]"
        class="ratings-control"
        variant="primary"
        :is-static="false"
      />
      <BFormTextarea
        v-else-if="field.type === 'textarea'"
        v-model.trim="$v.formData[field.name].$model"
        :placeholder="field.placeholder"
        :name="field.name"
        :class="{ error: $v.formData[field.name].$error }"
      />
      <FileUpload
        v-else-if="field.type === 'file'"
        :name="field.name"
        :label="field.label"
        :extensions="['jpg', 'jpeg', 'png', 'webp']"
        @upload="onFileUpload"
        @remove="onFileRemove"
      />
      <BFormInput
        v-else
        v-model.trim="$v.formData[field.name].$model"
        :type="field.type"
        :placeholder="field.placeholder"
        :name="field.name"
        :class="{ error: $v.formData[field.name].$error }"
      />
      <div
        v-if="getShowAPIErrors(field.name)"
        class="error-message"
        v-html="getAPIErrorMessages(field.name)"
      ></div>
      <template v-if="$v.formData[field.name].$error">
        <div
          v-if="getShowModelError(field.name, 'required')"
          class="error-message"
        >
          {{ $t(`form.errors.${field.name}.required`) }}
        </div>
        <div
          v-else-if="getShowModelError(field.name, 'minLength')"
          class="error-message"
        >
          {{ $t(`form.errors.${field.name}.minLength`) }}
        </div>
        <div
          v-else-if="getShowModelError(field.name, 'maxLength')"
          class="error-message"
        >
          {{ $t(`form.errors.${field.name}.maxLength`) }}
        </div>
        <div
          v-else-if="getShowModelError(field.name, 'phone')"
          class="error-message"
        >
          {{ $t(`form.errors.${field.name}.phone`) }}
        </div>
        <div
          v-else-if="getShowModelError(field.name, 'email')"
          class="error-message"
        >
          {{ $t(`form.errors.${field.name}.email`) }}
        </div>
        <div
          v-else-if="getShowModelError(field.name, 'sameAsPassword')"
          class="error-message"
        >
          {{ $t(`form.errors.${field.name}.sameAsPassword`) }}
        </div>
        <div
          v-else-if="getShowModelError(field.name, 'onlyText')"
          class="error-message"
        >
          {{ $t(`form.errors.${field.name}.onlyText`) }}
        </div>
        <div
          v-else-if="getShowModelError(field.name, 'onlyLetters')"
          class="error-message"
        >
          {{ $t(`form.errors.${field.name}.onlyLetters`) }}
        </div>
      </template>
    </BFormGroup>
    <div
      v-if="getShowAPIErrors()"
      class="error-message error-message--general"
      v-html="getAPIErrorMessages()"
    ></div>
    <ButtonLoading
      :text="submitText"
      :is-loading="isLoading"
      type="submit"
      class="modal-submit"
    />
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'

import ButtonLoading from '@/components/shared/ButtonLoading'
import Ratings from '@/components/shared/Ratings'
import FileUpload from '@/components/shared/FileUpload'

// import phoneCountry from '@/mixins/phone-country'
import formActions from '@/mixins/form-actions'

/**
 * Create validation options
 * Docs: https://vuelidate.js.org/#sub-basic-usage
 */
function createFieldValidations() {
  return this.fields.reduce(
    (scope, field) => {
      const { formData } = scope
      return { formData: { ...formData, [field.name]: field.validation } }
    },
    { formData: {} }
  )
}

/**
 * Initialize form state
 */
function createFieldModels() {
  return this.fields.reduce(
    (scope, field) => {
      const { formData } = scope
      return { formData: { ...formData, [field.name]: '' } }
    },
    { formData: {} }
  )
}

export default {
  components: {
    ButtonLoading,
    Ratings,
    FileUpload
  },
  mixins: [/* phoneCountry, */ validationMixin, formActions],
  props: {
    fields: {
      type: Array,
      required: true
    },
    submitText: {
      type: String,
      required: true
    },
    action: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ...createFieldModels.call(this),
      isLoading: false,
      formSubmitTouch: false,
      apiErrors: null
    }
  },
  watch: {
    fields() {
      /* istanbul ignore else */
      if (this.apiErrors) {
        this.apiErrors = null
      }

      const { formData } = createFieldModels.call(this)
      this.formData = formData
      this.$nextTick(() => this.$v.$reset())
    }
  },
  methods: {
    getShowAPIErrors(fieldname) {
      /* istanbul ignore else */
      if (!this.apiErrors) {
        return false
      }

      /* istanbul ignore else */
      if (
        typeof fieldname === 'undefined' &&
        typeof this.apiErrors === 'string'
      ) {
        return true
      }

      return !!this.apiErrors[fieldname]
    },
    getShowModelError(fieldname, validatorName) {
      const validator = this.$v.formData[fieldname][validatorName]
      return typeof validator !== 'undefined' && !validator
    },
    getAPIErrorMessages(fieldname) {
      if (typeof this.apiErrors === 'string') {
        return this.apiErrors
      } else if (typeof this.apiErrors === 'object') {
        return this.apiErrors[fieldname].join('<br />')
      }
    },
    async onFormSubmit() {
      /* istanbul ignore else */
      if (!this.formSubmitTouch) {
        this.formSubmitTouch = true
      }

      this.$v.$touch()

      /* istanbul ignore else */
      if (!this.$v.$error) {
        this.isLoading = true

        const { scope, method } = this.action

        try {
          await this.formActions[scope][method]()
          this.$emit('submit')
        } catch (error) {
          const { data } = error.response
          this.apiErrors = data.errors || data.error
        } finally {
          this.isLoading = false
        }
      }
    },
    onFileUpload({ name, file }) {
      this.formData[name] = file
    },
    onFileRemove(name) {
      if (this.formData[name]) {
        this.formData[name] = null
      }
    }
  },
  validations() {
    return createFieldValidations.call(this)
  }
}
</script>

<style lang="scss">
.modal-submit {
  width: 100%;
  margin-top: 14px;
}

.error-message {
  margin-top: 8px;
  font-size: 12px;
  color: $primary;
}

.modal-form {
  &.modal-feedback {
    .form-group {
      &:first-of-type {
        margin-bottom: 0;
      }

      &:nth-last-of-type(2) {
        margin-bottom: 13px;
      }
    }

    .modal-submit {
      display: block;
      max-width: 200px;
      margin-top: 30px;
      margin-right: auto;
      margin-left: auto;
    }

    @include media-breakpoint-up(md) {
      .modal-submit {
        max-width: 250px;
      }
    }
  }
}
</style>
