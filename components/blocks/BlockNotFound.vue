<template>
  <div class="not-found">
    <div class="not-found__background">
      <span class="not-found__error">404</span>
      <picture>
        <source
          data-srcset="/img/error-page/background_xxl.webp"
          type="image/webp"
          media="(min-width: 1500px)"
        />
        <source
          data-srcset="/img/error-page/background_xxl.png"
          type="image/png"
          media="(min-width: 1500px)"
        />
        <source
          data-srcset="/img/error-page/background_xl.webp"
          type="image/webp"
          media="(min-width: 1200px)"
        />
        <source
          data-srcset="/img/error-page/background_xl.png"
          type="image/png"
          media="(min-width: 1200px)"
        />
        <source
          data-srcset="/img/error-page/background_lg.webp"
          type="image/webp"
          media="(min-width: 992px)"
        />
        <source
          data-srcset="/img/error-page/background_lg.png"
          type="image/png"
          media="(min-width: 992px)"
        />
        <source
          data-srcset="/img/error-page/background_md.webp"
          type="image/webp"
          media="(min-width: 768px)"
        />
        <source
          data-srcset="/img/error-page/background_md.png"
          type="image/png"
          media="(min-width: 768px)"
        />
        <source
          data-srcset="/img/error-page/background.webp"
          type="image/webp"
        />
        <img
          data-src="/img/error-page/background.png"
          data-object-fit="cover"
          data-object-position="center center"
          alt="hanger"
          class="not-found__image lazyload"
          width="100"
          height="100"
          loading="lazy"
        />
      </picture>
    </div>
    <BContainer class="not-found__container">
      <div class="not-found__title">{{ $t('errorPage.subtitle') }}</div>
      <div class="not-found__description">
        {{ $t('errorPage.description') }}
      </div>
      <BButton class="not-found__link" :to="$i18n.path('')" variant="primary">
        {{ $t('buttons.toTheMain') }}
      </BButton>
    </BContainer>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.not-found {
  overflow: hidden;
  background-color: $primary-light-3;

  &__error {
    display: none;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }

  &__background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 80px);
    padding-bottom: 60px;
  }

  &__title {
    margin-bottom: 9px;
    font-size: 20px;
    font-weight: 500;
    line-height: 25px;
    text-align: center;
  }

  &__description {
    max-width: 270px;
    margin-bottom: 26px;
    font-size: 12px;
    line-height: 15px;
    color: $text-color;
    text-align: center;
  }

  @include media-breakpoint-up(md) {
    &__error {
      position: absolute;
      top: 54%;
      left: 50%;
      display: block;
      font-size: 350px;
      font-weight: 700;
      line-height: 440px;
      color: rgba($color: $white, $alpha: 0.3);
      text-transform: uppercase;
      transform: translate(-50%, -50%);
    }

    &__container {
      min-height: calc(100vh - 90px);
    }

    &__title {
      margin-bottom: 10px;
      font-size: 24px;
      line-height: 30px;
    }

    &__description {
      max-width: 320px;
      margin-bottom: 29px;
      font-size: 14px;
      line-height: 18px;
    }
  }

  @include media-breakpoint-up(lg) {
    &__error {
      top: 56%;
    }
  }

  @include media-breakpoint-up(xl) {
    &__error {
      top: 54%;
      font-size: 400px;
      line-height: 503px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__error {
      top: 51.5%;
      font-size: 500px;
      line-height: 629px;
    }
  }
}
</style>
