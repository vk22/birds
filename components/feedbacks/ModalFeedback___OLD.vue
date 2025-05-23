<template>
<div class="feedback-modal-overlay">
      <div class="feedback-modal-close" @click="$emit('close')">          
        <svg width="18px" height="17px" viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                <g id="LandingPopup" transform="translate(-983.000000, -267.000000)" stroke="#111">
                    <g id="Group-6">
                        <g id="Group-5" transform="translate(420.000000, 243.000000)">
                            <path d="M571.87315,32.8400752 L582.911677,32.8400752 L571.87315,32.8400752 L571.87315,21.6856907 L571.87315,32.8400752 Z M571.87315,32.8400752 L560.911677,32.8400752 L571.87315,32.8400752 L571.87315,44.0437203 L571.87315,32.8400752 Z" id="Combined-Shape" transform="translate(571.911677, 32.864706) rotate(-315.000000) translate(-571.911677, -32.864706) "></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      </div>
    <div class="feedback-modal-wrap feedback-in-modal">
    
      <div class="heading slideUp fade-in-form" v-if="!responseStatus"><span>{{ title }}</span></div>
      <!-- <div class="line slideUp fade-in-form" v-if="!responseStatus"></div> -->

      <div class="feedback-modal-container slideUp fade-in-form" v-if="!responseStatus">

              <div class="field" v-bind:class="{ 'has-error': hasErrorName }">
                <div class="control">
                  <input class="input" type="text" v-model="feedback.name" :placeholder="'Имя*'">
                </div>
              </div>
              <div class="field" v-bind:class="{ 'has-error': hasErrorPhone }">
                <div class="control">
                  <input class="input" type="phone" v-mask="'+7(###)-###-####'" v-model="feedback.phone" placeholder="+7(999)-999-9999*" value="">
                </div>
              </div>
              <div class="field" v-bind:class="{ 'has-error': hasErrorEmail }">
                <div class="control">
                  <input class="input" type="email" v-model="feedback.email" :placeholder="'Email'" value="">
                </div>
                <div class="errors" v-if='hasErrorEmailMessage'>{{ hasErrorEmailMessage }}</div>
              </div>
              <div class="field is-grouped feedback-form-footer">
                <div class="control">
                  <button class="main-btn-send" @click="sendFeedback()">Отправить</button>
                </div>
              </div>   

              <div class="alright">
                      Нажимая на кнопку "Отправить", вы выражаете свое <nuxt-link :to="'/personal-data'">согласие на обработку ваших персональных данных</nuxt-link>
              </div>

        </div>

        <div class="success-message" :class="{'show': responseStatus}">
          <svg class="success-icon" viewBox="0 0 45 42">
              <path d="M40.2765 14.3333L43.7832 17.0886C44.0245 17.2782 44.1654 17.5681 44.1654 17.8749V38.7222C44.1654 39.8268 43.2699 40.7222 42.1654 40.7222H2.83203C1.72746 40.7222 0.832031 39.8268 0.832031 38.7222V18.1527C0.832031 17.8458 0.972919 17.556 1.21421 17.3664L4.72092 14.6111M30.5543 7.11111L22.8009 1.22925C22.6222 1.09371 22.3752 1.09371 22.1965 1.22925L14.4431 7.11111" stroke="$mainColor"></path>
              <path d="M4.72266 21.278V7.11133H40.2782V21.5558M44.1671 19.0558L28.3338 28.2224" stroke="$mainColor"></path>
              <path d="M0.832031 19.0566L16.6654 28.2233M1.10981 40.1678L22.192 24.0138C22.3727 23.8754 22.624 23.8765 22.8035 24.0163L43.8876 40.4455" stroke="$mainColor"></path>
              <path d="M10.6367 12.541H35.1822" stroke="$mainColor" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M10.6367 16.2227H35.1822" stroke="$mainColor" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M10.6367 19.9043H25.9776" stroke="$mainColor" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>  
          {{responseMessage}}
          <p>{{responseMessage2}}</p>
        </div>  
    </div>   
</div>     
</template>

<script>
export default {
    props: ['title'],
    name: 'myModal',
    data () {
      return {
        feedback: {
          name: '',
          email: '',
          phone: ''
        },
        errors: [],
        hasErrorPhone: false,
        hasErrorName: false,
        hasErrorEmail: false,
        hasErrorEmailMessage: '',
        responseMessageEmail: '',
        responseMessage: 'Ваша заявка принята',
        responseMessage2: 'Менеджер свяжется с Вами в ближайшее время',
        responseStatus: false,
        termsChecked: false,
        isShow: false
      }
    },
    methods: {
      async sendFeedback() {

        this.errors = [];

        if (!this.feedback.name) {
          this.errors.push('Укажите Имя');
          this.hasErrorName = true;
        }

        if (!this.feedback.phone) {
          this.errors.push('Укажите телефон');
          this.hasErrorPhone = true;
        }
        if (this.feedback.email != '' && !this.validEmail(this.feedback.email)) {
          this.errors.push('Укажите корректный адрес электронной почты');
          this.hasErrorEmail = true;
          this.hasErrorEmailMessage = 'Укажите корректный адрес электронной почты';
          //this.hasErrorEmail = true;
        } 
        
         if (!this.errors.length) {

          const response = await this.$axios.$post('/send-email/', {title: this.title, feedback: this.feedback})
          console.log('response: '+JSON.stringify(response))

          if (response.success) {
            this.errors = [];
            this.feedback.name = '';
            this.feedback.email = '';
            this.feedback.message = '';
            this.responseMessage = response.message;
            this.responseStatus = true;
          }

        }


      },  
      validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      isElemVisible(el) {
          var rect = el.getBoundingClientRect()
          var elemTop = rect.top// 200 = buffer
          var elemBottom = rect.bottom
          return elemTop < window.innerHeight && elemBottom >= 0
      },
      handleScroll() {
        console.log('handleScroll')
          var interval = 150;
          var fadeInElements = Array.from(document.getElementsByClassName('fade-in-form'))
          for (let i = 0; i < fadeInElements.length; i++) {
            console.log('i: ', i)
              setTimeout(function () {
                  var elem = fadeInElements[i]
                  if (this.isElemVisible(elem)) {
                    elem.style.opacity = '1'
                    elem.style.transform = 'translateY(0px)'
                    //elem.classList.add("show")
                    //fadeInElements.splice(i, 1) // only allow it to run once
                  }
              }.bind(this), i * interval);

          }

      }
    }, 
    mounted() {
      setTimeout(() => {
          this.handleScroll()
      }, 150);
    },
    computed: {
      feedbackModalIsActive() {
        return this.$store.state.feedbackModalIsActive;
      }
    }
 }
</script>


<style lang="scss">



.v--modal-overlay {
   z-index: 9999!important;
}

.v--modal-overlay .v--modal-box {
   background:  transparent;
   z-index: 9999;
}

.feedback-modal-overlay {
   background:  rgba(255, 255, 255, 0.95);
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
}


.feedback-modal-wrap {    
  position: absolute;
  width: 500px;
  left: 50%;
  right: 0;
  padding: 40px 30px;
  transform: translateX(-50%);
  top: 20%;

  @include for-phone-only {  
      width: calc(100% - 2rem);
      margin: 1rem;
      padding: 2rem 1rem;
  }
  @include for-tablet-portrait-up {  
      width: calc(100% - 2rem);
      margin: 1rem;
      padding: 2rem 1rem;
  }
  @include for-tablet-landscape-up {
      width: 500px;
      margin: 1rem;
      padding: 2rem 1rem;
  }
  @include for-desktop-up {
      width: 500px;
      padding: 40px 30px;
  }
  @include for-big-desktop-up {
      // top: 12%;
      padding: 40px 30px;
  }

  @include for-min-height-only {  
      padding: 1.5rem;
      width: 90%;
      max-height: auto;
      min-height: 200px;
  }

  @include for-all-height-up {  
      padding: 2.5rem 1.5rem;
      max-height: auto;
      min-height: 200px;
  }
  
}

.feedback-modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
  transition-property: opacity;
  transition-duration: .25s;
  transition-timing-function: ease-out;
  z-index: 99;
  width: 30px;
  height: 30px;
}

.feedback-modal-close svg{
  width: 100%;
  height: 100%;
}

.feedback-modal-close:hover {
  opacity: .5;
}

.feedback-modal-wrap .heading {
    letter-spacing: px;
    font-weight: 400;
    line-height: 1.45;
    text-align: left;
    margin: 0px 0 2rem;

    @include for-phone-only {    
        font-size: 1.15rem;
    }
    @include for-tablet-portrait-up {  
       font-size: 1.25rem;
    }
    @include for-desktop-up {
        font-size: 1.75rem;
    }
    @include for-big-desktop-up {
        font-size: 2rem;
    }
}

.feedback-modal-wrap .line {
    height: 3px;
    width: 100px;
    background-color: $mainColor;
    display: block;
    width: 100px;

    @include for-phone-only {  
        margin-bottom: 1rem;
    }
    @include for-tablet-portrait-up {  
        margin-bottom: 2.25rem;
    }
    @include for-desktop-up {
        margin-bottom: 2.75rem;
    }
    @include for-big-desktop-up {
        margin-bottom: 3rem;
    }
}

.feedback-modal-container {
    display: flex;
    flex-direction: column;
    padding: 0 0px;
    
    @include for-phone-only {  
        padding: 0 0px;
    }
    @include for-tablet-portrait-up {  
        padding: 0 0px;
    }


  .form-wrap {
      display: flex;
    

      @include for-min-height-only {  
          flex-direction: row;
      }

      @include for-all-height-up {  
          flex-direction: column;
      }
  }    
}

.form-col {
  padding-right: 20px;

      @include for-min-height-only {  
        width: 50%;
      }

      @include for-all-height-up {  
          width: 100%;
      }

      @include for-phone-only {  
        padding-right: 0px;
      }

    &:first-child {
      margin-bottom: 10px;
    }  

}

.feedback-send {
    padding: 17px 20px!important;
    width: 70%;
    border: 1px solid $mainColor;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 13px;
    letter-spacing: 1.5px;
    background: $mainColor;
    color: #fff;
    cursor: pointer;  
    transition-property: all;
    transition-duration: .25s;
    transition-timing-function: ease-out;
    border-radius: 0px;
    clip-path: polygon(0 0,99.7% 0,95.1% 100%,0 100%);
}

.feedback-send:hover {
    background: #c75606;
    background: #c75606;
    color: #fff;
}

.feedback-form-footer {
    justify-content: flex-end!important;
    margin-top: .25rem;
}

.alright {

    @include for-phone-only {    
      font-size: .55rem;
      line-height: 1.15;
      margin-top: .75rem;
    }
    @include for-tablet-portrait-up {  
      font-size: .65rem;
      line-height: 1.25;
      margin-top: 1rem;
    }

}



.field.has-error .error {
  display: block;
}


// ::placeholder {
//   color: #444;
//   font-size: 1rem;
// }


</style>
