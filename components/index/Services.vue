<template>     
      <section id="index-services" class="one-screen-slider">
        <div class="services-wrap">
          <div v-for="(service, index) in services" :key="service.id" class="service-item" :class="[service.id, {'hover': hoverIndex == index}]" @mouseover="hoverIn(index)" @mouseleave="hoverOut()">
            <nuxt-link :to="service.url">  
              <div class="content-block slideUp fade-in">
                  <div class="title-wrap">
                    <div class="title">{{ service.title }}</div>
                    <div class="subtitle">{{ service.subtitle }}</div>
                  </div>
                  <span class="line" :class="{'show':hoverIndex == index}"></span>
                  <div class="shadow-wrap">
                    <div class="bg"></div>
                  </div>
              </div>
              <div class="image-back" :style="{ backgroundImage: 'url(/uploads/' + service.image + ')' }"></div>
            </nuxt-link>
          </div>
        </div> 
      </section>
</template>      

<script>
import img1 from '~/assets/img/index-back.jpg'
export default {
    props: ['myData'],
    name: 'slideSecond',

    data () {
      return {
        topImg: img1,
        introTextBottom: undefined,
        introBottom: undefined,
        hoverIndex: null
      }
    },
    methods:{
      hoverIn(index) {
        this.hoverIndex = index;
      },
      hoverOut(index) {
        this.hoverIndex = null;
      },
    },

    mounted () {
    },  
    computed: {
      services() {
          return this.$store.getters['getSections']
      },
    },
    watch: {

    }

    
}
</script>


<style lang="scss">

.visible #screen-1 .bg-img img {
  opacity: 1;
  object-position: 0% 75%;
}

#index-services {

  @include for-phone-only {    
      height: 150vh;
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


  .services-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;  
    display: flex;
    

    @include for-phone-only {    
      flex-basis: 100%;
      flex-direction: column;
    }
    @include for-small-phone-only {    
      flex-basis: 33.3%;
    }
    @include for-tablet-portrait-up {
      flex-basis: 33.3%;
    }
    @include for-tablet-landscape-up {
      flex-basis: 33.3%;
    }


    .service-item {
      position: relative;
      width: 33%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      cursor: pointer;

      @include for-phone-only {    
        width: 100%;
        height: 50vh;
      }
      @include for-small-phone-only {    
        width: 33%;
      }
      @include for-tablet-portrait-up {
        width: 33%;
      }
      @include for-tablet-landscape-up {
        width: 33%;
      }

      .image-back {
        position: absolute;
        background-color: #ebebeb;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transform: scale(1.025);
        @include base-transition(transform, 0.5s);

          &.offices {
            background-image: url(/uploads/index-offices.jpg);
          }
          &.warehouses {
            background-image: url(/uploads/index-warehouses.jpg);
          }
          &.retail {
            background-image: url(/uploads/index-retail.jpg);
          }
      }  

      &:hover {

        .image-back {
          transform: scale(1.05);
        }
        
      }
      
      a {
        display: block;
        width: 80%;
      }

      .content-block {
        position: relative;
        color: #111;
        text-align: left;
        letter-spacing: 1px;
        padding: 2rem;
        z-index: 1;
        opacity: 0;
        width: 100%;
        
        @include for-phone-only {    

        }

        @include for-tablet-portrait-up {

        }

        @include for-tablet-landscape-up {

        }

        @include for-big-desktop-up {

        }
        
        @include base-transition(all);

        &.hide {
            opacity: 0;
        }

        .title-wrap {
          // @include for-phone-only {    
          //   height: 8rem;
          // }
          // @include for-tablet-portrait-up {    
          //   height: 8rem;
          // }        
          // @include for-desktop-up {
          //   height: auto;
          // }
        }

        .title {
          letter-spacing: 0px;
          font-weight: 400;
          line-height: 1.25;
          text-transform: uppercase;

          @include for-phone-only {    
              font-size: 1.25rem;
              margin-bottom: .5rem;
          }
          @include for-small-phone-only {    
            font-size: 1.15rem;
          }        
          @include for-tablet-portrait-up {
              font-size: 1.25rem;
              margin-bottom: .5rem;
          }
          @include for-tablet-landscape-up {
              font-size: 1.25rem;

          }
          @include for-desktop-up {
              font-size: 1.25rem;
          }
          @include for-big-desktop-up {
              font-size: 1.75rem;
          }
          
        }

        .subtitle {
          margin-bottom: 2.25rem;
          letter-spacing: 0px;
          font-weight: 400;
          line-height: 1.45;
          color: #777;

          @include for-phone-only {    
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }
          @include for-small-phone-only {    
            font-size: 1rem;
          }        
          @include for-tablet-portrait-up {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }
          @include for-tablet-landscape-up {
            font-size: 1rem;
          }
          @include for-desktop-up {
            font-size: 1rem;
          }
          @include for-big-desktop-up {
            font-size: 1.15rem;
          }
          
        }

        .line {
            height: 3px;
            width: 30px;
            background-color: $mainColor;
            display: block;
            margin-bottom: 1rem;

            @include base-transition(width, 0.25s);

            &.show {
              width: 60px;
            }

          @include for-phone-only {    
              margin-bottom: 2rem;
          }

        }

        .bg {
          background: #fff;
          box-shadow: 0 5px 25px #eaeaf4;
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          //transform: skew(-10deg, 0deg);
          width: 100%;
          height: 100%;
          clip-path: polygon(0 0,100% 0,calc(100% - 35px) 100%,0 100%);
        }

        .bg2 {
          background: #fff;
          box-shadow: 0 5px 25px #eaeaf4;
          position: absolute;
          left: 2rem;
          top: 2rem;
          z-index: -1;
          //transform: skew(-10deg, 0deg);
          width: 100%;
          height: 100%;
          clip-path: polygon(0 0,100% 0,calc(100% - 35px) 100%,0 100%);
          opacity: .5;
        }

      }

    }
  }



}

</style>