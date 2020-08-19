<template>
  <div class="post-card">
    <div class="post-card__row">
      <div class="post-card__preview">
        <div class="post-card__img-wrapper">
          <ImageLoader :negative="true">
            <picture>
              <source
                :data-srcset="post.images.extraLarge | webp"
                srcset="/img/stub.png"
                media="(min-width: 1500px)"
                type="image/webp"
              />
              <source
                :data-srcset="post.images.extraLarge"
                srcset="/img/stub.png"
                media="(min-width: 1500px)"
                type="image/jpeg"
              />
              <source
                :data-srcset="post.images.large | webp"
                srcset="/img/stub.png"
                media="(min-width: 1200px)"
                type="image/webp"
              />
              <source
                :data-srcset="post.images.large"
                srcset="/img/stub.png"
                media="(min-width: 1200px)"
                type="image/jpeg"
              />
              <source
                :data-srcset="post.images.square | webp"
                srcset="/img/stub.png"
                media="(min-width: 992px)"
                type="image/webp"
              />
              <source
                :data-srcset="post.images.square"
                srcset="/img/stub.png"
                media="(min-width: 992px)"
                type="image/jpeg"
              />
              <source
                :data-srcset="post.images.small | webp"
                type="image/webp"
              />
              <img
                :data-src="post.images.small"
                :alt="post.title"
                :title="post.title"
                src="/img/stub.png"
                class="post-card__img lazyload img-fade"
                loading="lazy"
              />
            </picture>
          </ImageLoader>
          <div class="post-card__img-overlay"></div>
          <div class="post-card__button-group">
            <BButton
              to="/"
              variant="outline-light"
              class="post-card__button is-blog"
            >
              в блог
            </BButton>
          </div>
        </div>
      </div>
      <article class="post-card__content">
        <div class="post-card__date">{{ post.pubDate }}</div>
        <!-- TODO: remove views -->
        <!-- <div class="post-card__views">
          <svg-icon
            name="views"
            class="post-card__views-icon"
            width="15"
            height="15"
          />
          {{ post.views }}
        </div> -->
        <h3 class="post-card__title">{{ post.title }}</h3>
        <p class="post-card__post">{{ post.post }}</p>
        <!-- TODO: one post url -->
        <MoreLink :is-black="true" url="some-article" class="post-card__link">
          {{ $t('buttons.readMore') }}
        </MoreLink>
      </article>
    </div>
  </div>
</template>

<script>
import ImageLoader from '@/components/shared/ImageLoader'
import MoreLink from '@/components/shared/MoreLink'

import imageNextGen from '@/mixins/image-next-gen'

export default {
  components: {
    ImageLoader,
    MoreLink
  },
  mixins: [imageNextGen],
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.post-card {
  &__row {
    position: relative;
    display: flex;
    align-items: flex-start;
    margin-right: 0;
    margin-left: 0;
  }

  &__preview {
    flex-shrink: 0;
    width: 330px;
  }

  &__img-wrapper {
    position: relative;
    height: 1px;
    padding-bottom: $preview-aspect-ratio;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__img-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $black-light-1;
    opacity: 0;
    transition: opacity 0.5s;
  }

  &:hover &__img-overlay {
    opacity: 1;
  }

  &__button-group {
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 97px);
    opacity: 0;
    transition: transform 0.5s, opacity 0.5s;
    transform: translateY(25px);
  }

  &:hover &__button-group {
    opacity: 1;
    transform: translateY(0);
  }

  &__button {
    min-width: 180px;
    font-size: 14px;
  }

  &__content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 330px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 345px;
    height: 100%;
    padding-right: 12px;
    padding-left: 30px;
  }

  &__date,
  &__views {
    font-size: 14px;
    line-height: 1;
  }

  &__date {
    width: 100%;
  }

  &__views {
    display: flex;
    align-items: center;
    margin-top: -1px;
  }

  &__views-icon {
    width: 15px;
    height: 15px;
    margin-right: 5px;
    color: $gray-dark-1;
  }

  &__title {
    display: -webkit-box;
    height: 90px;
    margin-top: 20px;
    margin-bottom: 0;
    overflow: hidden;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.25;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &__post {
    display: -webkit-box;
    height: 281px;
    margin-top: 28px;
    margin-bottom: 0;
    overflow: hidden;
    font-size: 16px;
    line-height: 1.25;
    color: $text-color;
    -webkit-line-clamp: 14;
    -webkit-box-orient: vertical;
  }

  &__link {
    margin-top: auto;
  }

  @include media-breakpoint-down(xl) {
    &__preview {
      width: 270px;
    }

    &__button-group {
      left: calc(50% - 84px);
    }

    &__button {
      min-width: 150px;
      height: 33px;
      line-height: 31px;
    }

    &__content {
      left: 270px;
      width: 295px;
      padding-right: 0;
    }

    &__date {
      margin-right: 20px;
    }

    &__views-icon {
      margin-right: 5px;
    }

    &__title {
      height: 120px;
      margin-top: 15px;
      -webkit-line-clamp: 4;
    }

    &__post {
      height: 180px;
      margin-top: 28px;
      -webkit-line-clamp: 9;
    }
  }

  @include media-breakpoint-down(lg) {
    &__preview {
      width: 290px;
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
      bottom: 55px;
      left: calc(50% - 93px);
      opacity: 1;
      transform: none;
    }

    &:hover &__button-group {
      opacity: 1;
      transform: none;
    }

    &__button {
      min-width: 170px;
      height: 35px;
      line-height: 33px;

      &.is-post {
        margin-bottom: 0;
      }

      &.is-blog {
        display: none;
      }
    }

    &__content {
      left: 290px;
      width: unset;
      padding-right: 0;
    }

    &__views-icons {
      margin-right: 6px;
    }

    &__title {
      height: 60px;
      margin-top: 20px;
      -webkit-line-clamp: 2;
    }

    &__post {
      height: 220px;
      margin-top: 58px;
      -webkit-line-clamp: 11;
    }
  }

  @include media-breakpoint-down(md) {
    &__preview {
      width: 210px;
    }

    &__button-group {
      bottom: 40px;
      left: calc(50% - 90px);
    }

    &__content {
      left: 210px;
    }

    &__views-icon {
      margin-right: 8px;
    }

    &__title {
      height: 90px;
      -webkit-line-clamp: 3;
    }

    &__post {
      height: 120px;
      margin-top: 28px;
      -webkit-line-clamp: 6;
    }
  }

  @include media-breakpoint-down(sm) {
    &__row {
      flex-direction: column;
    }

    &__preview {
      width: calc(100% + 30px);
      margin-right: -15px;
      margin-left: -15px;
    }

    &__button-group {
      bottom: 37px;
      left: calc(50% - 105px);
    }

    &__button {
      min-width: 210px;
      font-size: 13px;
    }

    &__content {
      position: static;
      width: 100%;
      padding-left: 0;
      margin-top: 13px;
    }

    &__title {
      width: 100%;
      height: 60px;
      margin-top: 22px;
      font-size: 16px;
    }

    &__post {
      height: 55px;
      margin-top: 14px;
      font-size: 14px;
      line-height: 18px;
      -webkit-line-clamp: 3;
    }

    &__link {
      margin-top: 15px;
    }
  }
}
</style>
