<template>
  <div class="my-account">
    <div class="my-account__header">Здравствуйте, <b>Александра</b></div>
    <div class="my-account__body">
      <ul class="my-account__list">
        <li class="my-account__item">
          <NuxtLink :to="$i18n.path('account')" class="my-account__link">
            Личные данные
          </NuxtLink>
        </li>
        <li class="my-account__item">
          <NuxtLink :to="$i18n.path('account')" class="my-account__link">
            Бонусная программа
          </NuxtLink>
        </li>
        <li class="my-account__item">
          <NuxtLink :to="$i18n.path('account')" class="my-account__link">
            Избранное
          </NuxtLink>
        </li>
        <li class="my-account__item">
          <NuxtLink :to="$i18n.path('account')" class="my-account__link">
            История заказов
          </NuxtLink>
        </li>
        <li class="my-account__item">
          <span class="my-account__link" @click="logout">Выход</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss">
.my-account {
  &__header {
    padding: 18px 24px;
    font-size: 10px;
    border-bottom: 1px solid $light-1;
  }

  &__body {
    padding-right: 24px;
    padding-bottom: 8px;
    padding-left: 24px;
  }

  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__item {
    line-height: 32px;

    &:not(:last-child) {
      border-bottom: 1px solid $light-1;
    }
  }

  &__link {
    font-size: 12px;

    &:not(a):hover {
      color: $primary;
      cursor: pointer;
    }
  }
}
</style>
