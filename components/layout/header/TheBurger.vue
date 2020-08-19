<template>
  <div
    :class="{ 'burger--active': isActive }"
    class="burger"
    @click="toggleStatus"
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  updated() {
    if (!this.isActive) {
      document.body.removeEventListener('mouseup', this.onOutSideClick)
    }
  },
  methods: {
    toggleStatus() {
      if (!this.isActive) {
        document.body.addEventListener('mouseup', this.onOutSideClick)
      }

      this.$emit('toggle-status')
    },
    onOutSideClick(event) {
      const isTrigger =
        event.target.classList.contains('burger') ||
        event.target.parentNode.classList.contains('burger') ||
        event.target.classList.contains('search-box__field') ||
        event.target.classList.contains('search-box__btn-search') ||
        event.target.classList.contains('nav-slider__link') ||
        event.target.parentNode.classList.contains('nav-slider__link') ||
        event.target.classList.contains('nav-slider__btn-back') ||
        event.target.parentNode.classList.contains('nav-slider__btn-back')

      if (!isTrigger) {
        this.$emit('toggle-status')
      }
    }
  }
}
</script>

<style lang="scss">
.burger {
  width: 18px;
  cursor: pointer;

  span {
    position: relative;
    display: block;
    width: 100%;
    height: 1px;
    background: $black;
    border-radius: 3px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
  }

  span + span {
    margin-top: 5px;
  }

  span:nth-child(1) {
    animation: ease 0.3s blt2 forwards;
  }

  span:nth-child(2) {
    animation: ease 0.3s bls2 forwards;
  }

  span:nth-child(3) {
    animation: ease 0.3s blb2 forwards;
  }

  @keyframes blt {
    0% {
      top: 0;
      transform: rotate(0);
    }

    50% {
      top: 6px;
      transform: rotate(0);
    }

    100% {
      top: 6px;
      transform: rotate(45deg);
    }
  }

  @keyframes blt2 {
    0% {
      top: 6px;
      transform: rotate(45deg);
    }

    50% {
      top: 6px;
      transform: rotate(0deg);
    }

    100% {
      top: 0;
      transform: rotate(0deg);
    }
  }

  @keyframes blb {
    0% {
      bottom: 0;
      transform: rotate(0);
    }

    50% {
      bottom: 6px;
      transform: rotate(0);
    }

    100% {
      bottom: 6px;
      transform: rotate(135deg);
    }
  }

  @keyframes blb2 {
    0% {
      bottom: 6px;
      transform: rotate(135deg);
    }

    50% {
      bottom: 6px;
      transform: rotate(0);
    }

    100% {
      bottom: 0;
      transform: rotate(0);
    }
  }

  @keyframes bls {
    50% {
      transform: scale(0);
    }

    100% {
      transform: scale(0);
    }
  }

  @keyframes bls2 {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  // stylelint-disable
  &--active span:nth-child(1) {
    animation: ease 0.3s blt forwards;
  }

  &--active span:nth-child(2) {
    animation: ease 0.3s bls forwards;
  }

  &--active span:nth-child(3) {
    animation: ease 0.3s blb forwards;
  }
  // stylelint-enable
}
</style>
