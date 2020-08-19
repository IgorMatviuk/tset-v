<template>
  <div class="collections">
    <BContainer>
      <div v-if="staticCollections" class="collections__row">
        <div
          v-for="(collection, index) in collections"
          :key="index"
          class="collections__item"
        >
          <BlockCollectionsCard
            :collection="collection"
            class="collections__card"
          />
        </div>
      </div>
      <div v-else class="collections__container">
        <BlockCollectionsThumbsSlider :collections="collections" />
        <BlockCollectionsSlider :collections="collections" />
        <div class="collections__slider-navigation">
          <SliderArrow arrow-type="prev" class="collections__prev" />
          <SliderArrow arrow-type="next" class="collections__next" />
        </div>
        <MoreLink url="catalog" class="collections__more">
          {{ $t('catalogPage.goto') }}
        </MoreLink>
      </div>
    </BContainer>
  </div>
</template>

<script>
import BlockCollectionsCard from './BlockCollectionsCard'
import BlockCollectionsSlider from './BlockCollectionsSlider'
import BlockCollectionsThumbsSlider from './BlockCollectionsThumbsSlider'
import SliderArrow from '@/components/shared/SliderArrow'
import MoreLink from '@/components/shared/MoreLink'

export default {
  components: {
    BlockCollectionsCard,
    BlockCollectionsSlider,
    BlockCollectionsThumbsSlider,
    SliderArrow,
    MoreLink
  },
  props: {
    collections: {
      type: Array,
      required: true
    },
    staticCollections: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss">
.collections {
  margin-top: 50px;
  overflow-x: hidden;

  &__container {
    position: relative;
  }

  &__row {
    @include make-row();
  }

  &__item {
    @include make-col(6);
    @include make-col-ready();
  }

  &__thumbs-container {
    display: none;
  }

  &__slider-navigation {
    position: absolute;
    top: 12px;
    right: -5px;
    z-index: 1;
    width: 113px;
    height: 40px;
    background-color: $white;
  }

  &__pagination {
    display: none;
  }

  &__more {
    display: none !important;
  }

  @include media-breakpoint-down(xl) {
    margin-top: 56px;

    &__slide {
      .collection-card {
        &__header {
          margin-bottom: 0;
        }

        &__button {
          min-width: 210px;
          height: 40px;
          line-height: 38px;
        }
      }
    }

    &__slider-navigation {
      top: 5px;
      width: 98px;
    }
  }

  @include media-breakpoint-down(lg) {
    margin-top: 15px;

    &__slider {
      padding-bottom: 54px;
    }

    &__thumbs-container {
      position: absolute;
      top: 41px;
      right: 0;
      left: 0;
      z-index: 5;
      display: flex;
      align-items: flex-start;
      transition: transform 0.4s;
    }

    &__slide {
      .collection-card {
        &__header {
          margin-bottom: 50px;
        }

        &__button-group {
          display: none;
        }
      }
    }

    &__button {
      display: inline-block;
      flex-shrink: 0;
      min-width: 75px;
      height: 25px;
      padding-right: 10px;
      padding-left: 10px;
      margin-right: 10px;
      font-size: 12px;
      font-weight: 500;
      line-height: 23px;
      color: $primary-light-1;
      text-align: center;
      text-transform: lowercase;
      white-space: nowrap;
      background-color: transparent;
      border: 1px solid $primary-light-1;
      border-radius: 2px;
      transition: color 0.3s, border 0.3s;

      @include hover-focus-active {
        color: $primary-light-1;
      }

      &--active {
        color: $primary;
        border-color: $primary;
      }
    }

    &__slider-navigation {
      display: none;
    }

    &__pagination {
      display: block;
    }

    &__more {
      position: absolute;
      top: 5px;
      right: -3px;
      z-index: 1;
      display: block;
      height: 25px;
      padding-left: 15px;
      background-color: $white;
    }
  }

  @include media-breakpoint-down(md) {
    margin-top: 22px;

    &__slider {
      padding-bottom: 53px;
    }

    &__slide {
      .collection-card {
        &__header {
          margin-bottom: 52px;
        }
      }
    }
  }

  @include media-breakpoint-down(sm) {
    margin-top: 5px;

    &__item {
      @include make-col(12);

      &:not(:last-of-type) {
        margin-bottom: 11px;
      }
    }

    &__thumbs-container {
      top: 47px;
    }

    &__container {
      margin-right: -15px;
      margin-left: -15px;
    }

    &__slider {
      padding-right: 15px;
      padding-bottom: 42px;
      padding-left: 15px;
    }

    &__slide {
      .collection-card {
        &__header {
          margin-bottom: 44px;
        }
      }
    }

    &__button {
      margin-right: 5px;
    }

    &__more {
      top: 14px;
      padding-right: 14px;
    }
  }

  @media only screen and (max-width: 569.98px) {
    &__thumbs-container {
      left: 15px;
    }
  }
}
</style>
