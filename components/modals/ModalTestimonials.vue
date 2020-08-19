<template>
  <div class="testimonials-preview">
    <div class="testimonials-preview__image-wrapper">
      <div class="testimonials-preview__image-container">
        <transition name="fade" mode="out-in">
          <picture v-if="renderComponent">
            <source
              srcset="/img/stub.png"
              :data-srcset="testimonial.images.small | webp"
              media="(max-width: 991px)"
              type="image/webp"
            />
            <source
              srcset="/img/stub.png"
              :data-srcset="testimonial.images.small"
              media="(max-width: 991px)"
              type="image/jpeg"
            />

            <source
              :data-srcset="testimonial.images.large | webp"
              type="image/webp"
            />
            <img
              src="/img/stub.png"
              :data-src="testimonial.images.large"
              class="testimonials-preview__image lazyload"
              :alt="testimonial.title"
              :title="testimonial.title"
              loading="lazy"
            />
          </picture>
        </transition>
      </div>
    </div>
    <div class="testimonials-preview__body">
      <div class="testimonials-preview__title">{{ testimonial.title }}</div>
      <Ratings
        v-model="testimonial.ratings"
        class="testimonials-preview__ratings"
        variant="primary"
      />
      <div
        class="testimonials-preview__text"
        v-html="testimonial.reviews"
      ></div>
      <div class="testimonials-preview__date">{{ testimonial.pub_date }}</div>
      <div class="testimonials-preview__navigation">
        <button
          class="testimonials-preview__prev"
          type="button"
          @click="toggleTestimonial('previous')"
        >
          <svg-icon
            name="arrow"
            class="testimonials-preview__icon"
            width="30"
            heigth="9"
          />
        </button>
        <button
          class="testimonials-preview__next"
          type="button"
          @click="toggleTestimonial('next')"
        >
          <svg-icon
            name="arrow"
            class="testimonials-preview__icon"
            width="30"
            heigth="9"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import imageNextGen from '@/mixins/image-next-gen'

import Ratings from '@/components/shared/Ratings'

export default {
  components: {
    Ratings
  },
  mixins: [imageNextGen],
  data() {
    return {
      activeIndex: 0,
      renderComponent: true
    }
  },
  computed: {
    ...mapState({
      modal: (state) => state.modal.testimonials
    }),
    testimonial() {
      return this.modal.data.testimonials[this.activeIndex]
    }
  },
  mounted() {
    this.activeIndex = this.modal.data.activeIndex
  },
  methods: {
    toggleTestimonial(direction) {
      const lastTestimonialIndex = this.modal.data.testimonials.length - 1
      const isNext =
        direction === 'next' && this.activeIndex < lastTestimonialIndex
      const isLast =
        direction === 'next' && this.activeIndex === lastTestimonialIndex
      const isPrevious = direction === 'previous' && this.activeIndex > 0
      const isFirst = direction === 'previous' && this.activeIndex === 0

      if (isNext) {
        this.activeIndex = this.activeIndex + 1
      } else if (isLast) {
        this.activeIndex = 0
      } else if (isPrevious) {
        this.activeIndex = this.activeIndex - 1
      } else if (isFirst) {
        this.activeIndex = lastTestimonialIndex
      }

      this.forceRerender()
    },
    forceRerender() {
      this.renderComponent = false

      this.$nextTick().then(() => {
        this.renderComponent = true
      })
    }
  }
}
</script>

<style lang="scss">
.testimonials-preview {
  &__image-wrapper {
    width: 100%;
  }

  &__image-container {
    position: relative;
    height: 1px;
    padding-bottom: $preview-aspect-ratio;
  }

  &__image {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  &__body {
    padding-top: 28px;
    padding-right: 30px;
    padding-bottom: 30px;
    padding-left: 30px;
  }

  &__title {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    color: $input-color;
    letter-spacing: -0.02em;
  }

  &__ratings {
    justify-content: flex-end;
    margin-bottom: 21px;

    .ratings__item {
      width: 16px;
      height: 16px;

      &:not(:first-of-type) {
        margin-right: 4px;
      }
    }
  }

  &__text {
    & > *,
    & {
      margin-bottom: 0;
      font-size: 12px;
      line-height: 15px;
      color: $text-color;
    }
  }

  &__date {
    margin-top: 10px;
    font-size: 11px;
    font-weight: 300;
    line-height: 14px;
    color: $text-color;
    letter-spacing: 0.07em;
  }

  &__navigation {
    display: none;
  }

  @include media-breakpoint-up(md) {
    position: relative;

    &__image-wrapper {
      width: 210px;
    }

    &__body {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      width: 265px;
      height: 100%;
      padding: 20px;
      padding-bottom: 6px;
    }

    &__title {
      padding-right: 10px;
      margin-bottom: 9px;
      font-size: 13px;
      line-height: 16px;
    }

    &__ratings {
      margin-bottom: 9px;

      .ratings__item {
        width: 14px;
        height: 14px;

        &:not(:first-of-type) {
          margin-right: 1px;
        }
      }
    }

    &__text {
      max-height: 167px;
      overflow: hidden;

      & > *,
      & {
        font-size: 11px;
        line-height: 14px;
      }
    }

    &__date {
      margin-top: 13px;
      margin-bottom: 16px;
      font-size: 10px;
      line-height: 13px;
    }

    &__navigation {
      display: flex;
      align-items: center;
      margin-top: auto;
    }

    &__prev,
    &__next {
      @include reset-button-styles();

      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
    }

    &__prev {
      margin-right: 35px;
      transform: rotate(180deg);
    }

    &__next {
      padding-bottom: 1px;
    }

    &__icon {
      width: 30px;
      height: 9px;
      color: $primary;
    }
  }

  @include media-breakpoint-up(lg) {
    &__image-wrapper {
      width: 290px;
    }

    &__body {
      width: 300px;
    }

    &__text {
      max-height: 280px;
    }
  }

  @include media-breakpoint-up(xl) {
    &__image-wrapper {
      width: 270px;
    }

    &__body {
      width: 300px;
      padding-top: 22px;
      padding-right: 19px;
      padding-bottom: 11px;
      padding-left: 19px;
    }

    &__title {
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 18px;
    }

    &__ratings {
      margin-bottom: 12px;

      .ratings__item {
        width: 16px;
        height: 16px;

        &:not(:first-of-type) {
          margin-right: 4px;
        }
      }
    }

    &__text {
      max-height: 225px;

      & > *,
      & {
        font-size: 12px;
        line-height: 15px;
      }
    }

    &__date {
      margin-top: 16px;
      font-size: 11px;
      line-height: 14px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__image-wrapper {
      width: 330px;
    }

    &__body {
      width: 366px;
      padding: 40px;
      padding-bottom: 14px;
    }

    &__title {
      margin-bottom: 15px;
      font-size: 16px;
      line-height: 20px;
    }

    &__ratings {
      margin-bottom: 21px;
    }

    &__text {
      max-height: 255px;

      & > *,
      & {
        font-size: 12px;
        line-height: 15px;
      }
    }

    &__date {
      margin-top: 21px;
      margin-bottom: 21px;
    }
  }
}
</style>
