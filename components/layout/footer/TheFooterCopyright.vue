<template>
  <div class="footer__copyright copyright">
    <div class="copyright__reserved">
      {{ currYear }}. {{ $t('footer.copyright') }}.
    </div>
    <div class="copyright__development">
      {{ $t('footer.developedBy') }}
      <a href="#" target="_blank" class="copyright__link">
        <svg-icon
          name="bonum-logo"
          class="copyright__icon"
          width="43"
          height="8"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currYear() {
      const date = new Date()
      return date.getFullYear()
    }
  }
}
</script>

<style lang="scss">
.copyright {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__reserved,
  &__development {
    font-size: 10px;
    line-height: 1.3;
    color: $gray-dark-1;
  }

  &__development {
    display: flex;
    align-items: center;
  }

  &__link {
    margin-left: 3px;
    color: $primary-light-1;
    transition: color 0.3s;

    @include hover-focus-active() {
      color: $primary;
    }
  }

  @include media-breakpoint-down(sm) {
    flex-direction: column;
    justify-content: center;

    &__development {
      margin-top: 4px;
    }
  }
}
</style>
