<template>
  <div class="content-text">
    <div>
      <p>{{ content.text0 }}</p>
    </div>
    <div>
      <p>{{ content.text1 }}</p>
    </div>
    <div>
      <p>{{ content.text2 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.content-text {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  font-family: $font-family-base;
  font-size: 13px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  color: #565656;
}
</style>
