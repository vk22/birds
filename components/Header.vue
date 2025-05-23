<template>
<div>
    <nav class="mobile-menu" v-bind:class="{active: mobileIsActive}">
      <ul>
          <li v-for="(link, index) in mobmenu" :key="index" class="mobile-menu__item" >
              <nuxt-link :to="link.route" class="">{{link.name}}</nuxt-link>
          </li>
      </ul>
    </nav>

    <header class="header" :class="{'onscroll': scrolled}">
      <div class="header__logo">
          <nuxt-link :to="'/'" class="logo">
            <img src="~assets/img/logo-birds.svg" alt="">
          </nuxt-link>
      </div>

      <div class="header__main-nav">
        <ul>
          <li v-for="(link, index) in mainmenu" :key="index" class="menu-item" :class="{'submenu-exist': link.sublinks}" @mouseover="showDropDown(index)" @mouseleave="hideDropDown(index)">
              <nuxt-link :to="link.route" class="" >{{link.name}}</nuxt-link>
              <transition name="slide-fade">
                    <div class="dropdown-menu-block" :class="link.id" ref="parent" v-if="link.sublinks && dropDownIsShowIndex === index">
                      <b-list-group v-for="(link, index) in link.sublinks" :key="index" @mouseover="showDropDown2(index)" @mouseleave="hideDropDown2(index)">

                          <nuxt-link :to="link.route" class="" >
                            <div class="title">{{link.name}}</div>
                            <div class="subtitle" v-if="link.subname">{{link.subname}}</div>
                          </nuxt-link>

                              <transition name="slide-fade">
                                    <div class="dropdown-menu-block2" v-if="link.sublinks && dropDownIsShowIndex2 === index" :style="{'transform': 'translateX(' + menuParentWidth + 'px)'}">
                                      <b-list-group v-for="(link, index) in link.sublinks" :key="index" >
                                          <nuxt-link :to="link.route" class="" >
                                            <div class="title">{{link.name}}</div>
                                            <div class="subtitle">{{link.subname}}</div>
                                          </nuxt-link>
                                      </b-list-group>
                                    </div>
                              </transition>
                      </b-list-group>
                    </div>
              </transition>
          </li>
        </ul>
      </div>


      <div class="header__right">
        <div class="header__right-phone"><a :href="'tel:'+mainPhone">{{ mainPhone }}</a></div>
        <div class="header__right-feedback">
            <svg @click="showFeedbackModal()" width="29px" height="19px" viewBox="0 0 29 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path fill="#fff" fill-rule="nonzero" d="M27.820678,0 L0,0 L0,18.5601741 L29,18.5601741 L29,0 L27.820678,0 Z M26.659851,1.1597389 L15.456295,12.3632953 C14.944965,12.8746248 14.053947,12.8746248 13.542617,12.3632953 L2.336885,1.1597389 L26.658764,1.1597389 L26.659851,1.1597389 Z M1.159739,1.6221113 L8.691514,9.1527986 L1.159739,16.6845738 L1.159739,1.6210234 L1.159739,1.6221113 Z M2.085572,17.4004352 L9.512905,9.9741897 L12.723402,13.1835984 C13.197742,13.6579382 13.828744,13.9201306 14.5,13.9201306 C15.171256,13.9201306 15.802258,13.6579382 16.276598,13.1835984 L19.487095,9.9731017 L26.91334,17.3993472 L2.084484,17.3993472 L2.085572,17.4004352 Z M27.840261,16.6856618 L20.308486,9.1527986 L27.840261,1.6199355 L27.840261,16.6856618 Z" id="Shape"></path>
            </svg>
            <a href="#" @click="showFeedbackModal()">Получить предложение</a>
        </div>
        <a href="tel:8 800 4440664" class="header__right-phone-m">         
        </a>
        <div class="header__right-burger" v-bind:class="{active: mobileIsActive}" v-on:click="toggleMobileMenu()">
          <div class="line"></div> 
          <div class="line"></div> 
          <div class="line"></div>
        </div>
      </div>

    </header>

    <!-- <div class="sub-nav">
      <div v-for="(link, index) in links" :key="index">
        <transition name="slide-fade">
              <div class="dropdown-menu-block block-sh" v-if="dropDownIsShow && dropDownIsShowIndex === index" @mouseover="mouseoverMenu('sub', index)" @mouseleave="mouseleaveMenu('sub', index)">
                <b-list-group v-for="(link, index) in link.sublinks" :key="index" >
                    <nuxt-link :to="link.route" class="" >{{link.name}}</nuxt-link>
                </b-list-group>
              </div>
        </transition>
      </div>
    </div> -->

</div>    
</template>

<script>

import ModalFeedback from '~/components/feedbacks/ModalFeedback.vue'

export default {
    props: ['myData'],
    name: 'Header',
    components: {
      ModalFeedback

    },
    data () {
      return {
        scrolled: true,
        dropDownIsShow: false,
        dropDownIsShowIndex: undefined,
        dropDownIsShow2: false,
        dropDownIsShowIndex2: undefined,
        menuParentWidth: 220,
        mainmenu: [
            {
              name: 'О компании',
              route: '/about',
              id: 'about',
              sublinks: false
            },
            {
              name: 'Проекты',
              route: '/projects',
              id: 'projects',
              sublinks: []
            },
            {
              name: 'Аренда',
              route: '/rent',
              id: 'rent',
              sublinks: [
                  {
                    name: 'Офисы',
                    route: '/rent/offices',
                    sublinks: false
                  },
                  {
                    name: 'Склады',
                    route: '/rent/warehouses',
                    sublinks: false
                  },
                  {
                    name: 'Помещения свободного назначения',
                    route: '/rent/psn',
                    sublinks: false
                  }
              ]
            },
            {
              name: 'Акции',
              route: '/promo',
              id: 'promo',
              sublinks: false
            },
            {
              name: 'Контакты',
              route: '/contacts',
              id: 'contacts',
              sublinks: false
            }
        ],
        mobmenu: [
            {
              name: 'О компании',
              route: '/about',
              sublinks: false
            },
            {
              name: 'Проекты',
              route: '/projects',
            },
            {
              name: 'Аренда офисов',
              route: '/rent/offices',
              sublinks: false
            },
            {
              name: 'Аренда складов',
              route: '/rent/warehouses',
              sublinks: false
            },
            {
              name: 'Аренда торговых помещений',
              route: '/rent/retail',
              sublinks: false
            },
            {
              name: 'Помещения свободного назначения',
              route: '/rent/psn',
              sublinks: false
            },
            {
              name: 'Акции',
              route: '/promo',
              sublinks: false
            },
            {
              name: 'Контакты',
              route: '/contacts',
              sublinks: false
            }
        ],
        mobileIsActive: false,
      }
    },
    methods:{
      toggleMobileMenu() {
        this.mobileIsActive = !this.mobileIsActive;
        //this.$store.dispatch('popupToggle')
      },
      showDropDown(index) {
          this.dropDownIsShow = true
          this.dropDownIsShowIndex = index
      },
      hideDropDown(index) {
          this.dropDownIsShow = false
          this.dropDownIsShowIndex = undefined   
      },
      showDropDown2(index, el) {
          // console.log(event.currentTarget.offsetWidth)
          this.dropDownIsShow2 = true
          this.dropDownIsShowIndex2 = index
          this.menuParentWidth = event.currentTarget.offsetWidth
      },
      hideDropDown2(index) {
          this.dropDownIsShow2 = false
          this.dropDownIsShowIndex2 = undefined   
      },
      showFeedbackModal (data) {
        this.$modal.show(ModalFeedback, {
          title: 'Получить предложение',
        }, {
          draggable: false,
          width: '100%',
          height: '100%',

        },{
          // 'before-open': (event) => { this.$store.commit('setFeedbackModal', true) },
          // 'before-close': (event) => { this.$store.commit('setFeedbackModal', false) }
        })
      },

    },
    computed: {
      mainPhone() {
        return this.$store.getters['getCompany'].phone
      }
    },
    created () {

    },
    destroyed () {

    },
    mounted () {      
      this.mainmenu[1].sublinks = this.$store.getters['getProjectsMenu']('Москва')
      //this.links[0].sublinks[1].sublinks = this.$store.getters['getProjectsMenu']('Липецк')
    },  
    watch: {
      '$route' (to, from) {
        
        setTimeout(() => {
          this.mobileIsActive = false;
          this.dropDownIsShowIndex = undefined;
          this.dropDownIsShowIndex2 = undefined;
        }, 250);
        //this.$store.dispatch('popupToggle', false)
        
      }
    }
    
}
</script>


<style lang="scss">



.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s ease;
}
.slide-fade-enter { 
  transform: translateY(-5%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-5%);
  opacity: 0; 
}


.header {
    position: fixed;
    opacity: 0;
    top: 0px;
    left: 0;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    transition: all .25s ease-in-out;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 5px 20px rgba(70, 96, 140, 0.1);

    @include for-phone-only {   
      padding: 1rem 1.5rem;
    }

    @include for-tablet-portrait-up {
      padding: 0rem 3rem;
    }

    &__logo {

      @include for-phone-only {   
        max-width: 50%;
        flex: 0 0 50%;
      }
      @include for-tablet-portrait-up {
        max-width: 25%;
        flex: 0 0 25%;
      }

      a.logo {
        display: block;
        transition: all .25s ease-in-out;
        @include for-phone-only {   
          width: 125px;
        }
        @include for-tablet-portrait-up {
          width: 150px;
        }
        img {
          width: 100%;
        }
      }
    }
    &__main-nav {

      @include for-phone-only {   
        display: none;
      }
      @include for-tablet-portrait-up {
        max-width: 50%;
        flex: 0 0 50%;
        display: flex;
        justify-content: center;
      }
      @include for-tablet-landscape-up {
        display: flex;
        justify-content: center;
      }

      ul {
        list-style: none;
        display: flex;

        li {
          position: relative;
          padding: 1.75rem 1rem;

          @include for-phone-only {   
            padding: 1.75rem 1rem;
          }

          @include for-tablet-portrait-up {
            padding: 1.75rem .5rem;
          }

          @include for-desktop-up {
            padding: 1.75rem 1rem;
          }

          @include for-big-desktop-up {
            padding: 1.75rem 1rem;
          }

          a {
            font-size: .95rem;
            text-transform: uppercase;
            color: #111;
            position: relative;
            width: 100%;
            height: 100%;
            // padding-bottom: 1.75rem;

            @include for-phone-only {   
              font-size: .75rem;
            }
            @include for-tablet-portrait-up {
              font-size: .8rem;
            }
            @include for-tablet-landscape-up {
              font-size: .9rem;
            }
            &:hover, &.nuxt-link-active {
              color: $mainColor;
            }
          }

          &.submenu-exist {
            position: relative;
           
            a {
              padding-right: 14px;

              &:before {
                content: '';
                width: 9px;
                height: 6px;
                position: absolute;
                top: 5px;
                opacity: 1;
                right: 0;
                background: url('~assets/img/arr-down-menu.svg') no-repeat center center;
                @include base-transition(all);
              }  

            &:hover::before {
              transform: scaleY(-1);
              transform-origin: center;
            }

            }


          }

        }
      }

    .dropdown-menu-block {
      background: #fff;
      position: absolute;
      left: 0px;
      top: 70px;
      z-index: 999;
      padding: 1rem 0!important;
      border-radius: 0;
      width: auto;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 14px rgba(70, 96, 140, 0.2);

      &.rent {
        width: 270px;
      }

        @include for-big-desktop-up {
          width: auto;
        }


      &:before {
        content: "";
        display: block;
        position: absolute;
        top: -11px;
        left: 20px;
        vertical-align: middle;
        content: "";
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 12px solid rgba(57, 70, 78, 0.15);
        border-style: none double solid;
        width: 0;
        height: 0;
      }

      &:after {
        content: "";
        display: block;
        position: absolute;
        top: -10px;
        left: 20px;
        vertical-align: middle;
        content: "";
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 12px solid #fff;
        border-style: none double solid;
        width: 0;
        height: 0;
      }  

      .list-group {
        display: flex;
        align-items: center;
        position: relative;
      }


      a {
        font-size: .95rem;
        padding: .75rem 1.5rem .75rem 1.5rem!important;
        text-transform: uppercase;
        //white-space: nowrap;

        &:before {
          content: none!important;
        }  

          @include for-phone-only {   
            font-size: .75rem;
          }

          @include for-tablet-portrait-up {
            font-size: .75rem;
          }

          @include for-tablet-landscape-up {
            font-size: .75rem;
          }

          @include for-tablet-landscape-up {
            font-size: .8rem;
          }

          @include for-desktop-up {
            font-size: .9rem;
          }

          @include for-big-desktop-up {
            font-size: .95rem;
          }



        &.nuxt-link-active, &.nuxt-link-exact-active {
          color: #111!important;
        }
                
        &:hover {
          color: $mainColor!important;
          // background: #ebebeb;
        }
        
        .subtitle {
          color: #9B9B9B;
          font-size: .85rem;
          line-height: 1.1rem;
          text-transform: none;
        }

      }

    }

    .dropdown-menu-block2 {
      background: #ffffff;
      position: absolute;
      // right: 0px;
      top: -14px;
      left: 0px;
      z-index: 997;
      padding: 1rem 0!important;
      border-radius: 0;
      // min-width: 200px;
      display: flex;
      flex-direction: column;
      //transform: translateX(220px);
      width: auto;
      box-shadow: 0 1px 14px rgba(70, 96, 140, 0.2);

      @include for-big-desktop-up {
          //  width: 240px;
          //  transform: translateX(240px);
        }

      .list-group {
        display: flex;
        align-items: center;
      }

      a {
        font-size: .95rem;
        padding: .75rem 1.5rem .75rem 1.5rem;
        text-transform: uppercase;
        color: #111;
        white-space: nowrap;

        &:before {
          content: none!important;
        }  

          @include for-phone-only {   
            font-size: .75rem;
          }

          @include for-tablet-portrait-up {
            font-size: .75rem;
          }

          @include for-tablet-landscape-up {
            font-size: .75rem;
          }

          @include for-tablet-landscape-up {
            font-size: .8rem;
          }

          @include for-desktop-up {
            font-size: .9rem;
          }

          @include for-big-desktop-up {
            font-size: .95rem;
          }


        &:hover {
          color: $mainColor;
          // background: #ebebeb;
        }

        .subtitle {
          color: #9B9B9B;
          font-size: .75rem;
        }
      }

    }

    }


    ///
    &__right {
      display: flex;
      justify-content: flex-end;
      height: 100%;
      align-items: center;

      @include for-phone-only {   
        max-width: 50%;
        flex: 0 0 50%;
      }
      @include for-tablet-portrait-up {
        max-width: 25%;
        flex: 0 0 25%;
      }

      &-phone {
        display: flex;
        justify-content: center;
        align-items: center;

        @include for-phone-only {   
          display: none; 
          padding-right: 40px;
        }

        @include for-tablet-portrait-up {
          display: block;
          padding-right: 40px;
        }

        @include for-tablet-landscape-up {
          padding-right: 40px;
          
        }
              
        @include for-desktop-up {
          padding-right: 200px;
        }

         a {
           color: $mainColor;
           font-weight: 500;

          @include for-phone-only {   
            font-size: .8rem;
          }
      
          @include for-tablet-portrait-up {
            font-size: 1rem;
          }

          @include for-tablet-landscape-up {
            font-size: 1.15rem;
          }
          
         }
      }

      &-feedback {
          display: flex;
          justify-content: center;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          height: auto;
          width: 250px;
          align-items: center;
          background: $mainColor; 
          @include base-transition(background);
          

          @include for-phone-only {    
            display: none;
          }

          @include for-tablet-portrait-up {
            display: flex;
            width: 70px;
          }

          @include for-desktop-up{
            width: auto;
          }

          &.mobile {

            cursor: pointer;

            svg {
              float: right;
              width: 24px;
            }

            &:hover {
              background: $mainColorHover;
              color:#fff
            }

          } 
          a {
            color: #fff;
            padding: 0 20px;
            width: 100%;
            border: 1px solid $mainColor;
            border-radius: 1px;
            display: block;
            height: 100%;
            text-align: center;
            text-decoration: none;
            text-transform: none;
            font-weight: 600;
            letter-spacing: 0px;
            transition-property: background;
            transition-duration: .25s;
            transition-timing-function: ease;
            display: flex;
            align-items: center;
            justify-content: center;

            @include for-phone-only {    
              font-size: .75rem; 
              //padding: 8px 8px;
            }

            @include for-tablet-portrait-up {
              font-size: .75rem; 
              //padding: 8px 8px;
            }

            @include for-tablet-landscape-up {
              font-size: .95rem;
              //padding: 12px 16px;
            }

            @include for-big-desktop-up {
              font-size: .95rem;
              //padding: 15px 20px;
            }

            &:hover {
              background:$mainColorHover;
              color:#fff
            }
        }

        a {

          @include for-phone-only {    
            display: none!important;
          }

          @include for-tablet-portrait-up {
            display: none!important;
          }

          @include for-desktop-up {
            display: flex!important;
          }
          
        }

        svg{

          @include for-phone-only {    
            display: flex!important;
          }

          @include for-tablet-portrait-up {
            display: flex!important;
          }

          @include for-desktop-up {
            display: none!important;
          }

        }


      }
      
      &-burger {        
        position: relative;
        width: 35px;
        height: 18px;
        cursor: pointer;

        @include for-phone-only {   
            display: block; 
            margin-left: 0px;
            width: 25px;
        }

        @include for-tablet-portrait-up{    
            display: none;
            margin-left: 0px;
            width: 25px;
        }

        .line {
            position: absolute;
            width: 100%;
            height: 2px;
            background: #000;
            transition: all .4s ease-in-out;
            right: 0;
            
            &:first-child {
                top: 0;
            }

            &:nth-child(2n) {
                top: 45%;
                width: 75%;
            }
            
            &:last-child {
                bottom: 0;
                width: 50%;
            }
        }

        &:hover {

            .line {
                
                &:last-child {
                    width: 100%;
                }

            }
        }  

        &.active {

            .line {
            
                &:first-child {
                    transform: translateY(8px) rotate(-45deg)
                }

                &:nth-child(2n) {
                    top: 42.5%;
                    opacity: 0;
                }
                
                &:last-child {
                    transform: translateY(-8px) rotate(45deg);
                    width: 100%;
                }
            }
        }  
      }

      &-phone-m  {
        position: relative;
        width: 20px;
        height: 20px;
        margin-right: 1rem;
        cursor: pointer;
        opacity: .75;

        @include for-phone-only {    
          display: block;
        }

        @include for-tablet-portrait-up {
          display: none;
        }

        &:hover {
          opacity: 1;
        }
        &:before {
          content: '';
          background-image: url('~assets/img/ic-phone-header.svg');
          background-repeat: no-repeat;
          background-size: 100%;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
        }

      }

    }
 
}

.visible header {
  opacity: 1;
  top: 0;
}

.mob-header-burgerer {

    @include for-phone-only {   
      display: block;
    }

    @include for-tablet-portrait-up {
       display: block;
    }

    @include for-tablet-landscape-up {
       display: none;
    }

    @include for-desktop-up {
      display: none;
    }
          
    @include for-big-desktop-up {
      display: none;
    }

}


.mobile-menu {
    position: fixed;
    top: 45px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 45px);
    background:rgba(255,255,255,0.95);
    justify-content: center;
    align-items: center;
    z-index: 999;
    transition: opacity .75s ease, visibility .75s ease;
    display: flex;
    opacity: 0;
    visibility: hidden;
  
  
    ul {
      margin-top: -60px;
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: center;
  
      li {
        padding: 10px 50px;
        @include base-transition(all);
        opacity: 0;
        transform: translateY(20px);
    
          
        a {
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
          color: $mainColorText;
          font-size: 1.15rem;
          line-height: 1.75;
          
            &:hover, &.nuxt-link-exact-active {
              color: $mainColor;
              text-decoration: none;
            }
  
        }
      }
    }

    &.active {
        opacity: 1;
        visibility: visible;
  
        li {
            opacity: 1;
            transform: translateY(0px);
        }

        li:nth-child(1) { transition-delay: 0s }
        li:nth-child(2) { transition-delay: .1s }
        li:nth-child(3) { transition-delay: .2s }
        li:nth-child(4) { transition-delay: .3s }
        li:nth-child(5) { transition-delay: .4s }
        li:nth-child(6) { transition-delay: .5s }
        li:nth-child(7) { transition-delay: .6s }
        li:nth-child(8) { transition-delay: .7s }
        
      }
  }

  @keyframes menuIsActive {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
  
    to {
        opacity: 1;
        transform: translateY(0px);
    }
  }




</style>
