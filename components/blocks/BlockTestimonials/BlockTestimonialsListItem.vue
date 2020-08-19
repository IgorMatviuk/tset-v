<template>
  <div class="testimonials-item">
    <div class="testimonials-item__header">
      <div class="testimonials-item__name">
        {{ testimonial.author }}
      </div>
      <Ratings
        v-model="testimonial.ratings"
        class="testimonials-item__ratings"
        variant="primary"
      />
    </div>
    <div class="testimonials-item__body">
      <div class="testimonials-item__title">
        {{ testimonial.title }}
      </div>
      <div class="testimonials-item__content">
        {{ testimonial.reviews }}
      </div>
    </div>
    <div class="testimonials-item__footer">
      <button v-if="hasImages" class="testimonials-item__view" type="button">
        <svg-icon
          class="testimonials-item__icon"
          name="picture"
          width="12"
          height="12"
        />
        <span>
          {{ $t('buttons.viewPhoto') }}
        </span>
      </button>
      <div class="testimonials-item__date">
        {{ testimonial.pub_date }}
      </div>
    </div>
  </div>
</template>

<script>
import Ratings from '@/components/shared/Ratings'

export default {
  components: {
    Ratings
  },
  props: {
    testimonial: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasImages() {
      return Object.keys(this.testimonial.images).length !== 0
    }
  }
}
</script>

<style lang="scss">
.testimonials-item {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  &__name {
    max-width: 150px;
    margin-top: 3px;
    overflow: hidden;
    font-size: 11px;
    font-weight: 500;
    line-height: 14px;
    text-overflow: ellipsis;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  &__body {
    position: relative;
    padding: 13px;
    padding-bottom: 26px;
    margin-bottom: 11px;
    border: 1px solid $light-4;
    border-radius: 2px;

    &::after {
      position: absolute;
      top: -5.7px;
      left: 19px;
      width: 10px;
      height: 10px;
      content: '';
      background-color: $white;
      border-top: 1px solid $light-4;
      border-left: 1px solid $light-4;
      border-top-left-radius: 2px;
      transform: rotate(45deg);
    }
  }

  &__title {
    margin-bottom: 8px;
    font-size: 11px;
    line-height: 14px;
    letter-spacing: 0.05em;
  }

  &__content {
    font-size: 11px;
    font-weight: 300;
    line-height: 14px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__view {
    @include reset-button-styles();

    display: flex;
    align-items: center;

    span {
      margin-bottom: 2px;
      font-size: 11px;
      line-height: 14px;
      text-decoration-line: underline;
      color: $gray-dark-2;
    }
  }

  &__icon {
    width: 12px;
    height: 12px;
    margin-right: 8px;
    color: $primary;
  }

  &__date {
    margin-left: auto;
    font-size: 11px;
    font-weight: 300;
    line-height: 14px;
    color: $text-color;
    letter-spacing: 0.07em;
  }

  &__preview {
    display: none;
  }

  @include media-breakpoint-up(md) {
    position: relative;
    padding-left: 100px;

    &__header {
      align-items: flex-start;
      margin-bottom: 14px;
    }

    &__name {
      margin-top: 0;
      font-size: 13px;
      line-height: 16px;
    }

    &__ratings {
      position: absolute;
      top: 3px;
      left: 0;
    }

    &__body {
      padding: 12px;
      padding-top: 9px;
      padding-bottom: 8px;
      margin-bottom: 7px;
    }

    &__title {
      margin-bottom: 5px;
    }

    &__view {
      span {
        font-size: 13px;
        line-height: 16px;
      }
    }

    &__icon {
      width: 14px;
      height: 14px;
      margin-right: 12px;
    }

    &__date {
      position: absolute;
      top: 25px;
      left: 0;
    }
  }

  @include media-breakpoint-up(lg) {
    &__body {
      padding-bottom: 11px;
      margin-bottom: 9px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__body {
      padding: 14px;
      margin-bottom: 10px;
    }
  }

  @include media-breakpoint-up(xxl) {
    padding-right: 120px;
    padding-left: 120px;
  }
}
</style>
