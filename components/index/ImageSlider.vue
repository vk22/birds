<template>
  <SliderFrame>
    <div slot-scope="{ goToIndex, next, prev, activeIndex }" class="ImageSlider">
      <SliderSlides>
        <SliderSlide v-for="slide in slides" :key="slide.image" class="ImageSlider__slide">
        
        <div class="slide-content" ref="slideContent" v-if="slide">
          <div class="container">
            <b-row>
              <div class="col left slideUp fade-in">
                <div class="type">{{ slide.type }}</div>
                <div class="title">
                  <nuxt-link :to="'projects/'+slide.url">
                    {{ slide.title }}
                  </nuxt-link> 
                </div>
                <span class="line"></span>
                <p class="metro" v-if="slide.url != 'fregat'">{{ slide.metro }}</p>
                <p class="address">Адрес: {{ slide.address }}</p>
                <!-- <div class="go-btn">
                  <nuxt-link :to="'projects/'+slide.url" class="main-btn">Подробнее</nuxt-link>
                </div> -->

                <div class="ImageSlider__direction slide-arrows">
                  <button class="arrow ImageSlider__direction--prev" @click="prev()">
                    <svg height="40" viewBox="0 0 60 40" width="60">
                      <g fill="none" fill-rule="evenodd">
                        <path d="m0 0h60l-17 40h-43z"></path>
                        <g stroke="#fff" stroke-linecap="square">
                          <path d="m36.5 20h-21" transform="matrix(-1 0 0 -1 52 40)"></path>
                          <path d="m21 26-6-6" transform="matrix(-1 0 0 -1 36 46)"></path>
                          <path d="m21 14-6 6" transform="matrix(-1 0 0 -1 36 34)"></path>
                        </g>
                      </g>
                    </svg>
                  </button>
                  <button class="arrow ImageSlider__direction--next" @click="next()" >
                    <svg height="40" viewBox="0 0 61 40" width="61">
                      <g fill="none" fill-rule="evenodd">
                        <path d="m17.7006179 0h43.2993821v40h-61z"></path>
                        <g stroke="#fff" stroke-linecap="square">
                          <path d="m48 20-6-6"></path>
                          <path d="m48 20-6 6"></path>
                          <path d="m47.5 20h-21"></path>
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>

                </div>
                <div class="col right slideUp fade-in" >
                  <nuxt-link :to="'projects/'+slide.url">
                    <ul>
                      <li v-for="(list,index) in slide.featuresIndex" :key="index"> {{ list }} </li>
                    </ul>
                  </nuxt-link>
                  <div class="bg"></div>
                  <div class="bg2"></div>
                </div>
            </b-row>

          </div>
        </div>

        <div class="slide-bg"></div>
        <div class="slide-bg2"></div>
        <div class="slide-img">
          <nuxt-link :to="'projects/'+slide.url">
            <img v-lazy="'/uploads/projects/'+slide.id+'/'+slide.indexCover" class="ImageSlider__image">
          </nuxt-link>
        </div>  
        </SliderSlide>
      </SliderSlides>
      <!-- <div class="ImageSlider__direction slideUp slide-arrows">
        <button class="arrow ImageSlider__direction--prev" @click="prev()" :disabled="activeIndex==0">
          <svg height="40" viewBox="0 0 60 40" width="60">
            <g fill="none" fill-rule="evenodd">
              <path d="m0 0h60l-17 40h-43z"></path>
              <g stroke="#fff" stroke-linecap="square">
                <path d="m36.5 20h-21" transform="matrix(-1 0 0 -1 52 40)"></path>
                <path d="m21 26-6-6" transform="matrix(-1 0 0 -1 36 46)"></path>
                <path d="m21 14-6 6" transform="matrix(-1 0 0 -1 36 34)"></path>
              </g>
            </g>
          </svg>
        </button>
        <button class="arrow ImageSlider__direction--next" @click="next()" :disabled="activeIndex==slides.length-1">
          <svg height="40" viewBox="0 0 61 40" width="61">
            <g fill="none" fill-rule="evenodd">
              <path d="m17.7006179 0h43.2993821v40h-61z"></path>
              <g stroke="#fff" stroke-linecap="square">
                <path d="m48 20-6-6"></path>
                <path d="m48 20-6 6"></path>
                <path d="m47.5 20h-21"></path>
              </g>
            </g>
          </svg>
      </button>
      </div> -->
    </div>
  </SliderFrame>
</template>

<script>
import SliderFrame from './SliderFrame';
import SliderSlide from './SliderSlide.vue';
import SliderSlides from './SliderSlides.vue';

export default {
  name: `ImageSlider`,
  components: {
    SliderFrame,
    SliderSlide,
    SliderSlides,
  },
  props: {
    slides: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      arrowPos: undefined 
    }
  },
  methods: {
      getArrowsPos() {
        if (window.outerWidth < 400) {
            this.arrowPos =  50
        } 
        var dataY = this.$refs.slideContent.filter(slide => {
          return slide.getBoundingClientRect().y > 0
        })
        if(dataY.length) {
          if (window.outerWidth < 668) {
            this.arrowPos =  70
          } else {
            if (window.innerHeight < 600) {
              this.arrowPos = dataY[0].offsetTop + dataY[0].clientHeight - 30
            } else if (window.innerHeight >= 600 && window.innerHeight < 700) {
              this.arrowPos = dataY[0].offsetTop + dataY[0].clientHeight
            } else {
              this.arrowPos = dataY[0].offsetTop + dataY[0].clientHeight + 30
            }
          }
        }
    
        var dataY = this.$refs.slideContent[0].getBoundingClientRect().y
        var dataH = this.$refs.slideContent[0].getBoundingClientRect().height

      },
      isElemVisible(el) {
          var rect = el.getBoundingClientRect()
          var elemTop = rect.top// 200 = buffer
          var elemBottom = rect.bottom
          return elemTop < window.innerHeight && elemBottom >= 0
      },
      // handleScroll() {
      //     var fadeInElements4 = Array.from(document.getElementsByClassName('slide-arrows'))
      //     for (let i = 0; i < fadeInElements4.length; i++) {
      //         var elem = fadeInElements4[i]
      //         //console.log('fadeInElements4 elem ', elem)
      //         if (this.isElemVisible(elem)) {
      //           this.getArrowsPos()
      //           var data = this.arrowPos+'px'
      //           setTimeout(() => {
      //             elem.style.opacity = '1'
      //           }, 250);
      //         }
      //     }
      // }

  },
   mounted () {
        // setTimeout(() => {
        //     document.addEventListener('scroll', this.handleScroll)
        //     this.handleScroll()
        // }, 250);

        // window.addEventListener('resize', function() {
        //   this.handleScroll()
        // }.bind(this));
        // // this.getArrowsPos()
        
    },  
};
</script>

<style lang="scss">



.ImageSlider {
  background: #F3F5F9;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .slide-bg {
    background: #F3F5F9;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9;
    clip-path: polygon(0 0,100% 0,calc(100% - 10%) 100%,0 100%);

        @include for-phone-only {    
            width: 60%;
            height: 51%;
            top: 30%;
            margin-top: -1px;
        }
        @include for-desktop-up {
            width: 75%;
        }
        @include for-big-desktop-up {
            width: 75%;
        }
  }

  .slide-bg2 {
    background: #F3F5F9;
    position: absolute;
    height: 100%;
    width: 75%;
    top: 0;
    left: 3rem;
    z-index: 9;
    clip-path: polygon(0 0,100% 0,calc(100% - 10%) 100%,0 100%);
    opacity: .5;

        @include for-phone-only {    
            width: 60%;
            height: 51%;
            top: 30%;
            margin-top: -1px;
        }
        @include for-desktop-up {
            width: 75%;
        }
        @include for-big-desktop-up {
            width: 75%;
        }
  }

  .slide-img {
    position: absolute;
    padding: 0px;
    height: 100%;
    width: 50%;
    top: 0;
    right: 0;
    z-index: 8;

    @include for-phone-only {   
      top: 30%; 
      height: 50%;
      width: 100%;
    }

    img {
      object-fit: cover;
    }
    
  }

  .slide-content {
    position: absolute;
    height: auto;
    top: 25rem;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    

    @include for-phone-only { 
        position: relative;   
        padding: 0 20px 10rem;
        top: 6rem;
        width: 100%;
        margin: 0;
        flex-direction: column;

    }
    @include for-tablet-portrait-up {
        position: relative;   
        padding: 0 20px 10rem;
        top: 6rem;
        width: 100%;
        margin: 0;
        flex-direction: row;
        // top: 6rem;
        // width: calc(100% - 1rem);
        // margin: 0 1rem;
        // flex-direction: row;
    }
    @include for-tablet-landscape-up {
        position: absolute;
        top: 25%;
        // width: calc(100% - 12rem);
        // margin: 0 6rem;
        flex-direction: row;
        padding: 0;
    }
    @include for-desktop-up {
        // width: 100%;
        // margin: 0;
    }
    @include for-big-desktop-up {
        // width: 100%;
        // margin: 0;
        //padding-right: 10rem;
    }

    // @include for-min-height-only {
    //   top: 15%;
    // }

    // @include for-all-height-up {
    //   top: 25%;
    // }

    .container {
      margin: 0 auto;
    }


    .left {
      width: 50%;
      padding-right: 5rem;

      @include for-phone-only {    
        width: 100%;
        padding-right: 40%;
      }

      .type {
        color: #9B9B9B;
        margin-bottom: 1rem;
      }

      .title {
        color: $mainColor;
        letter-spacing: 2px;
        font-weight: 400;
        line-height: 1.45;
        text-transform: uppercase;

        @include for-phone-only {    
            font-size: 1.25rem;
            margin-bottom: 1.5rem;
            letter-spacing: 1px;
        }
        @include for-small-phone-only {    
          font-size: 1.15rem;
        }        
        @include for-tablet-portrait-up {
            font-size: 1.25rem;
            margin-bottom: 1.5rem;
            letter-spacing: 1px;
        }
        @include for-tablet-landscape-up {
            font-size: 2rem;
        }
        @include for-desktop-up {
            font-size: 2rem;
        }
        @include for-big-desktop-up {
            font-size: 2.5rem;
        }
        
      }

      .line {
          height: 3px;
          width: 100px;
          background-color: $mainColor;
          display: block;
          margin-bottom: 3rem;

        @include for-phone-only {    
            margin-bottom: 2rem;
        }
      }

      .address {
        letter-spacing: .5px;
        font-weight: 400;
        line-height: 1.45;
        margin-bottom: 3rem;
      }

      .metro {
        position: relative;
        letter-spacing: .5px;
        font-weight: 400;
        line-height: 1.45;
        margin-bottom: 20px;
        padding-left: 25px;

        &:before {
            position: absolute;
            top: 2px;
            left: 0;
            content: "м";
            background: $mainColor;
            font-weight: 500;
            font-size: .75rem;
            border-radius: 50%;
            padding: 0;
            width: 19px;
            height: 19px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;

            @include for-phone-only {    
              top: 0px;
            }
            @include for-tablet-portrait-up {
              top: 2px;
            }

          }
      }

      .go-btn {
        width: 250px;
      }

    }
    .right {
      position: relative;
      width: 50%;
      display: flex;
      align-items: center;
      filter: drop-shadow(0 5px 20px rgba(70,96,140,.2));
      // max-height: 300px;

      @include for-phone-only {  
        display: block;  
         width: 90%;
         margin-top: 20px;
        //  margin-left: -1rem;
      }

      ul {
        margin: 0;
        padding: 2rem 4rem 2rem;
        list-style: none;

        @include for-phone-only {    
          padding: 1rem 2rem 2rem 2.5rem;
        }
        @include for-tablet-portrait-up {
            padding: 1rem 2rem 2rem 2.5rem;
        }    
        @include for-tablet-landscape-up {
            padding: 2rem 4rem 2rem;
        }

        li {
          position: relative;
          margin: 1.25rem 0;

          @include for-phone-only {    
             margin: 1rem 0;
          }

          &:before {
            position: absolute;
            top: 7px;
            content: "";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
            background: $mainColor; /* Change the color */
            font-weight: bold; /* If you want it to be bold */
            display: block; /* Needed to add space between the bullet and the text */
            width: 6px;
            height: 6px; /* Also needed for space (tweak if needed) */
            margin-left: -1em; /* Also needed for space (tweak if needed) */

            @include for-phone-only {    
              top: 8px;
            }
          }
        }
      }

      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        // max-height: 300px;
        clip-path: polygon(0 0,100% 0,calc(100% - 10%) 100%,0 100%);
        z-index: -1;
      }

      .bg2 {
        position: absolute;
        top: 2rem;
        left: 2rem;
        width: 100%;
        height: 100%;
        background: #fff;
        // max-height: 300px;
        clip-path: polygon(0 0,100% 0,calc(100% - 10%) 100%,0 100%);
        z-index: -2;
        opacity: .5;
      }


    }
  }



}

.ImageSlider__direction {
  // position: absolute;
  // bottom: 10rem;
  // z-index: 11;

  @include for-phone-only {    
    top: 130px!important;
    opacity: 1;
    right: 20px!important;
    left: auto!important;
  }
  @include for-tablet-portrait-up {
    top: 20px;
    opacity: 1;
    right: 20px;
    left: auto;
  }    
  @include for-tablet-landscape-up {
    top: auto;
    right: 6rem;
    bottom: 6rem;
  }
  @include for-desktop-up {
    right: 6rem;
    bottom: 6rem;
  }
  @include for-big-desktop-up {
    right: 6rem;
    bottom: 6rem;
  }

  .arrow {
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    opacity: 0.85;
    transition: opacity .2s ease-in-out;

    path {
      fill: $mainColor
    }

    &:disabled {
      opacity: .55;

      &:hover {
        opacity: .55;
      }
    }

    &:hover {
      opacity: 1;
    }
  }

  .ImageSlider__direction--prev {
    left: 0.5em;
  }

  .ImageSlider__direction--next {
    right: 0.5em;
    margin-left: -20px;
  }

}





.arrows{
  position: absolute;
  top: -100px;
  left: 0;
  z-index: 99;

  .arrow {
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    opacity: 0.85;
    transition: opacity .2s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  .arrow--prev {
    left: 0.5em;
  }

  .arrow--next {
    right: 0.5em;
    margin-left: -20px;
  }

}





.ImageSlider__slide{
  width: 100%;
  height: 100%;
  display: flex;
}



.ImageSlider__image {
  width: 100%;
  height: 100%;
}

.ImageSlider__slide {
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    //background-color: rgba(#000, 0.2);
    content: '';
  }
}


.ImageSlider__image {
  vertical-align: middle;
}

.ImageSlider__dots {
  position: absolute;
  right: 0;
  bottom: 0.5em;
  left: 0;
  display: flex;
  justify-content: center;
}
</style>
