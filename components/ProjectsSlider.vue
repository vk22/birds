<template>               
    <div class="projects-slider" :class="{'show': isShow}"> 
      <b-container>
        <div class="block-title h1">Наши проекты</div>
        <div class="list row" >
          <div v-swiper:mySwiper="sliderOptions" ref="mySwiper" :init="init()">
            <div class="swiper-wrapper" >
              <div v-for="(project, index) in projects" :key="index" class="swiper-slide">
                  <ProjectsPreview :project="project" @click="goToProjectPage(project.url)"></ProjectsPreview>
              </div>

            </div>

          </div>
          <div class="swiper-button-prev" @click="goToPrev()" slot="button-prev"></div>
          <div class="swiper-button-next" @click="goToNext()" slot="button-next"></div>
        </div>
      </b-container>  
    </div>
     
</template>      

<script>

export default {
    props: ['myData'],
    name: 'ProjectsSlider',
    components: {
    },
    data () {
      return {
        isShow: false,
        sliderOptions: {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          allowTouchMove: false,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        activeIndex: 0,
      

      }
    },
    methods:{

      init() {
        //this.isShow = true
      },
      goToNext() {
        console.log('goToNext ', this.swiper.activeIndex+1)
        this.swiper.slideTo(this.swiper.activeIndex+1, 1000, false)
      },
      goToPrev() {
        console.log('goToNext ', this.swiper.activeIndex-1)
        this.swiper.slideTo(this.swiper.activeIndex-1, 100, false)
      },
      goToProjectPage(url) {
        console.log('goToProjectPage ', url)
      }

    },

    mounted () {

      var _this = this;
      _this.activeIndex = _this.swiper.activeIndex;
      
      console.log('_this.swiper.activeIndex ', _this.swiper.activeIndex)

      // this.swiper.on('init', function() { 
      //   console.log('init')
      //     _this.isShow = true
      // });

      this.swiper.on('slideChange', function() { 
        console.log('slideChange')
          _this.activeIndex = _this.swiper.activeIndex
          _this.$emit('activeFloor', _this.swiper.activeIndex)
      });

    },  
    computed: {
      swiper() {
          return this.$refs.mySwiper.swiper
        },
      projects() {
        return this.$store.getters['getProjects']
      },
    },
    watch: {

    }

    
}
</script>


<style lang="scss">



.projects-slider {
  background: rgba($color: #F2F3F4, $alpha: 0.7);
  padding: 5rem 0;
  visibility: hidden;
  opacity: 0;
  @include base-transition(all);
  
  &.show {
    visibility: visible;
    opacity: 1;
  }

  .container {
    position: relative;
  }

  .project-prev {
    margin-bottom: 0rem!important;
  }
}


</style>