<template>
  <div class="bonuses-table">
    <BContainer>
      <div class="bonuses-table__content">
        <BTable :fields="fields" :items="items" />
      </div>
    </BContainer>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      fields: [
        { key: 'amount', label: this.$t('bonusesTable.amountTitle') },
        { key: 'percent', label: this.$t('bonusesTable.percentTitle') }
      ]
    }
  }
}
</script>

<style lang="scss">
.bonuses-table {
  margin-bottom: 39px;

  &__content {
    padding-left: 17px;
  }

  table th,
  table td {
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    vertical-align: middle;
    border: none;
    border-bottom: 1px solid $gray;
  }

  table th {
    padding-top: 8px;
    padding-bottom: 13px;
  }

  table td {
    padding: 18px 0;
  }

  table tr td:first-of-type {
    width: 60%;
    color: $text-color;
  }

  table tr td:last-of-type {
    font-weight: 700;
  }

  @include media-breakpoint-up(md) {
    &__content {
      max-width: 405px;
      padding-left: 0;
    }

    table tr td:first-of-type {
      width: 65%;
    }
  }

  @include media-breakpoint-up(lg) {
    &__content {
      max-width: 425px;
      margin-left: 80px;
    }
  }

  @include media-breakpoint-up(xl) {
    margin-bottom: 57px;

    &__content {
      max-width: 515px;
      margin-left: 100px;
    }

    table tr td:first-of-type {
      width: 70%;
    }

    table th,
    table td {
      font-size: 13px;
      line-height: 16px;
    }
  }

  @include media-breakpoint-up(xxl) {
    &__content {
      max-width: 480px;
      margin-left: 118px;
    }

    table tr td:last-of-type {
      font-size: 14px;
      line-height: 18px;
    }

    table td {
      padding: 17px 0;
    }
  }
}
</style>
