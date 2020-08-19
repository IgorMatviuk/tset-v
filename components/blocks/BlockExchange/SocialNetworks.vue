<template>
  <div class="container-social">
    <div class="social"></div>
    <div class="social"></div>
    <div class="social"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.container-social {
  display: flex;
  justify-content: space-evenly;
  width: 150px;
}

.social {
  display: flex;
  width: 30px;
  height: 30px;
  background-color: #9a0034;
  border-radius: 50%;
}

@include media-breakpoint-down(sm) {
  .container-social {
    display: flex;
    justify-content: space-evenly;
    width: 150px;
    margin-left: -20px;
  }
}
</style>
