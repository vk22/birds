<template>               
    <section id="index-about">
        <b-container>
          <b-row>
            <b-col cols="12" md="6">
              <div class="slideUp fade-in lazyImg">
                <img v-lazy='"/uploads/about/"+about.indexImage' alt="">
              </div>
            </b-col>
            <b-col cols="12" md="6">
              <div class="about-preview slideUp fade-in">
                <div class="block-title h1">О нас</div>
                <div class="text-block" v-html="about.indexText"></div>
                <div class="text-block w-75">
                  <nuxt-link to="/about" class="main-btn">Подробнее</nuxt-link>
                </div>
              </div>
            </b-col>

          </b-row>
        </b-container>
    </section>
</template>      

<script>

export default {
    props: ['myData'],
    name: 'IndexAbout',

    data () {
      return {

      }
    },
    methods:{

    },

    mounted () {

    },  
    computed: {
      about() {
          return this.$store.getters.getAbout
      }

    },
    watch: {

    }

    
}
</script>


<style lang="scss">



#index-about {
  
  background: #fff;

    @include for-phone-only {    
      padding: 2rem 0;
    }
    @include for-small-phone-only {    
      padding: 10rem 0;
    }
    @include for-tablet-portrait-up {
      padding: 10rem 0;
    }
    @include for-tablet-landscape-up {
      padding: 10rem 0;
  }

  .about-preview {
    padding-left: 3rem;
  }

}



</style>