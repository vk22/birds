<template>
  <div class="landing" v-bind:class="{visible: isShow}">
    <header>
      <div class="social">
        <span><a href="#" class="fb"></a></span>
        <span><a href="#" class="ig"></a></span>
      </div>
      <div class="logo"><img src="~assets/img/logo.png" alt=""></div>
      <div class="feedback">
          <a href="#" @click="showFeedbackModal()">Написать нам</a>
          <!-- <a href="#" @click="showSubscribeModal()">Подписка</a> -->
      </div>
    </header>
    <main>
      <div class="one-screen-slider">

        <div class="slider-text">
          <div class="title">The Endless summer</div>
          <div class="subtitle">comming soon</div>  
        </div>
 
        <transition-group class="slider-img" name='fade' tag='div'>
            <div class="slide" v-for="number in [currentNumber]" :key='number'>
              <img :src="currentImage"/>
            </div>
        </transition-group>
             
      </div>

    </main>
    
  </div>
</template>

<script>

import ModalFeedback from '~/components/ModalFeedback.vue'
import ModalSubscribe from '~/components/ModalSubscribe.vue'
import slider1 from '~/assets/img/slider-1.jpg'
import slider2 from '~/assets/img/slider-2.jpg'
import slider3 from '~/assets/img/slider-3.jpg'
import slider4 from '~/assets/img/slider-4.jpg'
import slider5 from '~/assets/img/slider-5.jpg'

export default {
  components: { 
      ModalFeedback,
      ModalSubscribe

  },
  data() {
    return {
      images: [
        slider1, 
        slider2, 
        slider3, 
        slider4],
        
      currentNumber: 0,
      timer: null,
      isShow: false,
      newsletterIsActive: false,
      newsletter: {
        email: ''
      }

    }
  },
  mounted: function () {
        this.startRotation();
        setTimeout(() => {
            this.isShow = true;
          }, 500);

        setTimeout(() => {
            this.showSubscribeModal()
            //this.newsletterIsActive = true;
          }, 3000);   
        this.checkWindowBlur()   
        this.checkWindowFocus()
},
  methods: {
      startRotation: function() {
        //console.log('startRotation')
          this.timer = setInterval(this.next, 7000);
      },

      stopRotation: function() {
        //console.log('stopRotation')
          clearTimeout(this.timer);
          this.timer = null;
      },

      next: function() {
          this.currentNumber += 1
      },
      prev: function() {
          this.currentNumber -= 1
      },
      showFeedbackModal (data) {
        this.$modal.show(ModalFeedback, {
        }, {
          draggable: false,
          width: 600,
          height: 410,

        },{
          //'before-open': this.beforeOpen(data),
          // 'before-close': this.beforeClose
        })
      },
      showSubscribeModal (data) {
        this.$modal.show(ModalSubscribe, {
        }, {
          draggable: false,
          width: 700,
          height: 340,

        },{
          //'before-open': this.beforeOpen(data),
          // 'before-close': this.beforeClose
        })
      },
      hideOrderModal () {
        this.$modal.hide(ModalSubscribe);
      },
      newsletterToggle: function(){
            this.newsletterIsActive = !this.newsletterIsActive;
      },
      emailSend() {

      },
      checkWindowBlur() {
        var counter = 0;
        window.addEventListener('blur', function() {
            counter++;
            //console.log('Ушли! ' + counter);
            this.stopRotation()
        }.bind(this), false);
      },
      checkWindowFocus() {
        var counter = 0;
        window.onfocus = function(event) {
            counter++;
            //console.log('Зашли: ' + counter);
            this.startRotation();
        }.bind(this);
      }
  },
  
  computed: {
    // currentImage2: function() {
    //   return Math.abs(this.currentNumber) % this.images.length;
    // },
    currentImage: function() {
      	return this.images[Math.abs(this.currentNumber) % this.images.length];
      }
  },
  beforeRouteLeave (to, from, next) {
      this.$modal.hide();
      next()
    }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=EB+Garamond:400,400i,500,500i,700,700i|Open+Sans:300,400,600,700&display=swap&subset=cyrillic');

body {
  background: #000;
  font-family: 'Open Sans', sans-serif;
}

@keyframes header-on {
    0% {top: -200px;}
    100% {top: 0;}
}

header {
  position: absolute;
  opacity: 0;
  top: -50px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 999;
  padding: 2rem 4rem;
  transition-property: opacity, top;
  transition-duration: 1s;
  transition-timing-function: ease;
  transition-delay: .25s;

}
.visible header {
  opacity: 1;
  top: 0;
}

header .logo{
  width: 300px;
}

header .logo img {
  width: 100%;
}

.social {
    width: 200px;
    display: flex;
    justify-content: flex-start;
    height: max-content;
    padding-top: 25px;
}

.social span {
    padding-right: 20px;
}

.social .fb {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url('~assets/img/ic-fb.svg')
}

.social .ig {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url('~assets/img/ic-ig.svg')
}

.social a {
  transition-property: opacity;
  transition-duration: .25s;
  transition-timing-function: ease;
}

.social a:hover {
  opacity: .75
}

.feedback {
    width: 200px;
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
}

.feedback a {
    color: #fff;
    padding: 10px 15px;
    background:rgba(255, 255, 255, 0);
    border: 1px solid #ffffff2b;
    border-radius: 1px;
    display: block;
    height: max-content;
    text-decoration: none;
    text-transform: uppercase;
    font-size: .75rem;
    font-weight: 600;
    letter-spacing: 1px;
    transition-property: background-color;
    transition-duration: .25s;
    transition-timing-function: ease;
}

.feedback a:hover {
    background-color:rgba(255, 255, 255, 0.05);
}

.one-screen-slider {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}



.slider-text {
  color: #fff;
  text-shadow: 0 1px 1px #0000001f;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 5px;
  z-index: 99;
  opacity: 0;
  transform: translate3d(0px,50px,0px);
  transition-property: transform, opacity;
  transition-duration: 1s;
  transition-timing-function: ease;
  transition-delay: .25s;
}

.visible .slider-text {
  opacity: 1;
  transform: translate3d(0px,0px,0px);
}


.slider-text .title{
  font-size: 4rem;
  margin-bottom: 2rem;
}

.slider-text .subtitle{
  font-size: 1.5rem;
  letter-spacing: 15px;
  font-weight: 300;

}

.slider-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition-property: opacity;
  transition-duration: 1s;
  transition-timing-function: ease;
  opacity: 0;
}

.visible .slider-img{
  opacity: .85;
}


.fade-enter-active, .fade-leave-active {
  transition: all 3s ease;
  overflow: hidden;
  visibility: visible;
  opacity: 1;
  position: absolute;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  visibility: hidden;
}


.slide {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-position: center center;
  background-size: cover; 
}

.slide img {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    object-fit: cover;
}

.slide-0 {
 background-image: url('~assets/img/slider-1.jpg')
}

.slide-1 {
 background-image: url('~assets/img/slider-2.jpg')
}

.slide-2 {
 background-image: url('~assets/img/slider-3.jpg')
}

.slide-3 {
 background-image: url('~assets/img/slider-4.jpg')
}

section {
  display: none;
}

.newsletter {
  position: fixed;
  width: 100%;
  height: 250px;
  bottom: -250px;
  background: #bf8a7da6;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  transition-property: opacity, bottom;
  transition-duration: 1s;
  transition-timing-function: ease;
  opacity: 0;
}

.newsletter.active {
  opacity: 1;
  bottom: 0;
}

.newsletter .newsletter-close {
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  transition-property: transform;
  transition-duration: .25s;
  transition-timing-function: ease-out;
}

.newsletter .newsletter-close:hover {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    transform: rotate(-90deg);
}

.newsletter .text, .newsletter .form {
  position: relative;
  width: 400px;
}

.newsletter .text{
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
}

.newsletter .text .title{
  font-size: 3rem;
  font-family: 'EB Garamond', serif;
  font-weight: 400;
  font-style: normal;
}

.newsletter .text .subtitle{
  font-size: .85rem;
}

.newsletter .form input {
    width: 100%;
    padding: 1rem;
    background: transparent;
    border: 1px solid #fff;
}

.newsletter .form input[type="email"]::placeholder { color: #fff; } 

.newsletter .form .email-send {
    color: #fff;
    position: absolute;
    right: 0;
    top: 0;
    padding: .75rem 1.5rem;
    border-left: 1px solid #fff;
}



@media (min-width: 320px) and (max-width: 480px) { 
  
  header {
    flex-direction: column-reverse;
    align-items: center;
  }
  header .logo {
    width: 250px;
  }
  header .social {
    position: fixed;
    bottom: 6rem;
    left: 50%;
    margin-left: -100px;
    justify-content: center;
  }

  header .social span{
    padding: 0 10px;
  }

  header .feedback {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    margin-left: -100px;
    justify-content: center;
  }

  .slider-text .title {
      font-size: 2.5rem;
      margin-bottom: 2rem;
  }

  .slider-text .subtitle {
    font-size: 1rem;
    letter-spacing: 10px;
    font-weight: 300;
  }

  .v--modal-overlay .v--modal-background-click {
    display: flex;
    justify-content: center;
  }

  .v--modal-overlay .v--modal-box {
      width: 90%!important;
      left: 0!important;
      top: 18vh!important;
      height: 420px!important;
  }

  .newsletter {
    display: none;
  }

}

</style>
