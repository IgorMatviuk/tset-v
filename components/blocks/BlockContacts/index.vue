<template>
  <div class="contacts">
    <div class="contacts__background-wrapper">
      <div class="contacts__color-background"></div>
      <picture>
        <source
          data-srcset="/img/contacts-page/contacts_background__xxl.webp"
          srcset="/img/stub.png"
          type="image/webp"
          media="(min-width: 1500px)"
        />
        <source
          data-srcset="/img/contacts-page/contacts_background__xxl.jpg"
          srcset="/img/stub.png"
          type="image/jpeg"
          media="(min-width: 1500px)"
        />
        <source
          data-srcset="/img/contacts-page/contacts_background__xl.webp"
          srcset="/img/stub.png"
          type="image/webp"
          media="(min-width: 1200px)"
        />
        <source
          data-srcset="/img/contacts-page/contacts_background__xl.jpg"
          srcset="/img/stub.png"
          type="image/jpeg"
          media="(min-width: 1200px)"
        />
        <source
          data-srcset="/img/contacts-page/contacts_background__md.webp"
          srcset="/img/stub.png"
          type="image/webp"
          media="(min-width: 768px)"
        />
        <source
          data-srcset="/img/contacts-page/contacts_background__md.jpg"
          srcset="/img/stub.png"
          type="image/jpeg"
          media="(min-width: 768px)"
        />
        <img
          data-src=""
          data-object-fit="cover"
          data-object-position="top"
          src="/img/stub.png"
          alt="contacts page bockground"
          class="contacts__background-image lazyload"
          width="100"
          height="100"
          loading="lazy"
        />
      </picture>
    </div>
    <BContainer class="contacts__container">
      <div class="contacts__info-background"></div>
      <h1 class="contacts__title">{{ $t('contacts.titles.main') }}</h1>
      <BlockContactsList class="contacts__list" />
      <BlockContactsForm class="contacts__form" />
    </BContainer>
  </div>
</template>

<script>
import BlockContactsList from './BlockContactsList'
import BlockContactsForm from './BlockContactsForm'

export default {
  components: {
    BlockContactsList,
    BlockContactsForm
  }
}
</script>

<style lang="scss">
.contacts {
  padding-top: 56px;
  padding-bottom: 61px;
  overflow: hidden;

  &__background-wrapper {
    display: none;
  }

  &__title {
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__list {
    margin-bottom: 44px;
  }

  @include media-breakpoint-up(md) {
    position: relative;
    display: flex;
    min-height: calc(100vh - 550px);
    padding-top: 103px;
    padding-bottom: 0;

    &__container {
      position: relative;
      padding-top: 26px;
      padding-bottom: 34px;
    }

    &__background-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
    }

    &__background-image {
      width: 100%;
      max-width: 560px;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }

    &__color-background {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 42.5%;
      background-color: $gray-light-3;
    }

    &__info-background {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin-right: -50vw;
      margin-left: 27.05%;
      background-color: $white;
    }

    &__title,
    &__form {
      position: relative;
      margin-left: 29.1%;
    }

    &__list {
      position: relative;
      margin-bottom: 25px;
      margin-left: 27%;
    }

    &__title {
      margin-bottom: 25px;
    }
  }

  @include media-breakpoint-up(lg) {
    min-height: calc(100vh - 440px);
    padding-top: 97px;

    &__info-background {
      margin-left: 34.9%;
    }

    &__title,
    &__form {
      margin-left: 37.7%;
    }

    &__list {
      margin-left: 36.1%;
    }
  }

  @include media-breakpoint-up(xl) {
    min-height: calc(100vh - 390px);
    padding-top: 140px;

    &__color-background {
      left: 49%;
    }

    &__background-image {
      max-width: 49%;
    }

    &__container {
      padding-top: 30px;
      padding-bottom: 38px;
    }

    &__info-background {
      margin-left: 42.9%;
    }

    &__title,
    &__form {
      margin-left: 45.7%;
    }

    &__title {
      margin-bottom: 39px;
    }

    &__list {
      margin-bottom: 36px;
      margin-left: 44.45%;
    }
  }

  @include media-breakpoint-up(xxl) {
    padding-top: 173px;

    &__color-background {
      left: 49.22%;
    }

    &__background-image {
      max-width: 49.22%;
    }

    &__container {
      padding-top: 40px;
      padding-bottom: 78px;
    }

    &__info-background {
      margin-left: 48.4%;
    }

    &__title {
      margin-bottom: 27px;
    }

    &__title,
    &__form {
      margin-left: 51.2%;
    }

    &__list {
      margin-bottom: 46px;
      margin-left: 50.2%;
    }
  }
}
</style>
