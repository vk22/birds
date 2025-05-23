<template>
  <div class="SliderSlides">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: `SliderSlides`,
};
</script>

<style lang="scss">
.SliderSlides {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
