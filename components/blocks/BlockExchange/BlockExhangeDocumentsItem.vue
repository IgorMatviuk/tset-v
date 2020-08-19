<template>
  <div class="image">{{ content.image }}</div>
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

<style>
.image {
  display: flex;
}
</style>
