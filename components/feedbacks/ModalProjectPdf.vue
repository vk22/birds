<template>
<div class="project-pdf-modal-overlay">

      <div class="project-pdf-modal-close" @click="$emit('close')">          
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

    <div class="project-pdf-modal-wrap ">
      <b-row>
        <b-col>
          <div class="heading slideUp fade-in-form" v-if="!responseStatus">
            <span>Отправить презентацию проекта</span></div>
          <span class="line slideUp fade-in-form" v-if="!responseStatus"></span>
        </b-col>
      </b-row>
    
      <b-row>
        <b-col md="6">
          <div class="project-pdf-project-container slideUp fade-in-form" v-if="!responseStatus">
            <b-row>
              <b-col>
                <img class="cover" v-lazy="'/uploads/projects/'+project.id+'/'+project.cover" alt="">
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <div class="title">{{ project.title }}</div>
                <div class="subtitle">{{ project.type }}</div>
              </b-col>
            </b-row>
          </div>       
        </b-col>
        <b-col md="6">
          <div class="project-pdf-user-container slideUp fade-in-form" v-if="!responseStatus">

              <div class="field" v-bind:class="{ 'has-error': hasErrorEmail }">
                <div class="control">
                  <input class="input" type="email" v-model="user.email" placeholder="Email*" value="">
                </div>
                <div class="errors" v-if='hasErrorEmailMessage'>{{ hasErrorEmailMessage }}</div>
              </div>
              <div class="field is-grouped project-pdf-form-footer">
                <div class="control">
                  <button class="main-btn-send" :class="{ 'waiting': waiting }" @click="sendFeedback()">Отправить</button>
                </div>
              </div>   
              <div class="alright">
                  Нажимая на кнопку "Отправить", вы выражаете свое <nuxt-link :to="'/personal-data'">согласие на обработку ваших персональных данных</nuxt-link>
              </div>
          </div>          
        </b-col>

      </b-row>

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
    props: ['project'],
    name: 'myModal',
    data () {
      return {
        user: {
          name: '',
          email: '',
          phone: ''
        },
        errors: [],
        hasErrorPhone: false,
        hasErrorName: false,
        hasErrorEmail: false,
        hasErrorEmailMessage: '',
        placeholderEmail: 'Email',
        responseMessage: 'Спасибо за обращение',
        responseMessage2: 'Презентация отправлена на указанную почту',
        responseStatus: false,
        termsChecked: false,
        isShow: false,
        //waiting: false
      }
    },
    methods: {
      async sendFeedback() {
        //this.waiting = true

        this.errors = [];

        // if (!this.user.name) {
        //   this.errors.push('Укажите Имя');
        //   this.hasErrorName = true;
        // }

        // if (!this.user.phone) {
        //   this.errors.push('Укажите телефон');
        //   this.hasErrorPhone = true;
        // }

        if (this.user.email === '') {
          this.errors.push('Укажите адрес электронной почты');
          this.hasErrorEmail = true;
          //this.hasErrorEmailMessage = 'Укажите адрес электронной почты';
          //this.hasErrorEmail = true;
        } 

        if (this.user.email != '' && !this.validEmail(this.user.email)) {
          this.errors.push('Укажите корректный адрес электронной почты');
          this.hasErrorEmail = true;
          this.hasErrorEmailMessage = 'Укажите корректный адрес электронной почты';
        }
        
         if (!this.errors.length) {

          const response = await this.$axios.$post('/send-project-pdf/', {email: this.user.email, project: this.project})
          console.log('response: '+JSON.stringify(response))

          if (response.success) {
            this.errors = [];
            this.user.name = '';
            this.user.email = '';
            this.user.message = '';
            //this.responseMessage2 = response.message;
            this.responseStatus = true;
            //this.waiting = false
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
      }, 250);
    },
    computed: {
      waiting() {
          return !this.validEmail(this.user.email)
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

.project-pdf-modal-overlay {
   background:  rgba(255, 255, 255, 0.95);
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
}

.project-pdf-modal-wrap {    
  position: absolute;
  left: 50%;
  right: 0;
  padding: 4rem 3rem!important;
  transform: translateX(-50%);

  @include for-phone-only {  
      top: 10%;
      width: 100%;
      padding: 2rem 1rem;
  }
  @include for-tablet-portrait-up {  
      top: 20%;
      width: calc(100% - 2rem);
      margin: 1rem;
      padding: 2rem 1rem;
  }
  @include for-tablet-landscape-up {
      width: 800px;
      margin: 1rem;
      padding: 2rem 1rem;
  }
  @include for-desktop-up {
      width: 950px;
      padding: 40px 30px;
  }
  @include for-big-desktop-up {
      // top: 12%;
      padding: 40px 30px;
  }

  // @include for-min-height-only {  
  //     padding: 1.5rem;
  //     width: 90%;
  //     max-height: auto;
  //     min-height: 200px;
  // }

  // @include for-all-height-up {  
  //     padding: 2.5rem 1.5rem;
  //     max-height: auto;
  //     min-height: 200px;
  // }



    .heading {
        margin: 0px 0 1rem;
        letter-spacing: .5px;
        font-weight: 400;
        line-height: 1.45;
        text-transform: uppercase;
        text-align: left;
        
        @include for-phone-only {    
            font-size: 1.25rem;
            margin: 0px 0 1rem;
        }
        @include for-tablet-portrait-up {  
            font-size: 1.5rem;
            margin: 0px 0 1rem;
        }
    }

    .line {
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
            margin-bottom: 3.5rem;
        }
        @include for-big-desktop-up {
            margin-bottom: 4rem;
        }
    }


    input, textarea {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        color: #111;
        background-color: transparent;
        border: 1px solid #ACACAC;
        //border-bottom: 1px solid #909090;
        box-shadow: none;
        padding: 0.75rem .5rem;
        
        width: 100%;

        @include for-phone-only {  
            height: 2.75rem;
            font-size: .85rem;
        }     
        @include for-tablet-portrait-up {
          height: 2.75rem;
        }
        @include for-desktop-up {
            height: 3.5rem;
        }
        @include for-big-desktop-up {
            height: 3.5rem;
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
        height: 4.75rem;
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

    .project-pdf-user-container {
        display: flex;
        flex-direction: column;
        
        @include for-phone-only {  
        }
        @include for-tablet-portrait-up {  
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

    .project-pdf-project-container {

        img {
          width: 100%
        }

        .cover {
          margin-bottom: 1rem;
        }

        .title {
          font-size: 1.5rem;
          margin-bottom: .15rem;
          text-transform: uppercase;
        }

        .subtitle {
          color: $grey;
          font-size: .9rem;
          margin-bottom: 0rem;

            @include for-phone-only {  
                margin-bottom: 1.25rem;
            }
            @include for-tablet-portrait-up {  
                margin-bottom: 0rem;
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


    .project-pdf-form-footer {
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
          font-size: .7rem;
          line-height: 1.35;
          margin-top: 1rem;
        }

    }



    .success-message {
        position: absolute;
        top: 0;
        left: 0;
        color: #111;
        font-weight: 400;
        height: 100%;
        min-height: 200px;
        font-size: 1.65rem;
        text-transform: uppercase;
        width: 100%;
        font-weight: 400;
        transform: translateY(-15px);
        opacity: 0;
        visibility: hidden;
        transition: all .75s ease;
        padding: 40px 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        // background: #fff;
        // box-shadow: 0 1px 20px rgba(0, 0, 0, 0.15);

        &.show {
            transform: translateY(0px);
            opacity: 1;
            visibility: visible;
        }
    }

    .field.has-error .error {
      display: block;
    }


    // ::placeholder {
    //   color: #444;
    //   font-size: 1rem;
    // }


  
}


///////

.project-pdf-modal-close {
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

.project-pdf-modal-close svg{
  width: 100%;
  height: 100%;
}

.project-pdf-modal-close:hover {
  opacity: .5;
}


///////





</style>
