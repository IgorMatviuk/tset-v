<template>
  <div>
    <BContainer>
      <div class="privacy-policy">
        <h1 class="privacy-policy__title">{{ $t('pages.privacyPolicy') }}</h1>
        <hr class="privacy-policy__line" />
        <div v-html="$t('privacyPolicyPage')"></div>
      </div>
    </BContainer>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.privacy-policy {
  padding-top: 52px;
  padding-bottom: 74px;

  h1 {
    font-size: 23px;
    line-height: 29px;
    color: $black;
    text-align: center;
    text-transform: uppercase;
  }

  h2 {
    margin-bottom: 12px;
    font-size: 11px;
    font-weight: 500;
    line-height: 14px;
    text-transform: uppercase;
  }

  h3 {
    margin-bottom: 13px;
    font-size: 11px;
    font-weight: 500;
    line-height: 14px;
  }

  p {
    font-size: 11px;
    line-height: 14px;
    color: $text-color;
  }

  &__line {
    margin: 17px 0;
    border-color: $primary-light-2;
  }

  @include media-breakpoint-up(md) {
    padding-top: 57px;
    padding-bottom: 98px;

    h1 {
      font-size: 30px;
      line-height: 38px;
    }

    &__line {
      margin-bottom: 23px;
    }

    h2 {
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 15px;
    }

    h3 {
      font-size: 12px;
      line-height: 15px;
    }

    p {
      font-size: 12px;
      line-height: 15px;
    }
  }

  @include media-breakpoint-up(lg) {
    padding-bottom: 101px;

    @include make-col(10);
    @include make-col-offset(1);
  }

  @include media-breakpoint-up(xl) {
    padding-top: 54px;
    padding-bottom: 83px;

    h1 {
      font-size: 35px;
      line-height: 44px;
    }

    &__line {
      margin-bottom: 7px;
    }

    h2,
    h3,
    p {
      font-size: 14px;
      line-height: 18px;
    }

    h2 {
      padding-top: 16px;
    }

    h3 {
      margin-bottom: 10px;
    }
  }

  @include media-breakpoint-up(xxl) {
    padding-bottom: 100px;

    &__line {
      margin-bottom: 0;
    }

    h2 {
      padding-top: 22px;
    }
  }
}
</style>
