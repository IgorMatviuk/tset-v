<template>
  <div class="float-panel">
    <div class="float-panel__content">
      <div class="float-panel__header">
        <button
          class="float-panel__close"
          type="button"
          @click="toggleFloatPanel(false)"
        >
          <svg-icon
            name="close"
            class="float-panel__icon"
            width="13"
            height="13"
          />
        </button>
        <div class="float-panel__name">{{ $t('floatPanel.title') }}</div>
      </div>
      <div class="float-panel__table">
        <BTable :fields="fields" :items="content.items" :fixed="true" />
      </div>
      <div class="float-panel__title">{{ $t('floatPanel.sizeTitle') }}</div>
      <div class="float-panel__description">
        <div class="float-panel__model">
          <picture>
            <source
              data-srcset="/img/size-table/model_xl.webp"
              srcset="/img/stub.png"
              media="(min-width: 1200px)"
              type="image/webp"
            />
            <source
              data-srcset="/img/size-table/model_xl.png"
              srcset="/img/stub.png"
              media="(min-width: 1200px)"
            />
            <source
              data-srcset="/img/size-table/model.webp"
              srcset="/img/stub.png"
              type="image/webp"
            />
            <img
              data-src="/img/size-table/model.png"
              alt="size table model"
              title="size table model"
              width="100"
              height="100"
              src="/img/stub.png"
              class="float-panel__image lazyload"
              loading="lazy"
            />
          </picture>
        </div>
        <ul class="float-panel__list">
          <li class="float-panel__list-item">
            <span class="float-panel__number">1</span>
            <span
              class="float-panel__info"
              v-html="$t('floatPanel.chestGirth')"
            ></span>
          </li>
          <li class="float-panel__list-item">
            <span class="float-panel__number">2</span>
            <span
              class="float-panel__info"
              v-html="$t('floatPanel.waistCircumference')"
            ></span>
          </li>
          <li class="float-panel__list-item">
            <span class="float-panel__number">3</span>
            <span
              class="float-panel__info"
              v-html="$t('floatPanel.hipGirth')"
            ></span>
          </li>
          <li class="float-panel__list-item">
            <span class="float-panel__number">4</span>
            <span
              class="float-panel__info"
              v-html="$t('floatPanel.lengthProduct')"
            ></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: {
        items: [
          {
            eu: 'XS',
            uk: '40 - 42',
            chest: '76 - 85',
            waist: '58 - 64',
            hips: '84 - 90'
          },
          {
            eu: 'S',
            uk: '42 - 44',
            chest: '86 - 92',
            waist: '65 - 72',
            hips: '91 - 97'
          },
          {
            eu: 'M',
            uk: '46 - 48',
            chest: '93 - 99',
            waist: '73 - 82',
            hips: '98 - 103'
          },
          {
            eu: 'L',
            uk: '48 - 50',
            chest: '100 - 108',
            waist: '83 - 90',
            hips: '104 - 110'
          },
          {
            eu: 'XL',
            uk: '50 - 52',
            chest: '109 - 115',
            waist: '91 - 102',
            hips: '111 - 118'
          }
        ]
      },
      fields: [
        { key: 'eu', label: this.$t('floatPanel.tHead.eu') },
        { key: 'uk', label: this.$t('floatPanel.tHead.uk') },
        { key: 'chest', label: this.$t('floatPanel.tHead.chest') },
        { key: 'waist', label: this.$t('floatPanel.tHead.waist') },
        { key: 'hips', label: this.$t('floatPanel.tHead.hips') }
      ]
    }
  },
  mounted() {
    document.addEventListener('mouseup', this.onOutSideClick)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.onOutSideClick)
  },
  methods: {
    onOutSideClick({ target }) {
      const trigger = target.closest('.float-panel')

      /* istanbul ignore else */
      if (!trigger) {
        this.toggleFloatPanel(false)
      }
    },
    toggleFloatPanel(status) {
      this.$bus.$emit('float-panel:toggle', status)
    }
  }
}
</script>

<style lang="scss">
.float-panel {
  position: fixed;
  top: 50px;
  right: 0;
  bottom: env(safe-area-inset-bottom);
  left: 0;
  z-index: -1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: $white;
  box-shadow: 10px 10px 30px rgba($color: $black, $alpha: 0.15);

  &__header {
    display: flex;
    align-items: center;
    padding-top: 6px;
    padding-right: 15px;
    padding-bottom: 8px;
    padding-left: 10px;
    background-color: $white;
    border-bottom: 2px solid $light-1;
  }

  &__close {
    @include reset-button-styles();

    width: 30px;
    height: 30px;
    margin-right: 3px;
    text-align: center;
    vertical-align: middle;
  }

  &__name {
    margin-top: 5px;
    font-size: 10px;
    font-weight: 500;
    color: $black;
    text-transform: uppercase;
  }

  &__icon {
    width: 13px;
    height: 13px;
    margin-right: 8px;
  }

  &__table {
    padding-right: 15px;
    padding-left: 15px;
    margin-top: 22px;

    tbody tr:last-of-type {
      border-bottom: 1px solid $light-3;
    }

    th {
      padding-bottom: 16px;
      font-size: 11px;
      font-weight: 500;
      line-height: 14px;
      color: $black;
      border-top: none;
    }

    td {
      font-size: 11px;
      font-weight: 300;
      line-height: 32px;
      color: $black;
    }
  }

  &__title {
    padding-right: 15px;
    padding-bottom: 14px;
    padding-left: 15px;
    margin-top: 39px;
    font-size: 10px;
    font-weight: 300;
    line-height: 13px;
    color: $input-color;
    text-transform: uppercase;
    border-bottom: 2px solid $light-1;
  }

  &__description {
    display: flex;
    padding-right: 15px;
    padding-bottom: 25px;
    padding-left: 15px;
  }

  &__list {
    @include list-unstyled();

    padding-top: 26px;
  }

  &__list-item {
    display: flex;

    &:not(:last-of-type) {
      margin-bottom: 12px;
    }
  }

  &__number {
    display: flex;
    flex: 0 0 20px;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: 7px;
    font-size: 10px;
    line-height: 13px;
    color: $primary;
    background-color: $primary-light-3;
    border-radius: 50%;
  }

  &__info {
    padding-top: 3px;
    font-size: 11px;
    line-height: 14px;
    color: $text-color;

    b {
      font-weight: 500;
      color: $black;
    }
  }

  &__model {
    flex: 0 0 115px;
    flex-shrink: 0;
    max-width: 115px;
    padding-top: 9px;
    margin-right: 12px;
  }

  &__image {
    width: auto;
    max-width: 115px;
    height: auto;
    max-height: 307px;
  }

  @media only screen and (min-width: 455px) and (max-width: 767.98px) {
    &__header,
    &__table,
    &__title,
    &__desc {
      padding-right: 13.7%;
      padding-left: 13.7%;
    }

    &__header {
      padding-left: calc(13.7% - 5px);
    }
  }

  @include media-breakpoint-up(md) {
    position: absolute;
    top: 100%;
    left: 46%;
    z-index: -1;
    height: calc(100vh - 50px);

    &__name {
      margin-top: 3px;
      font-size: 11px;
    }

    &__table {
      padding-right: 38px;
      padding-left: 44px;

      th,
      td {
        font-size: 11px;
        text-align: center;
      }
    }

    &__title {
      padding-right: 9%;
      padding-left: 43px;
      margin-top: 39px;
      font-size: 11px;
    }

    &__description {
      padding-right: 38px;
      padding-left: 44px;
    }

    &__model {
      padding-top: 14px;
      margin-right: 20px;
    }

    &__list {
      padding-top: 29px;
    }
  }

  @include media-breakpoint-up(lg) {
    left: 57.53%;
  }

  @include media-breakpoint-up(xl) {
    left: 48.8%;

    &__content {
      position: relative;
    }

    &__name {
      font-size: 12px;
    }

    &__table {
      max-width: 604px;
      padding-left: 177px;
      margin-top: 20px;

      th,
      td {
        font-size: 12px;
      }
    }

    &__title {
      padding-right: 26%;
      padding-left: 0;
      margin-left: 175px;
      font-size: 12px;
      line-height: 15px;
    }

    &__description {
      padding-left: 0;
      margin-left: 175px;
    }

    &__model {
      position: absolute;
      top: 74px;
      left: 22px;
      padding-top: 0;
      margin-right: 0;
    }

    &__image {
      max-width: 135px;
      max-height: 476px;
    }

    &__list {
      max-width: 390px;
      padding-top: 21px;
    }

    &__list-item {
      &:not(:last-of-type) {
        margin-bottom: 11px;
      }
    }

    &__number {
      margin-right: 12px;
    }

    &__info {
      font-size: 12px;
      line-height: 15px;
    }
  }

  @include media-breakpoint-up(xxl) {
    left: 53.62%;

    &__header {
      padding-left: 18px;
    }

    &__title {
      padding-right: 39%;
      margin-left: 180px;
    }

    &__description {
      margin-left: 180px;
    }
  }
}
</style>
