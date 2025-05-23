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

        <b-col cols="6" class="left">
          <div class="form-in-modal__cover">
            <!-- <img class="cover" v-lazy="'/uploads/projects/'+project.id+'/'+project.cover" alt=""> -->
             <img v-lazy="'/uploads/modal-img.jpg'" class="img-cover">
          </div>
     
        </b-col>

        <b-col cols="6" class="right">
          <div class="form-in-modal__content">
            
            <div class="forma" :class="{'hide': responseStatus}">
            <b-row>
              <b-col v-if="mode === 'sendEmail'">
                <div class="heading "><span>Отправить на почту</span></div>
                <span class="line "></span>
              </b-col>
              <b-col v-else>
                <div class="heading "><span>Забронировать лоты</span></div>
                <span class="line "></span>
              </b-col>
            </b-row>

            <div class="order-data-container " >
              <b-row>
                <b-col cols="12">
                  <div class="item" v-if="mode != 'sendEmail'">
                    <div class="title">Выбранные лоты</div>
                    <div class="data">
                      <span v-for="(lot,i) in orders" :key="lot.lot">{{ lot.lot }}{{ i < orders.length - 1 ? ', ' : '' }}</span>
                    </div>
                  </div>
                  <div class="item" v-else>
                    <div class="title">Введите email для отправки на него выбранных заказов</div>
                  </div>
                </b-col>
              </b-row> 
            </div> 

            <div class="order-user-container ">
<!-- 
                <div class="field">
                  <div class="control">
                    <input class="input" type="text" v-model="user.name" placeholder="Имя">
                  </div>
                </div> -->
                <div class="field" v-bind:class="{ 'has-error': hasErrorPhone }" v-if="mode != 'sendEmail'">
                  <div class="control">
                    <input class="input" type="phone" v-mask="'+7(###)-###-####'" v-model="user.phone" placeholder="+7(999)-999-9999" value="">
                  </div>
                </div>
                <div class="field" v-bind:class="{ 'has-error': hasErrorEmail }">
                  <div class="control">
                    <input class="input" type="email" v-model="user.email" placeholder="Email*" value="">
                  </div>
                  <div class="errors" v-if='hasErrorEmailMessage'>{{ hasErrorEmailMessage }}</div>
                </div>
                <div class="checkbox" v-if="mode !== 'sendEmail'">
                  <input type="checkbox" class="custom-checkbox" id="feedbackNeed" v-model="user.feedbackNeed">
                  <label for="feedbackNeed">Просьба перезвонить для финализации условий аренды</label>
                </div>
                <div class="field is-grouped order-form-footer">
                  <div class="control">
                    <button class="main-btn-send" @click="sendEmail()">Отправить</button>
                  </div>
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
export default {
    props: ['orders','project', 'mode'],
    name: 'myModal',
    data () {
      return {
        user: {
          name: '',
          email: '',
          phone: '',
          feedbackNeed: true
        },
        errors: [],
        hasErrorPhone: false,
        hasErrorName: false,
        hasErrorEmail: false,
        hasErrorEmailMessage: '',
        placeholderEmail: 'Email',
        responseMessage: '',
        responseMessageTitle: 'Письмо отправлено',
        responseMessageSubtitle: '',
        responseStatus: false,
        termsChecked: false,
        isShow: false
      }
    },
    methods: {
      async sendEmail() {

        this.errors = [];

        // if (!this.user.name) {
        //   this.errors.push('Укажите Имя');
        //   this.hasErrorName = true;
        // }

        if (this.mode == 'orderLots') {
          if (!this.user.phone) {
            this.errors.push('Укажите телефон');
            this.hasErrorPhone = true;
          }
        }

        console.log('this.user.email ', this.user.email)

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
          //this.hasErrorEmail = true;
        } 
        
         if (!this.errors.length) {

          this.hasErrorEmail = false;
          this.hasErrorEmailMessage = '';

          var request = {
              email: this.user.email,
              orders: this.orders
          }
         
          const response = await this.$axios.$post('/send-orders-to-manager', request);
           console.log('response ',response)

          if (response.success) {
            this.errors = [];
            this.user.name = '';
            this.user.email = '';
            this.user.message = '';

            if (this.mode === 'sendEmail') {
              this.responseMessage = "<p>Письмо отправлено!</p>";
            } else {
              this.responseMessage = "<p>Спасибо! <br> Ваша заявка принята </p><small>Менеджер свяжется с Вами в ближайшее время для финализации условий аренды</small>";
            }
            
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

    }
 }
</script>


<style lang="scss">

// 



</style>
