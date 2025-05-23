<template>     
    <section id="index-section-3" class="one-screen-slider">
        <feedback-index/>
        <div class="bg-img opacity">
          <img v-lazy="img2"/>
        </div>
    </section>
</template>      

<script>
import FeedbackIndex from '~/components/feedbacks/FeedbackIndex.vue'
import img2 from '~/assets/img/slider-2.jpg'
export default {
    props: ['myData'],
    name: 'slideSecond',
    components: {
      FeedbackIndex
    },
    data () {
      return {
        img2: img2
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
         
    computed: {

    },

    
}
</script>


<style lang="scss">



#index-section-3 {

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


  .slide-bg {
    background: #F3F5F9;
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 10;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);

        @include for-phone-only {    
          width: 100%;
            // height: 51%;
            // top: 30%;
            // margin-top: -1px;
        }
        @include for-desktop-up {
            width: 90%;
        }
        @include for-big-desktop-up {
            width: 80%;
        }
  }

  .slide-bg2 {
    background: #F3F5F9;
    position: absolute;
    height: 100%;
    top: 0;
    right: 3rem;
    z-index: 9;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 10% 100%);
    opacity: .5;

        @include for-phone-only {    
          width: 100%;
            // height: 51%;
            // top: 30%;
            // margin-top: -1px;
        }
        @include for-desktop-up {
            width: 90%;
        }
        @include for-big-desktop-up {
            width: 80%;
        }
  }

  .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-position: center center;
    background-size: cover; 
      img {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        object-fit: cover;
        object-position: 0 50%;
    }
    &.opacity {
      opacity: .1;
    }
  }

}  

</style>