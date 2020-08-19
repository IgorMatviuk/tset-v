<template>
  <div
    :class="{ 'testimonials-card--is-page': isTestimonialsPage }"
    class="testimonials-card"
  >
    <div class="testimonials-card__overlay"></div>
    <div class="testimonials-card__preview">
      <div class="testimonials-card__img-wrapper">
        <ImageLoader :negative="true">
          <picture>
            <source
              :data-srcset="item.images.small | webp"
              srcset="/img/stub.png"
              media="(max-width: 991px)"
              type="image/webp"
            />
            <source
              :data-srcset="item.images.small"
              srcset="/img/stub.png"
              media="(max-width: 991px)"
              type="image/jpeg"
            />
            <source :data-srcset="item.images.large | webp" type="image/webp" />
            <img
              :data-src="item.images.large"
              :alt="item.title"
              :title="item.title"
              src="/img/stub.png"
              class="testimonials-card__img lazyload img-fade"
              data-object-fit="cover"
              data-object-position="center"
              loading="lazy"
            />
          </picture>
        </ImageLoader>
      </div>
    </div>
    <div class="testimonials-card__buttons">
      <BButton
        v-dynamic-modal:testimonials="modalData"
        variant="outline-light"
        class="testimonials-card__button testimonials-card__button--read"
        type="button"
      >
        {{ $t('buttons.readReview') }}
      </BButton>
      <BButton
        v-if="!isTestimonialsPage"
        :to="$i18n.path('testimonials')"
        variant="outline-light"
        class="testimonials-card__button testimonials-card__button--all-reviews"
      >
        {{ $t('buttons.allReviews') }}
      </BButton>
    </div>
    <div class="testimonials-card__desc">
      <Ratings
        v-model="item.ratings"
        class="testimonials-card__ratings"
        variant="light"
      />
      <div class="testimonials-card__author">
        {{ item.author }}
      </div>
    </div>
  </div>
</template>

<script>
import ImageLoader from '@/components/shared/ImageLoader'

import imageNextGen from '@/mixins/image-next-gen'

import Ratings from '@/components/shared/Ratings'

export default {
  components: {
    Ratings,
    ImageLoader
  },
  mixins: [imageNextGen],
  props: {
    item: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    isTestimonialsPage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modalData() {
      const testimonials = this.items
      const activeIndex = this.index

      return {
        data: {
          testimonials,
          activeIndex
        }
      }
    }
  }
}
</script>

<style lang="scss">
.testimonials-card {
  position: relative;

  &__preview {
    width: 100%;
  }

  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    background-color: $black-light-1;
    opacity: 0;
    transition: opacity 0.5s;
  }

  &:hover &__overlay {
    opacity: 1;
  }

  &__img-wrapper {
    position: relative;
    height: 1px;
    padding-bottom: $preview-aspect-ratio;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: '';
      // stylelint-disable
      background: linear-gradient(
        0,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0) 100%
      );
      // stylelint-enable
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__buttons {
    position: absolute;
    top: calc(50% - 53px);
    right: 0;
    left: 0;
    z-index: 3;
    text-align: center;
    opacity: 0;
    transition: transform 0.5s, opacity 0.5s;
    transform: translateY(25px);
  }

  &--is-page &__buttons {
    top: calc(50% - 20px);
  }

  &:hover &__buttons {
    opacity: 1;
    transform: translateY(0);
  }

  &__button {
    font-size: 14px;

    &--read {
      margin-bottom: 15px;
    }
  }

  &--is-page &__button--read {
    margin-bottom: 0;
  }

  &__desc {
    position: absolute;
    bottom: 22px;
    z-index: 1;
    display: flex;
    align-items: center;
    padding-right: 20px;
    padding-left: 20px;
  }

  &__author {
    max-width: 160px;
    margin-top: 7px;
    overflow: hidden;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
    color: $white;
    text-overflow: ellipsis;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  &__ratings {
    margin-right: 15px;
  }

  @include media-breakpoint-down(xl) {
    &__buttons {
      top: calc(50% - 45px);
    }

    &__button--read {
      margin-bottom: 12px;
    }

    &__author {
      max-width: 120px;
    }
  }

  @include media-breakpoint-down(lg) {
    &__overlay {
      display: none;
    }

    &__buttons {
      top: calc(50% - 20px);
      right: 0;
      left: 0;
      opacity: 1;
      transform: none;
    }

    &:hover &__buttons {
      opacity: 1;
      transform: none;
    }

    &__button {
      min-width: 150px;
      height: 40px;
      line-height: 38px;

      &--read {
        margin-bottom: 0;
      }

      &--all-reviews {
        display: none;
      }
    }

    &__desc {
      bottom: 14px;
      padding-right: 12px;
      padding-left: 12px;
    }

    &__author {
      margin-top: 4px;
    }
  }

  @include media-breakpoint-down(md) {
    &__buttons {
      bottom: 30px;
    }

    &__ratings {
      margin-right: 11px;
    }
  }

  @include media-breakpoint-down(sm) {
    &__buttons {
      top: unset;
      bottom: 17px;
    }

    &--is-page &__buttons {
      top: unset;
      bottom: 17px;
    }

    &__button {
      min-width: 210px;
      height: 35px;
      font-size: 13px;
      line-height: 32px;
    }

    &__desc {
      right: 0;
      bottom: 57px;
      left: 0;
      flex-direction: column-reverse;
      align-items: center;
      justify-content: center;
    }

    &__author {
      margin-top: 0;
      margin-bottom: -4px;
      font-size: 11px;
      line-height: 14px;
    }

    &__ratings {
      margin-top: 8px;
      margin-right: 0;
      margin-bottom: 4px;
    }
  }
}
</style>
