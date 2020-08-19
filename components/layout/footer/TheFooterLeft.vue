<template>
  <div class="footer__logo">
    <TheLogo />
    <div class="footer__social">
      <SocialNetworks />
    </div>
  </div>
</template>

<script>
import SocialNetworks from '@/components/shared/SocialNetworks'
import TheLogo from '@/components/shared/TheLogo'

export default {
  components: {
    TheLogo,
    SocialNetworks
  }
}
</script>
