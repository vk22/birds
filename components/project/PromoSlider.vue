<template>
  <div class="project-promo-slider" :class="[{ 'show': isShow }, 'slideUp fade-in']">
    <div class="swiper" v-if="projectPromos.length > 1">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="projectPromo in projectPromos" :key="projectPromo.id">
          <div class="project-action">
            <PromoPreview :promoData="projectPromo"></PromoPreview>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <PromoPreview :promoData="projectPromos[0]" v-else></PromoPreview>
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/swiper-bundle.min.css'
export default {
  props: ['projectPromos'],
  data() {
    return {
      isShow: true,
      sliderOptions: {
        direction: 'horizontal',
        loop: true,
        modules: [Navigation, Pagination, Autoplay],
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        autoplay: {
          delay: 10000
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
    }
  },
  mounted() {
    Swiper.use([Navigation, Pagination, Autoplay])
    const swiper = new Swiper('.swiper', this.sliderOptions)

    // console.log('projectPromos ', this.projectPromos.length)
  }
}
</script>

<style lang="scss">



.project-promo-slider {
  position: relative;
  padding: 0px;
  height: 600px;
  width: 100%;
  overflow: hidden;
  opacity: 0;
  @include base-transition(all);

  &.show {
    visibility: visible;
    opacity: 1;
  }

  .swiper-pagination {
    bottom: 30px;
    left: 0;
    width: 100%;
  }

  .swiper-pagination-bullet {
      background: #fff;
      width: 40px;
      height: 6px;
      border-radius: 0px !important;
      opacity: .85;
    }

    .swiper-pagination-bullet-active {
      //background: $mainColor;
      background: #5c2260;
    }
}
</style>