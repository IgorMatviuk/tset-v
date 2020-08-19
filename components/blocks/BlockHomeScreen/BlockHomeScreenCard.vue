<template>
  <NuxtLink :to="$i18n.path('about')" class="home-screen__card">
    <picture>
      <source
        data-srcset="/img/home-screen/thumbnail.webp"
        srcset="/img/stub.png"
        type="image/webp"
      />
      <img
        data-src="/img/home-screen/thumbnail.jpg"
        src="/img/stub.png"
        alt="Мы не просто бренд!"
        class="home-screen__card-img lazyload"
        data-object-fit="cover"
        loading="lazy"
      />
    </picture>
    <div>
      <div class="home-screen__card-title">
        {{ $t('homeScreen.card.title') }}
      </div>
      <div class="home-screen__card-subtitle">
        <span>
          {{ $t('homeScreen.card.description') }}
        </span>
        <svg-icon
          name="arrow"
          class="home-screen__arrow home-screen__card-arrow"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {}
</script>

<style lang="scss">
.home-screen {
  &__card {
    position: absolute;
    left: 15px;
    z-index: 1;
    display: flex;
    width: calc(100% - 30px);
    padding: 24px;
    background: $white;
    border-radius: 2px;
    box-shadow: 10px 10px 10px rgba(104, 100, 100, 0.07);
    opacity: 0;

    &:hover {
      color: $body-color;
      text-decoration: none;
    }

    &:hover &-arrow {
      color: $primary;
    }

    &-title,
    &-subtitle {
      color: $body-color;
    }

    &-title {
      font-size: 14px;
      font-weight: bold;
      line-height: 24px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    &-subtitle {
      font-size: 12px;
      font-weight: 300;
    }

    &-img {
      width: 46px;
      height: 46px;
      margin-right: 24px;
      border-radius: 2px;
      object-fit: cover;
    }

    &-arrow {
      color: #dedcdc;
      transition: color 0.3s;
    }

    @include media-breakpoint-down(sm) {
      position: absolute;
      bottom: 30px;

      &-title {
        margin-bottom: 2px;
        line-height: 18px;
      }

      &-subtitle {
        line-height: 15px;

        span {
          display: block;
          max-width: 144px;
        }

        svg {
          position: absolute;
          right: 24px;
          bottom: 28px;
        }
      }
    }

    @include media-breakpoint-up(md) {
      bottom: 70px;
      left: 50px;
      width: 410px;
      padding: 32px;
      font-size: 19px;

      &-img {
        width: 65px;
        height: 65px;
        margin-right: 34px;
      }

      &-subtitle {
        span {
          display: block;
          margin-bottom: 4px;
        }
      }
    }

    @include media-breakpoint-up(lg) {
      bottom: 50px;
      left: 50%;
    }

    @include media-breakpoint-only(xl) {
      transform: translate(0, 0);
    }

    @include media-breakpoint-up(xl) {
      margin-top: 110px;
    }

    @include media-breakpoint-up(xxl) {
      bottom: 10%;
      left: 602px;
      margin-top: 200px;
      margin-bottom: 0;
      transform: unset;
    }
  }
}
</style>
