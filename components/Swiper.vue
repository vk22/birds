<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div v-for="i in 6" :key="i" class="swiper-slide" :class="`slide--${i}`">
        <div class="slider-content">Slide {{ i }}</div>
      </div>
    </div>
    <!-- If pagination is needed -->
    <div class="swiper-pagination"></div>

    <!-- If navigation buttons are needed -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
export default {
  mounted() {
    Swiper.use([Navigation, Pagination, Autoplay])
    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      loop: true,
      modules: [Navigation, Pagination, Autoplay],
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      autoplay: {
        delay: 3000
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  }
}
</script>

<style scoped>
.swiper {
  height: 300px;
  overflow: hidden;
  position: relative;
  width: 500px;
}
.swiper-slide {
  align-items: center;
  display: flex;
  justify-content: center;
}
.slider-content {
  color: #000;
}
.slide--1 {
  background-color: #f1c40f;
}
.slide--2 {
  background-color: #e67e22;
}
.slide--3 {
  background-color: #e74c3c;
}
.slide--4 {
  background-color: #9b59b6;
}
.slide--5 {
  background-color: #3498db;
}
.slide--6 {
  background-color: #2ecc71;
}
</style>