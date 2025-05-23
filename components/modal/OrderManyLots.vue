<template>
<div class="order-modal-overlay">

    <div class="order-modal-wrap form-in-modal">
      <div class="order-modal-close" @click="$emit('close')">          
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

    
      <b-row class="form-in-modal__row">

        <b-col md="6" class="left">
          <div class="form-in-modal__cover">
             <img v-lazy="'/uploads/projects/'+project.id+'/'+project.cover" class="img-cover" v-if="project"> 
             <img v-lazy="'/uploads/modal-img.jpg'" class="img-cover" v-else>
          </div>
     
        </b-col>

        <b-col md="6" class="right">
          <div class="form-in-modal__content">
            
            <div class="forma" :class="{'hide': responseStatus}">
            <b-row>
              <b-col>
                <div class="heading slideUp fade-in-form"><span>Забронировать лоты</span></div>
                <span class="line slideUp fade-in-form"></span>
              </b-col>
            </b-row>

            <div class="order-data-container slideUp fade-in-form" >
              <b-row>
                <b-col cols="12">
                  <div class="item">
                    <div class="title">Выбранно лотов: {{ lots.length }}</div>
                    <div class="data">
                      <span v-for="(lot,i) in lots" :key="lot.number">{{ utils.numberWithSpaces(lot.square) }} м²{{ i < lots.length - 1 ? ', ' : '' }}</span>
                    </div>
                  </div>
                </b-col>
              </b-row> 
            </div> 

            <div class="order-user-container slideUp fade-in-form">

                <div class="field" :class="{ 'has-error': hasErrors.some( el => el.field === 'name') }">
                  <div class="control">
                    <input class="input" type="text" v-model="user.name" placeholder="Имя">
                  </div>
                </div>
                <div class="field" :class="{ 'has-error': hasErrors.some( el => el.field === 'phone') }">
                  <div class="control">
                    <input class="input" type="phone" v-mask="'+7(###)-###-####'" v-model="user.phone" placeholder="+7(999)-999-9999*" value="">
                  </div>
                </div>
                <div class="field" v-bind:class="{ 'has-error': hasErrors.some( el => el.field === 'email')}">
                  <div class="control">
                    <input class="input" type="email" v-model="user.email" placeholder="Email" value="">
                  </div>
                  <div class="errors" v-if="hasErrors.some( el => el.field === 'email')">{{ hasErrors.find( el => el.field === 'email').text }}</div>
                </div>
                <!-- <div class="checkbox">
                  <input type="checkbox" class="custom-checkbox" id="feedbackNeed" v-model="user.feedbackNeed">
                  <label for="feedbackNeed">Просьба перезвонить для финализации условий аренды</label>
                </div> -->
                <div class="field is-grouped order-form-footer">
                  <div class="control">
                    <button class="main-btn-send" @click="sendOrder()">Отправить</button>
                  </div>
                </div>   
                <div class="alright">
                      Нажимая на кнопку "Отправить", вы выражаете свое <nuxt-link :to="'/personal-data'">согласие на обработку ваших персональных данных</nuxt-link>
                </div>
            </div> 

            </div>

            <div class="success-message" :class="{'show': responseStatus}">
                <div class="heading">{{ responseMessageTitle }}</div>
                <span class="line"></span>
                <p>{{ responseMessageSubtitle }}</p>
            </div> 

          </div>   

        </b-col>

      </b-row>

 
    </div>   
</div>     
</template>

<script>
import utils from '~/utils/utils.js'
export default {
    props: ['lots','project', 'mode'],
    name: 'myModal',
    data () {
      return {
        user: {
          name: '',
          email: '',
          phone: '',
          feedbackNeed: true
        },
        hasErrors: [],
        errors: [],
        hasErrorPhone: false,
        hasErrorName: false,
        hasErrorEmail: false,
        hasErrorEmailMessage: '',
        placeholderEmail: 'Email',
        responseMessage: '',
        responseMessageTitle: 'Ваша заявка принята',
        responseMessageSubtitle: 'Менеджер свяжется с Вами в ближайшее время для финализации условий аренды',
        responseStatus: false,
        termsChecked: false,
        isShow: false
      }
    },
    methods: {
      async sendOrder() {

        //// Form Validate
        this.hasErrors = this.$formValidate(this.user) 
        
        if (!this.hasErrors.length) {
          const order = {
            name: this.user.name,
            phone: this.user.phone,
            email: this.user.email,
            order: this.lots
          }
          console.log('order ', order)

          const response = await this.$axios.$post('/add-order/', order)

          if (response.success) {
            this.hasErrors = [];
            this.user = {
              name: '',
              email: '',
              phone: '',
              feedbackNeed: true
            },
            this.responseMessage = '<p>Спасибо! <br> Ваша заявка принята </p><small>Менеджер свяжется с Вами в ближайшее время для финализации условий аренды</small>';
            this.responseStatus = true;
          }

        }


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

    },
    created() {
      this.utils = utils
    },
 }
</script>


<style lang="scss">

// 



</style>
