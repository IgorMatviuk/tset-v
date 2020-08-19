<template>
  <div class="social-networks">
    <a
      v-for="(item, index) in socialMedia"
      :key="index"
      :href="item.url"
      target="_blank"
      class="social-networks__link"
    >
      <svg-icon :name="item.name" class="social-networks__icon" />
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      socialMedia: (state) => state.contacts.social_media
    })
  }
}
</script>

<style lang="scss">
.social-networks {
  display: flex;
  align-items: center;

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: $white;
    background-color: $primary-light-2;
    border-radius: 50%;
    transition: background-color 0.3s, color 0.3s;

    &:not(:last-of-type) {
      margin-right: 19px;
    }

    @include hover-focus-active() {
      color: $white;
      background-color: $primary;
    }
  }

  &__icon {
    width: 16px;
    height: 16px;
  }
}
</style>
