<template>
  <div>
    <div>
      <div class="title-block">
        <div class="title">{{ content.title }}</div>
        <div class="pink-line"></div>
      </div>
      <BlockPaymentItem
        class="payment-list"
        :class="{ abroad: location == 'abroad' }"
        v-for="(item, index) in content.items"
        :key="index"
        :content="item"
      />
    </div>
  </div>
</template>

<script>
import BlockPaymentItem from './BlockPaymentItem'

export default {
  components: {
    BlockPaymentItem
  },
  props: {
    content: {
      type: Object,
      required: true
    },
    location: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss">
.payment-list {
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    margin-top: 20px;
    color: #fff;
    background-color: #9a0034;
    border-radius: 50%;
  }

  &.abroad {
    a {
      display: flex;
      align-items: center;
      width: 45px;
      height: 45px;
      color: #9a0034;
      background: rgba(242, 230, 230, 0.2);
      border: 1px;
      border-color: #9a0034;
      border-style: solid;
      border-radius: 50%;
    }
  }
}

.title {
  margin-top: 40px;
  font-family: $font-family-base;
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 23px;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pink-line {
  width: 110px;
  height: 1px;
  margin: 23px 1px 6px -20px;
  background: #d7969e;
}

@include media-breakpoint-up(xs) {
  .title-block {
    margin-left: 20px;
  }
}

//@include media-breakpoint-up(sm) {
//
//}
//
//@include media-breakpoint-up(md) {
//
//}
//
//@include media-breakpoint-up(lg) {
//
//}
//
//@include media-breakpoint-up(xl) {
//
//}
//
//@include media-breakpoint-up(xxl) {
//
//}
</style>
