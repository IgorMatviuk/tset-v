<template>
  <div ref="description" class="site-desc">
    <BContainer>
      <div :class="{ hide: collapsed }" class="site-desc__wrapper">
        <div class="site-desc__content" v-html="content"></div>
      </div>
      <button
        class="site-desc__button"
        type="button"
        @click="collapsed = !collapsed"
      >
        <span>{{ collapsed ? $t('collapse.show') : $t('collapse.hide') }}</span>
        <svg-icon
          :class="[{ hide: collapsed }, 'site-desc__button-icon']"
          name="caret"
          width="14"
          height="11"
        />
      </button>
    </BContainer>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      collapsed: true
    }
  }
}
</script>

<style lang="scss">
.site-desc {
  padding-bottom: 75px;
  margin-top: 86px;

  &__wrapper {
    max-height: 5000px;
    overflow: hidden;
    transition: max-height 1.5s ease-in-out;

    &.hide {
      max-height: 225px;
      transition: max-height 1s cubic-bezier(0, 1, 0, 1);
    }

    h1 {
      margin-bottom: 21px;
      font-size: 18px;
      font-weight: bold;
      line-height: 23px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    h2 {
      margin-bottom: 13px;
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      text-transform: uppercase;
    }

    p,
    li,
    span {
      font-size: 14px;
      line-height: 18px;
      color: $text-color;
    }

    p {
      margin-bottom: 23px;
    }

    ol,
    ul {
      padding: 0;
      padding-left: 2px;
      margin-bottom: 23px;
      list-style-position: inside;
    }

    li {
      &:not(:last-of-type) {
        margin-bottom: 18px;
      }
    }
  }

  &__button {
    @include reset-button-styles();

    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1px;
    margin-top: 1px;
    margin-right: -2px;
    margin-left: auto;
    font-size: 14px;
    color: $primary;
    text-transform: lowercase;
  }

  &__button-icon {
    margin-left: 5px;
    transform: rotate(-90deg);

    &.hide {
      transform: rotate(90deg);
    }
  }

  @include media-breakpoint-down(xl) {
    padding-bottom: 52px;
    margin-top: 103px;

    &__wrapper {
      &.hide {
        max-height: 265px;
      }

      h1 {
        margin-bottom: 25px;
      }

      p,
      ul,
      ol {
        margin-bottom: 19px;
      }
    }

    &__button {
      margin-top: 0;
    }
  }

  @include media-breakpoint-down(lg) {
    padding-bottom: 20px;
    margin-top: 18px;

    &__wrapper {
      &.hide {
        max-height: 370px;
      }

      h1 {
        margin-bottom: 45px;
      }

      h2 {
        margin-bottom: 33px;
      }

      p,
      ul,
      ol {
        margin-bottom: 38px;
      }
    }
  }

  @include media-breakpoint-down(md) {
    padding-bottom: 30px;

    &__wrapper {
      &.hide {
        max-height: 358px;
      }

      p,
      ul,
      ol {
        margin-bottom: 22px;
      }
    }

    &__button {
      flex-direction: column;
      margin-top: 15px;
      margin-right: auto;
      margin-left: auto;
    }

    &__button-icon {
      margin-top: 1px;
      margin-left: 2px;
    }
  }

  @include media-breakpoint-down(sm) {
    padding-bottom: 35px;
    margin-top: 39px;

    &__wrapper {
      &.hide {
        max-height: 166px;
      }

      h1 {
        margin-bottom: 19px;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0.05em;
      }
    }
  }
}
</style>
