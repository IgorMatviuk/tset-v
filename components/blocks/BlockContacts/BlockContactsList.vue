<template>
  <ul class="contacts-list">
    <li class="contacts-list__item">
      <svg-icon
        name="phone"
        class="contacts-list__icon"
        width="16"
        height="16"
      />
      <span class="contacts-list__description">
        <span class="contacts-list__title">
          {{ $t('contacts.titles.phone') }}
        </span>
        <a
          :href="`tel:${contacts.phone}` | convertPhone"
          class="contacts-list__link"
        >
          {{ contacts.phone }}
        </a>
      </span>
    </li>
    <li class="contacts-list__item">
      <svg-icon
        name="mail"
        class="contacts-list__icon"
        width="16"
        height="16"
      />
      <span class="contacts-list__description">
        <span class="contacts-list__title">
          {{ $t('contacts.titles.email') }}
        </span>
        <a :href="`mailto:${contacts.email}`" class="contacts-list__link">
          {{ contacts.email }}
        </a>
      </span>
    </li>
    <li class="contacts-list__item">
      <svg-icon
        name="headset"
        class="contacts-list__icon"
        width="16"
        height="16"
      />
      <span class="contacts-list__description">
        <span class="contacts-list__title">
          {{ $t('contacts.titles.schedule') }}
        </span>
        <span class="contacts-list__schedule">{{ contacts.schedule }}</span>
      </span>
    </li>
  </ul>
</template>

<script>
import phoneConversion from '@/mixins/phone-conversion'

export default {
  mixins: [phoneConversion],
  computed: {
    contacts() {
      return this.$store.state.contacts
    }
  }
}
</script>

<style lang="scss">
.contacts-list {
  @include list-unstyled();

  &__item {
    display: flex;

    &:not(:last-of-type) {
      margin-bottom: 19px;
    }
  }

  &__icon {
    flex: 0 0 16px;
    width: 16px;
    height: 16px;
    margin-top: 3px;
    color: $primary;
  }

  &__description {
    display: flex;
    flex-direction: column;
    padding-left: 18px;
  }

  &__title {
    margin-bottom: 4px;
    font-size: 11px;
    line-height: 14px;
    color: $gray-dark-1;
  }

  &__link,
  &__schedule {
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.05em;
  }

  @include media-breakpoint-up(md) {
    display: flex;
    flex-wrap: wrap;

    &__item {
      @include make-col(4);
      @include make-col-ready();

      flex-direction: column;
    }

    &__description {
      padding-left: 0;
    }

    &__icon {
      margin-top: 0;
      margin-bottom: 14px;
    }

    &__title {
      margin-bottom: 7px;
    }
  }
}
</style>
