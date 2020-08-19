<template>
  <div class="newsletter">
    <div class="newsletter__title">
      {{ $t('footer.subscription') }}
    </div>
    <form novalidate @submit.prevent="onSubmit">
      <div class="newsletter__form">
        <BFormGroup class="newsletter__input-group">
          <BFormInput
            id="newsletterEmail"
            v-model.trim="$v.email.$model"
            type="email"
            name="email"
            class="newsletter__input"
            :placeholder="$t('form.placeholders.email')"
            :class="{ error: $v.email.$error }"
          />
          <template v-if="$v.email.$error">
            <div v-if="!$v.email.required" class="error-message">
              {{ $t('form.errors.email.required') }}
            </div>
            <div v-else-if="!$v.email.email" class="error-message">
              {{ $t('form.errors.email.email') }}
            </div>
          </template>
        </BFormGroup>
        <BButton
          class="newsletter__button"
          type="submit"
          variant="primary"
          size="sm"
          :disabled="isLoading"
        >
          <svg-icon
            v-if="!isLoading"
            class="newsletter__icon"
            name="button-arrow"
            width="27"
            height="9"
          />
          <Spinner v-else />
        </BButton>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

import Spinner from '@/components/shared/Spinner'

import { mutationTypes as modalMutationTypes } from '@/store/modal'

export default {
  components: {
    Spinner
  },
  mixins: [validationMixin],
  data() {
    return {
      email: '',
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.isLoading = true

        const STAGE_API_URL = 'https://back.virna.com.ua'
        await this.$axios.$post(`${STAGE_API_URL}/api/subscribe`, {
          email: this.email
        })

        this.$store.commit(`modal/${modalMutationTypes.SET_MODAL_META}`, {
          type: 'message',
          title: this.$t('modals.subscriptionMessage.title'),
          content: this.$t('modals.subscriptionMessage.content')
        })

        this.$store.commit(
          `modal/${modalMutationTypes.SET_MODAL_VISIBILITY_TOGGLE}`,
          { type: 'message', status: true }
        )

        this.isLoading = false
      }
    }
  },
  validations: {
    email: {
      email,
      required
    }
  }
}
</script>

<style lang="scss">
.newsletter {
  &__title {
    font-size: 12px;
    font-weight: 300;
    line-height: 1.25;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__form {
    display: flex;
    padding-top: 13px;
  }

  &__input-group {
    flex: 0 0 189px;
    max-width: 189px;
    margin-right: 14px;
    margin-bottom: 0;
  }

  &__button {
    position: relative;
    padding-right: 0;
    padding-left: 0;
  }

  @include media-breakpoint-down(xl) {
    &__input-group {
      margin-right: 15px;
    }
  }

  @include media-breakpoint-down(lg) {
    &__form {
      padding-top: 12px;
    }
  }

  @include media-breakpoint-down(md) {
    &__form {
      padding-top: 13px;
    }
  }

  @include media-breakpoint-down(sm) {
    max-width: 255px;

    &__title {
      text-align: center;
    }

    &__form {
      padding-top: 15px;
    }

    &__input-group {
      margin-right: 14px;
    }
  }
}
</style>
