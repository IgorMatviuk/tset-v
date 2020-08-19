<template>
  <div class="functions">
    <!-- <div class="functions__item">
      <svg-icon name="heart" class="functions__icon" />
    </div> -->
    <div class="functions__item functions__instagram">
      <a :href="socialInstagram.url" target="_blank">
        <svg-icon name="instagram" class="functions__icon" />
      </a>
    </div>
    <CartPreview />
    <!-- <div class="functions__item functions__auth">
      <svg-icon name="profile-girl" class="functions__icon" />
    </div> -->
  </div>
</template>

<script>
import CartPreview from '@/components/functional/CartPreview'

export default {
  components: {
    CartPreview
  },
  computed: {
    contacts() {
      return this.$store.state.contacts
    },
    socialInstagram() {
      return this.contacts.social_media.find(
        (social) => social.name === 'instagram'
      )
    }
  }
}
</script>

<style lang="scss">
.functions {
  display: flex;
  align-items: center;

  &__item {
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 20px;
    }
  }

  &__instagram {
    display: none;
  }

  &__shopping-bag {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 20px;

    &--disabled {
      cursor: not-allowed;
    }
  }

  &__items-count {
    position: absolute;
    right: -20px;
    width: 17px;
    height: 17px;
    padding-top: 3px;
    margin-left: 5px;
    font-size: 10px;
    font-weight: bold;
    line-height: 13px;
    color: $white;
    text-align: center;
    user-select: none;
    background-color: $primary;
    border-radius: 50%;
  }

  &__icon {
    width: 16px;
    height: 16px;
    color: $black;
  }

  @include media-breakpoint-up(md) {
    &__item {
      height: 60px;
      line-height: 60px;

      &:not(:first-child) {
        margin-left: 30px;
      }
    }

    &__instagram {
      display: block;
    }

    &__auth {
      display: none;
    }
  }
}
</style>
