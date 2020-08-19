<template>
  <div class="post-navigation">
    <BContainer>
      <hr class="post-navigation__delimiter" />
      <div class="post-navigation__content">
        <NuxtLink
          v-if="links.prev"
          :to="$i18n.path(`blog/${links.prev.slug}`)"
          class="post-navigation__link post-navigation__link--prev"
        >
          <svg-icon
            name="arrow"
            class="post-navigation__icon post-navigation__icon--prev"
            width="30"
            height="9"
          />
          <span class="post-navigation__link-text">
            {{ links.prev.title }}
          </span>
        </NuxtLink>
        <NuxtLink
          v-if="links.next"
          :to="$i18n.path(`blog/${links.next.slug}`)"
          class="post-navigation__link post-navigation__link--next"
        >
          <span class="post-navigation__link-text">
            {{ links.next.title }}
          </span>
          <svg-icon
            name="arrow"
            class="post-navigation__icon post-navigation__icon--next"
            width="30"
            height="9"
          />
        </NuxtLink>
      </div>
    </BContainer>
  </div>
</template>

<script>
export default {
  props: {
    links: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.post-navigation {
  &__delimiter {
    margin-top: 12px;
    margin-bottom: 19px;
    border-top: 2px solid $primary-light-2;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__link {
    display: flex;
    align-items: center;
    transition: color 0.3s;

    &--prev {
      margin-right: auto;
    }

    &--next {
      margin-left: auto;
    }
  }

  &__link-text {
    display: inline-block;
    max-width: 80px;
    overflow: hidden;
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }

  &__icon {
    width: 30px;
    height: 9px;
    margin-bottom: 2px;

    &--prev {
      margin-right: 17px;
      transform: rotate(180deg);
    }

    &--next {
      margin-left: 5px;
    }
  }

  @include media-breakpoint-up(md) {
    &__delimiter {
      margin-bottom: 13px;
    }

    &__content,
    &__delimiter {
      width: 450px;
      margin-right: auto;
      margin-left: auto;
    }

    &__link-text {
      max-width: 180px;
      font-size: 11px;
      line-height: 14px;
    }

    &__icon {
      &--prev {
        margin-right: 5px;
      }

      &--next {
        margin-left: 1px;
      }
    }
  }

  @include media-breakpoint-up(lg) {
    &__delimiter {
      margin-bottom: 15px;
    }

    &__content,
    &__delimiter {
      width: 610px;
    }

    &__link-text {
      max-width: 255px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__delimiter {
      margin-bottom: 25px;
    }

    &__content,
    &__delimiter {
      width: 770px;
    }

    &__link-text {
      max-width: 320px;
      font-size: 14px;
      line-height: 18px;
    }

    &__icon {
      &--prev {
        margin-right: 13px;
      }
    }
  }

  @include media-breakpoint-up(xxl) {
    &__delimiter {
      margin-bottom: 24px;
    }

    &__content,
    &__delimiter {
      width: 930px;
    }

    &__link-text {
      max-width: 365px;
      font-size: 16px;
      line-height: 20px;
    }

    &__icon {
      &--prev {
        margin-right: 20px;
      }

      &--next {
        margin-left: 10px;
      }
    }
  }
}
</style>
