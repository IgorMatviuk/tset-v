<template>
  <div>
    <div class="block-container">
      <div class="number">
        <p>{{ content.number }}</p>
      </div>
      <div class="description">
        <p class="line"></p>
        <p>{{ content.description }}</p>
      </div>
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
.block-container {
  display: flex;
  flex-direction: column;
}

.number {
  display: flex;
  justify-content: center;
  width: 45px;
  height: 45px;
  margin-bottom: 20px;
  color: #fff;
  background: #9a0034;
  border-radius: 50%;

  p {
    margin-top: 12px;
    font-family: $font-family-base;
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    line-height: 23px;
  }
}

.line {
  display: flex;
  width: 100%;
  height: 2px;
  background: #c4c4c4;
}

.description {
  display: flex;
  flex-direction: column;
  width: 320px;
  margin-left: 10px;
  font-family: $font-family-base;
  font-size: 13px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
}

@include media-breakpoint-down(sm) {
  .block-container {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }

  .line {
    display: none;
    width: 100%;
    height: 2px;
    background: #c4c4c4;
  }

  .description {
    display: flex;
    flex-direction: column;
    width: 270px;
    margin-left: 15px;
    font-family: $font-family-base;
    font-size: 13px;
    font-style: normal;
    font-weight: normal;
    line-height: 16px;
  }
}
</style>
