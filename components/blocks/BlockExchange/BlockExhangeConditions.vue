<template>
  <div class="container-block-exchange">
    <div class="title-block">
      <div class="title">{{ content.title }}</div>
      <div class="pink-line"></div>
      <div class="subtitle">
        <p>{{ content.subtitle }}</p>
      </div>
    </div>
    <div class="flex-item">
      <BlockExhangeConditionsItem
        v-for="(item, index) in content.items"
        :key="index"
        :content="item"
      />
    </div>
  </div>
</template>

<script>
import BlockExhangeConditionsItem from '@/components/blocks/BlockExchange/BlockExhangeConditionsItem.vue'

export default {
  components: {
    BlockExhangeConditionsItem
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
.container-block-exchange {
  display: flex;
  flex-direction: column;
}

.flex-item {
  display: flex;
  justify-content: space-between;
}

.title {
  display: flex;
  align-items: center;
  margin-top: 30px;
  font-family: $font-family-base;
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 60px;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pink-line {
  display: flex;
  width: 110px;
  height: 1px;
  margin: 1px 1px 30px -30px;
  background-color: #d7969e;
}

.subtitle {
  display: flex;
  margin-top: -10px;
  margin-bottom: 10px;
  font-family: $font-family-base;
  font-size: 13px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  color: #565656;
}

@include media-breakpoint-down(sm) {
  .container-block-exchange {
    display: flex;
    flex-direction: column;
  }

  .flex-item {
    display: flex;
    flex-direction: column;
  }
}
</style>
