<template>
  <div>
    <div>
      <div class="title-block">
        <div class="title">{{ content.title }}</div>
        <div class="pink-line"></div>
      </div>
      <BlockDeliveryItem
        v-for="(item, index) in content.items"
        :key="index"
        :content="item"
      />
    </div>
  </div>
</template>

<script>
import BlockDeliveryItem from './BlockDeliveryItem'

export default {
  components: {
    BlockDeliveryItem
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
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
  margin: 23px 1px 6px 1px;
  background: #d7969e;
}

@include media-breakpoint-up(xs) {
  .title-block {
    margin-left: 20px;
  }
}
</style>
