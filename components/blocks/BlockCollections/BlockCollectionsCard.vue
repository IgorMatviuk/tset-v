<template>
  <div class="collection-card">
    <SectionHeader class="collection-card__header">
      <template v-slot:title>{{ collection.name }}</template>
    </SectionHeader>
    <div class="collection-card__preview">
      <div class="collection-card__img-overlay"></div>
      <div v-if="showCategoryButtons" class="collection-card__button-group">
        <BButton
          :to="$i18n.path(collection.slug)"
          variant="outline-light"
          class="collection-card__button"
        >
          {{ `смотреть все ${collection.name}` }}
        </BButton>
        <BButton
          v-for="category in popularSubcategories"
          :key="category.id"
          :to="category.slug"
          variant="outline-light"
          class="collection-card__button"
        >
          {{ category.name }}
        </BButton>
      </div>
      <div v-else class="collection-card__button-group">
        <BButton
          :to="$i18n.path(`${collection.slug}`)"
          variant="outline-light"
          class="collection-card__button"
        >
          посмотреть {{ collection.name }}
        </BButton>
      </div>
      <div class="collection-card__img-wrapper">
        <ImageLoader v-if="collection.images" :negative="true">
          <picture>
            <source
              :data-srcset="collection.images.collection_xl | webp"
              srcset="/img/stub.png"
              media="(min-width: 1500px)"
              type="image/webp"
            />
            <source
              :data-srcset="collection.images.collection_xl"
              srcset="/img/stub.png"
              media="(min-width: 1500px)"
            />
            <source
              :data-srcset="collection.images.collection_lg | webp"
              srcset="/img/stub.png"
              media="(min-width: 1200px)"
              type="image/webp"
            />
            <source
              :data-srcset="collection.images.collection_lg"
              srcset="/img/stub.png"
              media="(min-width: 1200px)"
            />
            <source
              :data-srcset="collection.images.collection_md | webp"
              srcset="/img/stub.png"
              media="(min-width: 992px)"
              type="image/webp"
            />
            <source
              :data-srcset="collection.images.collection_md"
              srcset="/img/stub.png"
              media="(min-width: 992px)"
            />
            <source
              :data-srcset="collection.images.collection_xs | webp"
              srcset="/img/stub.png"
              media="(min-width: 768px)"
              type="image/webp"
            />
            <source
              :data-srcset="collection.images.collection_xs"
              srcset="/img/stub.png"
              media="(min-width: 768px)"
            />
            <source
              :data-srcset="collection.images.collection_sm | webp"
              srcset="/img/stub.png"
              type="image/webp"
            />
            <img
              :data-src="collection.images.collection_sm"
              src="/img/stub.png"
              :alt="collection.name"
              :title="collection.name"
              class="collection-card__img lazyload img-fade"
              data-object-fit="cover"
              data-object-position="center"
              loading="lazy"
            />
          </picture>
        </ImageLoader>
      </div>
    </div>
  </div>
</template>

<script>
import ImageLoader from '@/components/shared/ImageLoader'
import SectionHeader from '@/components/shared/SectionHeader'

import imageNextGen from '@/mixins/image-next-gen'

export default {
  components: {
    ImageLoader,
    SectionHeader
  },
  mixins: [imageNextGen],
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  computed: {
    popularSubcategories() {
      if (this.collection.categories.length) {
        const subcategories = [...this.collection.categories.slice(1)]

        return subcategories
          .sort(({ popularity: a }, { popularity: b }) => b - a)
          .slice(0, 2)
      } else {
        return []
      }
    },
    showCategoryButtons() {
      return this.collection.categories && this.collection.categories.length
    }
  }
}
</script>

<style lang="scss">
.collection-card {
  position: relative;

  &__preview {
    position: relative;
    width: 100%;
  }

  &__img-wrapper {
    position: relative;
    height: 1px;
    padding-bottom: $preview-aspect-ratio;
  }

  &__img-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-color: $black-light-1;
    opacity: 0;
    transition: opacity 0.5s;
  }

  &:hover &__img-overlay {
    opacity: 1;
  }

  &__button-group {
    position: absolute;
    top: 54%;
    left: 50%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transition: top 0.5s, opacity 0.5s;
    transform: translateY(-51%) translateX(-50%);
  }

  &:hover &__button-group {
    top: 50%;
    opacity: 1;
  }

  &__button {
    font-size: 14px;
    text-transform: lowercase;

    &:not(:last-of-type) {
      margin-bottom: 15px;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @include media-breakpoint-down(xl) {
    &__header {
      margin-bottom: 7px;
    }

    &__button-group {
      transform: translateY(-49%) translateX(-50%);
    }

    &__button {
      min-width: 173px;
      height: 33px;
      line-height: 31px;
    }
  }

  @include media-breakpoint-down(lg) {
    &__header {
      padding-bottom: 8px;
      margin-bottom: 0;
    }

    &__img-overlay {
      display: none;
    }

    &:hover &__img-overlay {
      opacity: 0;
      transform: none;
    }

    &__button-group {
      top: initial;
      bottom: 50px;
      opacity: 1;
      transform: translateX(-50%);
    }

    &:hover &__button-group {
      top: initial;
      bottom: 50px;
      opacity: 1;
    }

    &__button {
      min-width: 210px;
      height: 35px;
      line-height: 33px;
    }
  }

  @include media-breakpoint-down(md) {
    &__button-group {
      bottom: 41px;
    }

    &:hover &__button-group {
      bottom: 41px;
    }
  }

  @include media-breakpoint-down(sm) {
    &__header {
      padding-bottom: 9px;
      margin-bottom: 2px;
    }

    &__preview {
      width: calc(100% + 30px);
      margin-right: -15px;
      margin-left: -15px;
    }

    &__button-group {
      bottom: 36px;
    }

    &:hover &__button-group {
      bottom: 36px;
    }
  }
}
</style>
