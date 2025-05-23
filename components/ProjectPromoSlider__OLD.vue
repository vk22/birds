<template>
  <div class="project-promo-slider " :class="{'show': isShow}">
    <client-only>
      <swiper
        ref="carousel"
        class="swiper"
        :options="sliderOptions"
        @ready="onSwiperRedied"
        @clickSlide="onSwiperClickSlide"
        @slideChangeTransitionStart="onSwiperSlideChangeTransitionStart"
      >
        <swiper-slide v-for="projectPromo in projectPromos" :key="projectPromo.id">
          <div class="project-action">
            <PromoPreview :promoData="projectPromo"></PromoPreview>
          </div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </client-only>
  </div>
</template>

<script>

  import PromoPreview from '~/components/PromoPreview.vue'

  export default {
    props: ['projectPromos'],
    name: 'projectPromos',
    components: { 
      PromoPreview
    },
    data () {
      return {
        isShow: false,
        sliderOptions: {
          slidesPerView: 1,
          loop: true,
          effect: 'fade',
          speed: 1000,
          activeIndex: 0,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          // navigation: {
          //     nextEl: '.nav-next',
          //     prevEl: '.nav-prev'
          // },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
        },
      }
    },
    methods: {
      onSwiperRedied(swiper) {
        this.isShow = true
      },
      onSwiperSlideChangeTransitionStart() {
        // console.log('SwiperSlideChangeTransitionStart!')
      },
      onSwiperClickSlide(index, reallyIndex) {
        // console.log('Swiper click slide!', reallyIndex)
        
      }
    }
  }
</script>

<style lang="scss">


</style>
