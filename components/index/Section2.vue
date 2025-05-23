<template>     
    <section id="index-section-2" class="projects-block one-screen-slider">
        <ImageSlider :slides="projects"/> 
    </section>
</template>      

<script>
import ImageSlider from '~/components/index/ImageSlider';
export default {
    props: ['myData'],
    name: 'slideSecond',
    components: {
      ImageSlider
    },
    data () {
      return {
        sliderOptions: {
          spaceBetween: 30,
            effect: 'flip',
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
        },
      }
    },
    methods:{
      logout () {

      }
    },
    created () {


    },
    destroyed () {

    },
    mounted () {
     console.log('Current Swiper instance object', this.swiper)
        
        
    },  
    computed: {
      swiper() {
        return this.$refs.mySwiper
      },
      projects() {
          return this.$store.getters['getProjects']('All')
      },
    },

    
}
</script>


<style lang="scss">




#index-section-2 {
  

  @include for-phone-only {    
      height: auto;
  }
  @include for-small-phone-only {    
      height: 150vh;
  }
  @include for-tablet-portrait-up {
      height: 200vh;
  }
  @include for-tablet-landscape-up {
      height: 80vh;
  }
  
}

.projects-block {
  &__bg {
    background: #F3F5F9;
    position: absolute;
    height: 100%;
    width: 75%;
    top: 0;
    left: 0;
    z-index: 9;
    clip-path: polygon(0 0,100% 0,calc(100% - 150px) 100%,0 100%);
  }
}


</style>