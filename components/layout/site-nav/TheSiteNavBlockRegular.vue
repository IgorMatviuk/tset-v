<template>
  <div class="nav-block-regular">
    <BContainer class="nav-block-regular__container">
      <div class="nav-block-regular__list-wrapper">
        <ul
          v-for="(column, index) in desktopMenu.columns"
          :key="index"
          class="nav-block-regular__list"
        >
          <template v-if="column.items">
            <li
              v-if="column.name"
              class="nav-block-regular__item nav-block-regular__item--parent"
            >
              <span class="nav-block-regular__link">{{ column.name }}</span>
            </li>
            <li
              v-for="item in column.items"
              :key="item.id"
              :class="getItemClassName(column.name)"
              class="nav-block-regular__item"
            >
              <NuxtLink
                :to="$i18n.path(item.slug)"
                active-class="nav-block-regular__link--active"
                class="nav-block-regular__link"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </template>
          <template v-else>
            <li
              class="nav-block-regular__item nav-block-regular__item--only-child nav-block-regular__item--child"
            >
              <NuxtLink
                :to="$i18n.path(column.slug)"
                active-class="nav-block-regular__link--active"
                class="nav-block-regular__link"
              >
                {{ column.name }}
              </NuxtLink>
            </li>
          </template>
        </ul>
      </div>
      <SearchBox with-label class="nav-block-regular__search-box" />
      <div class="nav-block-regular__social-networks-wrapper">
        <SocialNetworks />
      </div>
    </BContainer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SearchBox from '@/components/functional/SearchBox'
import SocialNetworks from '@/components/shared/SocialNetworks'

export default {
  components: {
    SearchBox,
    SocialNetworks
  },
  computed: {
    ...mapGetters(['desktopMenu'])
  },
  methods: {
    getItemClassName(columnName) {
      return columnName
        ? 'nav-block-regular__item--child'
        : 'nav-block-regular__item--parent'
    }
  }
}
</script>

<style lang="scss">
.nav-block-regular {
  &__container {
    display: flex;
  }

  &__list-wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__list {
    width: 220px;
    padding: 0;
    margin: 0;
    list-style: none;

    &:first-child {
      width: 135px;
    }

    &:not(:first-child) {
      padding-top: 2px;
    }
  }

  &__item--parent {
    font-size: 13px;
    text-transform: uppercase;

    &:not(:only-child) {
      margin-bottom: 12px;
    }
  }

  &__item--parent &__link {
    &:not(:hover) {
      color: $body-color;
    }
  }

  &__item--child &__link {
    font-size: 13px;
    line-height: 34px;
  }

  &__item--only-child &__link {
    font-size: 14px;
    line-height: normal;
    text-transform: uppercase;
  }

  &__link {
    &:hover {
      text-decoration: none;
    }

    &:not(:hover) {
      color: $text-color;
    }

    &--active:not(:hover) {
      color: $primary;
    }
  }

  &__search-box {
    width: 470px;
  }

  &__social-networks-wrapper {
    padding-top: 30px;
    padding-left: 55px;
  }
}
</style>
