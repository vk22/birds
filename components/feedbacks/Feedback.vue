<template>
    <div class="feedback-block">
      <b-container>
        <b-row>
          <b-col md="12">
            <div class="heading"><span>{{ title }}</span></div>
            <span class="line"></span>
            <div class="form-container" v-if="!responseStatus">
              <b-row class="form-wrap form">
                <b-col md="6" class="part">
                    <div class="field" v-bind:class="{ 'has-error': hasErrorName }">
                      <div class="control">
                        <input class="input" type="text" v-model="feedback.name" placeholder="Имя*">
                      </div>
                    </div>
                    <div class="field" v-bind:class="{ 'has-error': hasErrorPhone }">
                      <div class="control">
                        <input class="input" type="phone" v-mask="'+7(###)-###-####'" v-model="feedback.phone" placeholder="+7(999)-999-9999*" value="">
                      </div>
                    </div>
                    <div class="field" v-bind:class="{ 'has-error': hasErrorEmail }">
                      <div class="control">
                        <input class="input" type="email" v-model="feedback.email" :placeholder="placeholderEmail" value="">
                      </div>
                      <div class="errors" v-if='hasErrorEmailMessage'>{{ hasErrorEmailMessage }}</div>
                    </div>
                </b-col>
                <b-col md="6" class="part">
                    <div class="field">
                      <div class="control">
                        <textarea class="textarea" v-model="feedback.message" placeholder="Сообщение"></textarea>
                      </div>
                    </div>
                    <div class="field is-grouped feedback-form-footer">
                      <div class="control">
                        <button class="main-btn-send" @click="sendFeedback()">Отправить</button>
                      </div>
                    </div>   
                     <div class="alright ">
                      Нажимая на кнопку "Отправить", вы выражаете свое <nuxt-link :to="'/personal-data'">согласие на обработку ваших персональных данных</nuxt-link>
                    </div>
                </b-col>
                </b-row>
            </div>

            <div class="success-message" :class="{'show': responseStatus}">
              <svg class="success-icon" viewBox="0 0 45 42">
                  <path d="M40.2765 14.3333L43.7832 17.0886C44.0245 17.2782 44.1654 17.5681 44.1654 17.8749V38.7222C44.1654 39.8268 43.2699 40.7222 42.1654 40.7222H2.83203C1.72746 40.7222 0.832031 39.8268 0.832031 38.7222V18.1527C0.832031 17.8458 0.972919 17.556 1.21421 17.3664L4.72092 14.6111M30.5543 7.11111L22.8009 1.22925C22.6222 1.09371 22.3752 1.09371 22.1965 1.22925L14.4431 7.11111" stroke="#555555"></path>
                  <path d="M4.72266 21.278V7.11133H40.2782V21.5558M44.1671 19.0558L28.3338 28.2224" stroke="f"></path>
                  <path d="M0.832031 19.0566L16.6654 28.2233M1.10981 40.1678L22.192 24.0138C22.3727 23.8754 22.624 23.8765 22.8035 24.0163L43.8876 40.4455" stroke="#555555"></path>
                  <path d="M10.6367 12.541H35.1822" stroke="#555555" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M10.6367 16.2227H35.1822" stroke="#555555" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M10.6367 19.9043H25.9776" stroke="#555555" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>  
              {{responseMessage}}
            </div> 

          </b-col>
        </b-row>
      </b-container>
    </div>       
</template>

<script>
export default {
    props: ['order'],
    name: 'myModal',
    data () {
      return {
        title: 'Обратная связь',
        feedback: {
          name: '',
          email: '',
          phone: '',
          message: ''
        },
        errors: [],
        hasErrorPhone: false,
        hasErrorName: false,
        hasErrorEmail: false,
        hasErrorEmailMessage: '',
        placeholderEmail: 'Email',
        responseMessage: 'dsdsddsdsd edwdsdsd dsdsddsds',
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
          var elemTop = rect.top + 200 // 200 = buffer
          var elemBottom = rect.bottom
          return elemTop < window.innerHeight && elemBottom >= 0
      },
      handleScroll() {
        console.log('handleScroll')
          var interval = 250;
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
      }, 250);
    },
    computed: {
      feedbackModalIsActive() {
        return this.$store.state.feedbackModalIsActive;
      }
    }
 }
</script>


<style lang="scss">




.feedback-block {    
  position: relative;
  width: 100%;
  background: transparent;
  padding: 4rem 0 4rem;
  min-height: 250px;

  @include for-phone-only {  

  }
  @include for-tablet-portrait-up {  

  }
  @include for-tablet-landscape-up {


  }
  @include for-desktop-up {

  }
  @include for-big-desktop-up {

  }

  @include for-min-height-only {  
      width: 90%;
      max-height: auto;
      min-height: 250px;
  }

  @include for-all-height-up {  
      max-height: auto;
      min-height: 250px;
  }

  ///////
  .heading {
      margin: 0px 0 2rem;
      letter-spacing: .5px;
      font-weight: 400;
      line-height: 1.45;
      text-transform: uppercase;
      text-align: left;

      @include for-phone-only {    
          font-size: 1.15rem;
          margin: 0px 0 2rem;
      }
      @include for-tablet-portrait-up {  
        font-size: 1.25rem;
        margin: 0px 0 2rem;
      }
      @include for-desktop-up {
          font-size: 1.5rem;
          margin: 0px 0 2rem;
      }
      @include for-big-desktop-up {
          font-size: 1.75rem;
          margin: 0px 0 2rem;
      }
  }

  .line {
      height: 3px;
      width: 100px;
      background-color: #555555;
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


  input, textarea {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      color: #111;
      background-color: transparent;
      border: 1px solid rgb(199, 199, 199);
      //border-bottom: 1px solid #909090;
      box-shadow: none;
      padding: 0.75rem .5rem;
      
      width: 100%;

      @include for-phone-only {  
          height: 3.5rem;
          font-size: .85rem;
      }     
      @include for-tablet-portrait-up {
          height: 3.5rem;
      }
      @include for-desktop-up {

      }
      @include for-big-desktop-up {

      }

    &:focus {
      outline: none;
    }
  }

  textarea {
      background-color: transparent;
      border: 1px solid rgb(199, 199, 199);
      box-shadow: none;
      padding: 0.75rem .5rem;
      height: 7.5rem;
      width: 100%;
  }

  .field:not(:last-child) {
      margin-bottom: .5rem;
  }

  .field .label:not(:last-child) {
      margin-bottom: .15rem;
  }

  .errors{
      position: relative;

  }

  .errors ul, .errors {
      list-style: none;
      margin: 0;
      padding: 0;
      color: #dc3545;
      font-size: 13px;
  }

  .field.has-error label, .field.has-error a{
    color: #dc3545 !important;
  }

  .field.has-error input{
    border: 1px solid #dc3545 !important;
  }

  .field .error {
    display: none;
    color: #dc3545 !important;
  }

  .form-container {
      display: flex;
      flex-direction: column;
      
      @include for-phone-only {  
      }
      @include for-tablet-portrait-up {  
      }


    .form-wrap {
        display: flex;
        width: 100%;
      
        @include for-min-height-only {  
            flex-direction: row;
        }

        @include for-all-height-up {  
            flex-direction: row;
        }

        .part {
            @include for-phone-only {  
                margin-bottom: .5rem;
            }
            @include for-tablet-portrait-up {  

            }
        }
    }    
  }

  .form-col {
    padding-right: 20px;

        @include for-min-height-only {  
          width: 50%;
        }

        @include for-all-height-up {  
            width: 50%;
        }

        @include for-phone-only {  
          padding-right: 0px;
        }

      &:first-child {
        margin-bottom: 10px;
      }  

  }

  // .feedback-send {
  //     padding: 15px 20px!important;
  //     width: 50%;
  //     border: 1px solid #555555;
  //     text-transform: none;
  //     text-align: left;
  //     font-weight: 400;
  //     font-size: 1rem;
  //     letter-spacing: .5px;
  //     color: #fff;
  //     cursor: pointer;  
  //     transition-property: all;
  //     transition-duration: .25s;
  //     transition-timing-function: ease-out;
  //     border-radius: 0px;
  //     clip-path: polygon(0 0,99.7% 0,95.1% 100%,0 100%);
  //     margin-top: -6px;
  //     background-color: #555555;
  //     background-size: 10%;
  //     background-repeat: no-repeat;
  //     background-position: right 30px center;
  //     background-image: url('~assets/img/ar-next.svg');

  //     &:hover {
  //       background-position: right 25px center;
  //       background-color:#555555Hover;
  //     }
  // }



  .feedback-form-footer {
      justify-content: flex-end!important;
      margin-top: .25rem;
  }

  .allrigth {

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

.success-message {
    position: absolute;
    top: 0;
    left: 0;
    color: #111;
    font-weight: 400;
    min-height: 450px;
    font-size: 1.65rem;
    text-transform: uppercase;
    width: 100%;
    transform: translateY(-15px);
    opacity: 0;
    visibility: hidden;
    transition: all .75s ease;
    padding: 40px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background: #fff;
    // box-shadow: 0 1px 20px rgba(0, 0, 0, 0.15);

    &.show {
        transform: translateY(0px);
        opacity: 1;
        visibility: visible;
    }

    .success-icon {
      position: relative;
      width: 72px;
      margin-bottom: 2rem;
      fill: transparent;
      z-index: 1;
    }

    p {
      margin-top: .5rem;
      text-transform: none;
      font-size: 1rem;
      font-weight: 400;
      font-style: normal;
    }

    small {
      font-size: 1.15rem;
      text-transform: none;
    }
}

  .field.has-error .error {
    display: block;
  }


  // ::placeholder {
  //   color: #999;
  //   font-size: 1rem;
  // }


}







</style>
