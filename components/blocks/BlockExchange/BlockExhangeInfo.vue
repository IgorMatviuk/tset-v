<template>
  <div class="container-info">
    <div class="title-info">{{ content.title }}</div>
    <div class="pink-line"></div>
    <div class="contacts">
      <div class="contacts-text">
        <div>
          <p>{{ content.text }}</p>
        </div>
        <div>
          <p>{{ content.phone }}</p>
        </div>
        <div class="down">
          <p>{{ content.downloadForm }}</p>
        </div>
      </div>
      <div class="social-icon-mob">
        <div class="social-icon">
          <SocialNetworks />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SocialNetworks from '@/components/blocks/BlockExchange/SocialNetworks.vue'
export default {
  components: {
    SocialNetworks
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
.title-info {
  display: flex;
  margin-bottom: 10px;
  font-family: $font-family-base;
  font-size: 18px;
  font-style: normal;
  font-weight: normal;
  line-height: 23px;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.container-info {
  display: flex;
  flex-direction: column;
}

.contacts {
  display: flex;
  flex-direction: row;
}

.contacts-text {
  display: flex;
  flex-direction: column;
  font-family: $font-family-base;
  font-size: 13px;
  font-style: normal;
  font-weight: normal;
  line-height: 16px;
  color: #565656;
}

.social-icon {
  display: flex;
  padding-top: 35px;
}

@include media-breakpoint-down(sm) {
  .container-info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  .down {
    margin-top: 50px;
  }

  .social-icon-mob {
    position: absolute;
    padding-top: 60px;
  }
}
</style>
