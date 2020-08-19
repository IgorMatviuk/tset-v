<template>
  <div>
    <div class="block-container">
      <div class="block-ways-delivery">
        <div>
          <a>
            {{ content.logo }}
          </a>
        </div>
        <div class="block-ways-delivery-container-text">
          <div class="block-ways-delivery-title">
            {{ content.title }}
          </div>
          <div class="block-ways-delivery-text">
            {{ content.description }}
          </div>
          <div class="block-ways-delivery-subtext">{{ content.subtext }}</div>
        </div>
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
}

.block-ways-delivery {
  display: flex;
  padding: 20px 1px 8px 1px;
}

.block-ways-delivery-container-text {
  display: flex;
  flex-direction: column;
  margin: 1px 1px 1px 1px;
}

.block-ways-delivery-title {
  display: flex;
  padding-top: 20px;
  font-family: $font-family-base;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.05em;
}

.block-ways-delivery-text {
  display: flex;
  padding-top: 20px;
  font-family: $font-family-base;
  font-size: 12px;
  font-style: normal;
  font-weight: normal;
  line-height: 15px;
  color: $text-color;
}

.block-ways-delivery-subtext {
  padding-top: 20px;
  font-family: $font-family-base;
  font-size: 11px;
  font-style: normal;
  font-weight: normal;
  line-height: 14px;
  color: #a8a8a8;
}

@include media-breakpoint-up(xs) {
  .block-container {
    display: flex;
  }

  .block-ways-delivery {
    display: flex;
    flex-direction: row;
    margin: 1px 1px 1px 1px;
  }

  .block-ways-delivery-image {
    display: flex;
    padding-top: 20px;
  }

  .block-ways-delivery-container-text {
    display: flex;
    flex-direction: column;
    margin: 1px 1px 1px 1px;
  }

  .block-ways-delivery-title {
    display: flex;
    padding-top: 20px;
    font-family: $font-family-base;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.05em;
  }

  .block-ways-delivery-text {
    display: flex;
    padding-top: 20px;
    font-family: $font-family-base;
    font-size: 12px;
    font-style: normal;
    font-weight: normal;
    line-height: 15px;
    color: $text-color;
  }
}
</style>
