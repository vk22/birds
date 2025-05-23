<template>
  <section id="index-section-1" class="one-screen-slider">

    <div class="main-list-wrap">
      <div class="container">
        <div class="intro-text">
          <div class="top-slider-title slideUp fade-in desktop-only" v-html="slider.mainPhrase"></div>
          <div class="top-slider-title slideUp fade-in mobile-only" v-html="slider.mainPhrase"></div>
          <span class="line slideUp fade-in"></span>
        </div>
      </div>
      <div class="container main-list slideUp fade-in" ref="mainList">
        <div class="list row" v-if="slider.phrases">
          <div class="col">
            <nuxt-link to="projects" v-html="slider.phrases[0].text"></nuxt-link>
          </div>
          <div class="col">
            <nuxt-link to="projects" v-html="slider.phrases[1].text"></nuxt-link>
          </div>
          <div class="col">
            <nuxt-link to="projects" v-html="slider.phrases[2].text"></nuxt-link>
          </div>
          <div class="col">
            <nuxt-link to="projects" v-html="slider.phrases[3].text"></nuxt-link>
          </div>
          <div class="col">
            <nuxt-link to="projects" v-html="slider.phrases[4].text"></nuxt-link>
          </div>
        </div>
        <div class="shadow-wrap">
          <div class="bg"></div>
          <div class="bg2"></div>
        </div>
      </div>
    </div>


    <div class="move-down slideUp fade-in-2" v-scroll-to="'#index-about'" :style="{ 'bottom': introBottom + 'px' }">
      <svg viewBox="0 0 247 390" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
        <path id="wheel" d="M123.359,79.775l0,72.843" style="fill:none;stroke:#fff;stroke-width:20px;" />
        <path id="mouse"
          d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z"
          style="fill:none;stroke:#fff;stroke-width:20px;" />
      </svg>
    </div>

    <div class="bg-wrapper">
      <div class="left slideUp fade-in-0">
        <svg preserveAspectRatio="none" viewBox="0 0 100 100">
          <polygon class="desktop-only" points="0 50 100 0 100 100 0 100"></polygon>
          <polygon class="mobile-only" points="0 10 100 10 100 100 0 100"></polygon>
        </svg>
      </div>
      <div class="right">
        <!-- <svg preserveAspectRatio="none" viewBox="0 0 100 100">
            <polygon id="Path" points="0 100 0 5.68434189e-14 100 60 100 100"></polygon>
          </svg> -->
      </div>
    </div>

    <div class="bg"></div>

    <div class="bg-img slideUp fade-in-0">
      <img v-lazy="'/uploads/slider/' + slider.imageBackground" />
    </div>

  </section>
</template>      

<script>
import img1 from '~/assets/img/index-back.jpg'
export default {
  props: ['myData'],
  name: 'slideSecond',

  data() {
    return {
      topImg: img1,
      introTextBottom: undefined,
      introBottom: undefined
    }
  },
  methods: {
    getIntroTextBottom() {
      if (!this.$refs.mainList) return;
      if (window.outerWidth < 668) {
        this.introTextBottom = 0
        this.introBottom = this.$refs.mainList.clientHeight
      } else if (window.outerWidth >= 668 && window.outerWidth < 1800) {
        this.introTextBottom = this.$refs.mainList.clientHeight + 120
        this.introBottom = this.$refs.mainList.clientHeight + 100
      } else {
        this.introTextBottom = this.$refs.mainList.clientHeight + 150
        this.introBottom = this.$refs.mainList.clientHeight + 100
      }

    }

  },

  mounted() {
    setTimeout(() => {
      this.getIntroTextBottom()
    }, 250);

    window.addEventListener('resize', function () {
      this.getIntroTextBottom()
    }.bind(this));
  },
  computed: {
    slider() {
      return this.$store.getters['getSlider']
    }
  },
  watch: {
    // firstName: function (val) {
    //   this.fullName = val + ' ' + this.lastName
    // },
  }


}
</script>


<style lang="scss">
.visible #index-section-1 .bg-img img {
  //opacity: 1;
  // object-position: 0% 75%;
}

#index-section-1 {

  @include for-phone-only {
    height: 100vh;
    //height: auto;
    padding: 0 20px;
    align-items: flex-start;
    justify-content: flex-start;
  }

  @include for-small-phone-only {
    height: auto;
    padding: 0 20px;
    align-items: flex-start;
    justify-content: flex-start;
  }

  @include for-tablet-portrait-up {
    height: auto;
    padding: 0 20px;
    align-items: flex-start;
    justify-content: flex-start;
  }

  @include for-tablet-landscape-up {
    height: 100vh;
  }

  @include for-desktop-up {}

  @include for-big-desktop-up {}

  .bg {
    height: 100%;
    width: 50%;
    background-color: #fff;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1;

    @include for-phone-only {
      width: 0%;
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

    @include for-phone-only {
      height: 35%;
      top: 0px;
    }

    img {
      opacity: 1;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
      object-fit: cover;
      object-position: 5% 40%;
      transform: scaleX(-1) translateY(0px);
      transition: all 2s ease-in-out;
    }
  }

  .bg-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: 2;
    display: flex;

    @include for-phone-only {
      height: 75%;
    }

    .left {
      position: relative;
      width: 50%;

      @include for-phone-only {
        width: 100%;
        height: 100%;
      }

      svg {
        width: 100%;
        height: 100%;

        polygon {
          fill: #F3F5F9
        }
      }
    }

    .right {
      display: none;
      position: relative;
      width: 50%;
      // background: #ddd;

      svg {
        width: 100%;
        height: 100%;

        polygon {
          fill: #fff
        }
      }

    }
  }

  .intro-text-wrap {
    position: absolute;
    left: 0;
    bottom: 25%;
    width: 100%;
  }

  .intro-text {
    position: relative;
    z-index: 3;
    
    font-weight: 300;
    line-height: 50px;
    @include base-transition(opacity);

    @include for-phone-only {
      position: relative;
      left: 0;
      bottom: auto !important;
      margin-top: 50%;
      margin-bottom: 30px;
      width: 100%;
    }

    @include for-tablet-portrait-up {
      position: relative;
      left: 0;
      bottom: auto;
      margin-top: 15%;
      margin-bottom: 60px;
      width: 40%;
    }

    @include for-tablet-landscape-up {
      // position: absolute;
      // left: 50%;
      // bottom: 7%;
      // width: calc(100% - 10rem);
      // transform: translateX(-50%) translateY(25%);
    }

    @include for-desktop-up {}

    @include for-big-desktop-up {}

    &.hide {
      opacity: 0;
    }

    .line {
      //display: none!important;
      height: 3px;
      width: 100px;
      background-color: $mainColor;
      display: block;
      //margin-bottom: 3.5rem;

      @include for-phone-only {
        margin-bottom: 0rem;
      }
    }

  }

  .move-down {
    position: absolute;
    left: 50%;
    bottom: 25%;
    transform: translateY(25%) translateX(-50%);
    background: $mainColor;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 3;

    @include for-phone-only {
      display: none;
    }

    @include for-tablet-portrait-up {
      left: auto;
      right: 1.5rem;
      width: 50px;
      height: 50px;
      transform: translateY(25%) translateX(0%);
    }

    @include for-tablet-landscape-up {
      left: 50%;
      bottom: 25%;
      transform: translateY(25%) translateX(-50%);
      width: 60px;
      height: 60px;
    }

    svg {
      width: 40px;
      height: 70%;

      @include for-phone-only {
        width: 30px;
        height: 70%;
      }
    }

    svg #wheel {
      animation: scroll ease 2s infinite;
    }


  }

  .shadow-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    filter: drop-shadow(0 5px 20px rgba(70, 96, 140, 0.2));
    z-index: -1;
  }

  .main-list-wrap {
    position: absolute;
    left: 0;
    bottom: 5%;
    width: 100%;
  }

  .main-list {
    position: relative;
    color: $mainColor;
    text-align: left;
    letter-spacing: 1px;
    z-index: 3;
    opacity: 0;
    // max-width: 1440px;
    // padding: 0 15px;

    @include for-phone-only {
      position: relative;
      left: auto;
      bottom: auto;
      width: 96%;
      right: auto;
      transform: translateX(0%) translateY(5%);
    }

    @include for-tablet-portrait-up {
      position: relative;
      left: auto;
      bottom: auto;
      width: 95%;
      right: auto;
      transform: translateX(0%) translateY(5%);
    }

    @include for-tablet-landscape-up {
      // position: absolute;
      // left: 50%;
      // bottom: 7%;
      // width: calc(100% - 10rem);
      // transform: translateX(-50%) translateY(25%);
    }

    @include for-big-desktop-up {}

    @include base-transition(all);

    &.hide {
      opacity: 0;
    }

    .list {
      margin: 0;

      @include for-phone-only {
        padding: .75rem 0 .75rem 0rem;
        line-height: 1.35rem;
        flex-direction: column;
        font-size: .95rem;
      }

      @include for-small-phone-only {
        font-size: .95rem;
      }

      @include for-tablet-portrait-up {
        padding: .75rem 0 .75rem 0rem;
        line-height: 1.35rem;
        flex-direction: row;
        font-size: .95rem;
      }


      @include for-tablet-landscape-up {
        font-size: 1.15rem;
        line-height: 1.75rem;
      }

      @include for-big-desktop-up {
        font-size: 1.15rem;
        line-height: 1.95rem;
      }

      .col {
        position: relative;
        text-align: left;
        @include base-transition(all);

        @include for-phone-only {
          padding: .5rem 1rem;
          width: 100%;
          flex-basis: 100%;

        }

        @include for-tablet-portrait-up {
          padding: .75rem 1rem;
        }

        @include for-tablet-landscape-up {
          padding: 1.25rem 1rem;
        }

        &:first-child {
          border-left: none !important;
        }

        p {
          letter-spacing: 0.15px;
          font-weight: 300;
          line-height: 1.45;
          margin-bottom: 0;
        }

        strong {
          font-weight: 500;

          //font-size: 1.5rem;
          // margin-right: 3px;
          @include for-phone-only {
            //font-size: 1.1rem;
          }

          @include for-tablet-portrait-up {
            //font-size: 1.1rem;
          }

          @include for-tablet-landscape-up {
            //font-size: 1.5rem;
          }
        }

        &.show {
          &:before {
            opacity: 1;
          }
        }

        a {
          color: #111;
          font-weight: 400;

          &:hover {
            opacity: .75;
          }
        }
      }

      div:first-child {
        border-left: none !important;
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
      clip-path: polygon(0 0, 100% 0, calc(100% - 35px) 100%, 0 100%);

      @include for-phone-only {
        //clip-path: none;
      }
    }

    .bg2 {
      background: #fff;
      box-shadow: 0 5px 25px #eaeaf4;
      position: absolute;
      left: 1rem;
      top: 1rem;
      z-index: -1;
      //transform: skew(-10deg, 0deg);
      width: 100%;
      height: 100%;
      clip-path: polygon(0 0, 100% 0, calc(100% - 35px) 100%, 0 100%);
      opacity: .5;

      @include for-phone-only {
        //clip-path: none;
      }

    }

  }


}
</style>