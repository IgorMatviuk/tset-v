<template>
  <div class="no-search-result">
    <BContainer>
      <SearchBox
        :with-label="true"
        :initial-value="query"
        class="no-search-result__box"
      />
      <div class="no-search-result__wrapper">
        <svg-icon
          name="dress"
          class="no-search-result__icon"
          width="107"
          height="107"
        />
        <div class="no-search-result__title">
          {{ $t('searchPage.notFoundTitle') }}
        </div>
        <div class="no-search-result__description">
          {{ $t('searchPage.notFoundDescription') }}
        </div>
        <BButton
          variant="primary"
          :to="backToShoppingLink"
          class="no-search-result__to-catalog"
        >
          {{ $t('buttons.catalog') }}
        </BButton>
      </div>
    </BContainer>
  </div>
</template>

<script>
import SearchBox from '@/components/functional/SearchBox'

export default {
  components: {
    SearchBox
  },
  props: {
    query: {
      type: String,
      required: true
    }
  },
  computed: {
    backToShoppingLink() {
      return this.$i18n.path(this.$store.getters['catalog/defaultCategorySlug'])
    }
  }
}
</script>

<style lang="scss">
.no-search-result {
  min-height: calc(100vh - 430px);
  padding-top: 8px;
  padding-bottom: 50px;

  &__box {
    max-width: 690px;
    margin-right: auto;
    margin-left: auto;

    .search-box {
      &__label {
        display: block;
        margin-bottom: 20px;
        font-size: 16px;
        text-align: center;
      }
    }
  }

  &__wrapper {
    padding-top: 57px;
    text-align: center;
  }

  &__icon {
    width: 107px;
    height: 107px;
    margin-bottom: 24px;
    color: $primary-light-5;
  }

  &__title {
    max-width: 535px;
    margin-right: auto;
    margin-bottom: 18px;
    margin-left: auto;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.02em;
  }

  &__description {
    max-width: 535px;
    margin-right: auto;
    margin-bottom: 31px;
    margin-left: auto;
    font-size: 13px;
    line-height: 16px;
    color: $gray-dark-2;
  }

  @include media-breakpoint-down(xl) {
    &__box {
      max-width: 570px;
    }

    &__wrapper {
      padding-top: 50px;
    }

    &__icon {
      width: 90px;
      height: 90px;
      margin-bottom: 22px;
    }

    &__description {
      margin-bottom: 25px;
    }
  }

  @include media-breakpoint-down(lg) {
    min-height: calc(100vh - 480px);

    &__box {
      max-width: 450px;

      .search-box {
        &__label {
          margin-bottom: 15px;
        }
      }
    }

    &__wrapper {
      padding-top: 40px;
    }

    &__icon {
      width: 80px;
      height: 80px;
      margin-bottom: 20px;
    }

    &__title {
      max-width: 450px;
      margin-bottom: 10px;
      font-size: 14px;
      line-height: 18px;
    }

    &__description {
      max-width: 450px;
      margin-bottom: 20px;
      font-size: 12px;
      line-height: 15px;
    }
  }

  @include media-breakpoint-down(md) {
    min-height: calc(100vh - 590px);

    &__box {
      .search-box {
        &__lable {
          margin-bottom: 18px;
        }
      }
    }

    &__wrapper {
      padding-top: 38px;
    }

    &__icon {
      display: none;
    }

    &__title {
      margin-bottom: 10px;
    }

    &__descriptions {
      margin-bottom: 20px;
    }
  }

  @include media-breakpoint-down(xs) {
    min-height: calc(100vh - 510px);
    padding-top: 25px;
    padding-bottom: 70px;

    &__box {
      max-width: 310px;

      .search-box {
        &__label {
          margin-bottom: 19px;
        }
      }
    }

    &__wrapper {
      padding-top: 40px;
    }

    &__title {
      margin-bottom: 15px;
    }

    &__description {
      margin-bottom: 25px;
    }
  }
}
</style>
