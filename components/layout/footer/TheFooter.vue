<template>
  <footer class="footer">
    <BContainer>
      <div class="footer__row">
        <TheFooterLeft />
        <TheFooterList
          v-for="(column, index) in columns"
          :key="index"
          :column="column"
        />
        <TheFooterContacts />
        <div class="footer__newsletter">
          <TheFooterNewsletter />
        </div>
        <div class="footer__payment">
          <TheFooterPayment />
        </div>
      </div>
      <TheFooterCopyright />
    </BContainer>
  </footer>
</template>

<script>
import TheFooterLeft from './TheFooterLeft'
import TheFooterList from './TheFooterList'
import TheFooterContacts from './TheFooterContacts'
import TheFooterNewsletter from './TheFooterNewsletter'
import TheFooterPayment from './TheFooterPayment'
import TheFooterCopyright from './TheFooterCopyright'

export default {
  components: {
    TheFooterLeft,
    TheFooterList,
    TheFooterContacts,
    TheFooterNewsletter,
    TheFooterPayment,
    TheFooterCopyright
  },
  computed: {
    columns() {
      return this.$store.getters.footerMenu.columns
    }
  }
}
</script>

<style lang="scss">
.footer {
  padding-top: 58px;
  padding-bottom: 14px;
  background-color: $light-2;

  &__row {
    @include make-row();

    position: relative;
  }

  &__logo {
    @include make-col(2);
    @include make-col-ready();

    margin-top: -2px;
  }

  &__social {
    margin-top: 43px;
  }

  &__list {
    @include list-unstyled();

    margin-bottom: 0;

    &--schedule {
      margin-top: 25px;
    }
  }

  &__list-title {
    @include reset-button-styles();

    @include hover() {
      cursor: default;
    }

    display: block;
    margin-bottom: 18px;
    font-size: 12px;
    font-weight: 300;
    line-height: 1.25;
    text-transform: uppercase;
  }

  &__list-item {
    font-size: 12px;
    line-height: 25px;
    letter-spacing: 0.05em;
  }

  &__schedule-title {
    letter-spacing: initial;
  }

  &__link {
    display: inline-block;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;

    &--active {
      color: $primary;
    }
  }

  &__pages,
  &__contacts {
    @include make-col(2);
    @include make-col-ready();
  }

  &__newsletter {
    @include make-col(3);
    @include make-col-ready();

    padding-top: 1px;
    padding-left: 89px;
    margin-left: auto;
  }

  &__payment {
    @include make-col(3);
    @include make-col-ready();

    position: absolute;
    top: 112px;
    right: 0;
    padding-left: 89px;
  }

  &__copyright {
    padding-left: 4px;
    margin-top: 62px;
  }

  &__collapse-icon {
    display: none;
    width: 10px;
    height: 10px;
  }

  @include media-breakpoint-down(xl) {
    padding-bottom: 15px;

    &__logo {
      padding-left: 18px;
    }

    &__newsletter,
    &__payment {
      padding-left: 29px;
    }
  }

  @include media-breakpoint-down(lg) {
    padding-top: 39px;
    padding-bottom: 14px;

    &__logo {
      @include make-col(3);

      padding-left: 17px;
    }

    &__pages {
      flex: 0 0 21.8%;
      max-width: 21.8%;
      padding-top: 2px;
    }

    &__contacts {
      @include make-col(5);
      @include make-col-offset(3);

      order: 1;
      padding-right: 0;
      margin-top: 35px;
    }

    &__contacts-row {
      display: flex;
      justify-content: space-between;
    }

    &__newsletter,
    &__payment {
      flex: 0 0 28.1%;
      max-width: 28.1%;
      padding-top: 0;
      padding-right: 0;
      padding-left: 0;
    }

    &__payment {
      top: 110px;
    }

    &__list {
      &--contacts,
      &--schedule {
        @include make-col(6);

        margin-top: 0;
      }

      &--schedule {
        padding-left: 18px;
      }
    }

    &__list-title {
      margin-bottom: 17px;
    }

    &__copyright {
      padding-left: 1px;
      margin-top: 14px;
    }
  }

  @include media-breakpoint-down(md) {
    &__logo {
      flex: 0 0 29.2%;
      max-width: 29.2%;
    }

    &__social {
      margin-top: 23px;
    }

    &__pages {
      flex: 0 0 29.1%;
      max-width: 29.1%;
    }

    &__contacts {
      @include make-col(7);
      @include make-col-ready();
      @include make-col-offset(0);

      flex-direction: row-reverse;
      order: 0;
    }

    &__list {
      &--contacts,
      &--schedule {
        flex: 0 0 50%;
        max-width: 50%;
      }

      &--schedule {
        padding-left: 0;
      }

      &--contacts {
        order: 1;
        padding-left: 15px;
      }
    }

    &__list-title {
      &--contacts {
        width: 50%;
        padding-left: 15px;
        margin-left: auto;
        text-align: left;
      }
    }

    &__newsletter {
      @include make-col(5);
      @include make-col-ready();

      margin-top: 35px;
    }

    &__payment {
      @include make-col(5);
      @include make-col-ready();

      position: static;
      order: 1;
      margin-top: 29px;
      margin-left: auto;
    }

    &__copyright {
      margin-top: 55px;
    }
  }

  @include media-breakpoint-down(sm) {
    padding-top: 35px;
    padding-bottom: 10px;

    &__row {
      justify-content: center;
    }

    &__logo,
    &__newsletter {
      @include make-col(12);
      @include make-col-ready();

      display: flex;
      flex-direction: column;
      align-items: center;
      order: -2;
    }

    &__social {
      margin-top: 15px;
    }

    &__newsletter {
      order: -1;
      margin-top: 33px;
      margin-bottom: 29px;
    }

    &__pages,
    &__contacts {
      @include make-col(12);
      @include make-col-ready();
    }

    &__contacts {
      margin-top: 2px;
    }

    &__contacts-row {
      display: block;
    }

    &__payment {
      @include make-col(12);
      @include make-col-ready();

      position: static;
      margin-top: 20px;
    }

    &__list-title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;
      padding-bottom: 9px;
      padding-left: 9px;
      margin-right: auto;
      margin-bottom: 0;
      margin-left: auto;
    }

    &__list-title--active &__collapse-icon {
      transform: rotate(180deg);
    }

    &__collapse-icon {
      display: block;
      margin-bottom: 2px;
      margin-left: 3px;
      transition: transform 0.3s;
    }

    &__list {
      padding-bottom: 15px;

      &--contacts,
      &--schedule {
        min-width: 100%;
        padding: 0;
      }

      &--schedule {
        margin-top: 15px;
      }
    }

    &__list-item {
      text-align: center;
    }

    &__copyright {
      margin-top: 23px;
    }
  }
}
</style>
