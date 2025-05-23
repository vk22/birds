<template>
  <div class="order-modal-overlay">

    <div class="order-modal-wrap form-in-modal">
      <div class="order-modal-close" @click="$emit('close')">
        <svg width="18px" height="17px" viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
            <g id="LandingPopup" transform="translate(-983.000000, -267.000000)" stroke="#111">
              <g id="Group-6">
                <g id="Group-5" transform="translate(420.000000, 243.000000)">
                  <path
                    d="M571.87315,32.8400752 L582.911677,32.8400752 L571.87315,32.8400752 L571.87315,21.6856907 L571.87315,32.8400752 Z M571.87315,32.8400752 L560.911677,32.8400752 L571.87315,32.8400752 L571.87315,44.0437203 L571.87315,32.8400752 Z"
                    id="Combined-Shape"
                    transform="translate(571.911677, 32.864706) rotate(-315.000000) translate(-571.911677, -32.864706) ">
                  </path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>

      <b-row class="form-in-modal__row">
        <b-col md="8" class="left">
          <div class="form-in-modal__gallery">
            <!-- <img class="cover" v-lazy="'/uploads/projects/'+project.id+'/'+project.cover" alt="" v-if="project">  -->
            <!-- <img class="cover" v-lazy="'/uploads/lots/' + lot.guid + '/' + lot.gallery[0]" width="100" alt=""></img> -->
            <LotsGallery2 
              v-if="lot.gallery[0]"
              :lot="lot"
              :images="lot.gallery" 
              :guid="lot.guid"
            ></LotsGallery2>
            <LotsGallery2 
              v-else
              :fake="true"
              :lot="lot"
              :images="lot.gallery_fake" 
              :guid="lot.guid"
            ></LotsGallery2>
          </div>

        </b-col>
        <b-col md="4" class="right">
          <div class="form-in-modal__content slideUp fade-in-form">

            <div class="forma" :class="{ 'hide': responseStatus }">

              <b-row>
                <b-col>
                  <div class="heading " v-if="!responseStatus"><span>Заявка на бронирование</span></div>
                  <span class="line " v-if="!responseStatus"></span>
                </b-col>
              </b-row>

              <div class="order-data-container ">
                <div class="item">
                  <b-row>
                    <b-col cols="6">
                      <div class="item-in">
                        <div class="title">Тип</div>
                        <div class="data">{{ lot.type }}</div>
                      </div>
                    </b-col>
                    <b-col cols="6">
                      <div class="item-in">
                        <div class="title">Проект</div>
                        <div class="data">{{ lot.project_title }}</div>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <div class="item-in">
                        <div class="title">Площадь, м2</div>
                        <div class="data">{{ utils.numberWithSpaces(lot.square) }} </div>
                      </div>
                    </b-col>
                    <b-col cols="6">
                      <div class="item-in">
                        <div class="title">Арендный платеж, руб/мес</div>
                        <div class="data">{{ utils.numberWithSpaces(lot.price) }} </div>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>

              <div class="order-user-container " v-if="!responseStatus">

                <div class="field" v-bind:class="{ 'has-error': hasErrorName }">
                  <div class="control">
                    <input class="input" type="text" v-model="user.name" placeholder="Имя*">
                  </div>
                </div>
                <div class="field" v-bind:class="{ 'has-error': hasErrorPhone }">
                  <div class="control">
                    <input class="input" type="phone" v-mask="'+7(###)-###-####'" v-model="user.phone"
                      placeholder="+7(999)-999-9999*" value="">
                  </div>
                </div>
                <div class="field" v-bind:class="{ 'has-error': hasErrorEmail }">
                  <div class="control">
                    <input class="input" type="email" v-model="user.email" :placeholder="placeholderEmail" value="">
                  </div>
                  <div class="errors" v-if='hasErrorEmailMessage'>{{ hasErrorEmailMessage }}</div>
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
                  Нажимая на кнопку "Отправить", вы выражаете свое <nuxt-link :to="'/personal-data'">согласие на
                    обработку ваших персональных данных</nuxt-link>
                </div>
              </div>
            </div>
            <div class="success-message" :class="{ 'show': responseStatus }">
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
  props: ['lot', 'project', 'mode'],
  name: 'myModal',
  data() {
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
      responseMessageTitle: 'Ваша заявка принята',
      responseMessageSubtitle: 'Менеджер свяжется с Вами в ближайшее время для финализации условий аренды',
      responseStatus: false,
      termsChecked: false,
      isShow: false,
      order: {}
    }
  },
  methods: {
    async sendOrder() {

      this.errors = [];

      if (!this.user.name) {
        this.errors.push('Укажите Имя');
        this.hasErrorName = true;
      }
      if (!this.user.phone) {
        this.errors.push('Укажите телефон');
        this.hasErrorPhone = true;
      }
      if (this.user.email != '' && !this.validEmail(this.user.email)) {
        this.errors.push('Укажите корректный адрес электронной почты');
        this.hasErrorEmail = true;
        this.hasErrorEmailMessage = 'Укажите корректный адрес электронной почты';
        //this.hasErrorEmail = true;
      }

      if (!this.errors.length) {

        if (this.user.email != '') {
          this.order = {
            name: this.user.name,
            phone: this.user.phone,
            email: this.user.email,
            order: [this.lot]
          }
        } else {
          this.order = {
            name: this.user.name,
            phone: this.user.phone,
            order: [this.lot]
          }
        }

        const response = await this.$axios.$post('/add-order/', this.order)
        console.log('response: ' + JSON.stringify(response))

        if (response.success) {
          this.errors = [];
          this.user.name = '';
          this.user.email = '';
          this.user.message = '';
          this.responseMessage = '<p>Спасибо! <br> Ваша заявка принята </p><small>Менеджер свяжется с Вами в ближайшее время для финализации условий аренды</small>';
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

  },
  created() {
    this.utils = utils
  },
}
</script>


<style lang="scss">


.v--modal-overlay {
  z-index: 9999 !important;
}

.v--modal-overlay .v--modal-box {
  background: transparent;
  z-index: 9999;
}

.order-modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-modal-wrap {
  background: #fff;
  position: relative;
  padding: 0;
  height: 60vh;
  overflow: hidden;


  @include for-phone-only {
    width: calc(100% - 2rem);
    margin: 1rem;
  }

  @include for-tablet-portrait-up {
    width: calc(100% - 2rem);
    margin: 1rem;
  }

  @include for-tablet-landscape-up {
    width: 800px;
    margin: 1rem;
  }

  @include for-desktop-up {
    width: 75%;
  }

  @include for-big-desktop-up {
    // top: 12%;
  }

  .heading {
    margin: 0px 0 1rem;
    letter-spacing: .5px;
    font-weight: 400;
    line-height: 1.45;
    text-transform: uppercase;
    text-align: left;

    @include for-phone-only {
      font-size: 1.15rem;
      margin: 0px 0 1rem;
    }

    @include for-tablet-portrait-up {
      font-size: 1.25rem;
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
      margin-bottom: 2rem;
    }

    @include for-desktop-up {
      margin-bottom: 2rem;
    }

    @include for-big-desktop-up {
      margin-bottom: 2rem;
    }
  }

  .order-user-container {
    display: flex;
    flex-direction: column;

    @include for-phone-only {}

    @include for-tablet-portrait-up {}


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

  .order-data-container {
    margin-bottom: 1rem;

    .item-in {
      padding: 0rem 0 1rem;

      .title {
        color: $grey;
        font-size: .85rem;
        margin-bottom: 0rem;
      }

      .data {
        font-size: 1rem;
        margin-bottom: 0rem;
        text-transform: uppercase;
      }
    }

  }

  .checkbox {
    padding: .5rem 0;
    font-size: .8rem;

    .custom-checkbox+label::before {
      //margin-top: -14px;
      position: relative;
    }

  }

  .order-send {
    padding: 17px 20px !important;
    width: 70%;
    border: 1px solid $mainColor;
    text-transform: none;
    text-align: left;
    font-weight: 500;
    font-size: 1rem;
    letter-spacing: 1px;
    color: #fff;
    cursor: pointer;
    transition-property: all;
    transition-duration: .25s;
    transition-timing-function: ease-out;
    border-radius: 0px;
    clip-path: polygon(0 0, 99.7% 0, 95.1% 100%, 0 100%);
    background-color: $mainColor;
    background-size: 10%;
    background-repeat: no-repeat;
    background-position: right 30px center;
    background-image: url('~assets/img/ar-next.svg');

    &:hover {
      background-position: right 25px center;
      background-color: $mainColorHover;
    }
  }

  .order-form-footer {
    justify-content: flex-end !important;
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



}


///////

.order-modal-close {
  position: absolute;
  top: 1.55rem;
  right: 1.55rem;
  cursor: pointer;
  transition-property: opacity;
  transition-duration: .25s;
  transition-timing-function: ease-out;
  z-index: 99;
  width: 24px;
  height: 24px;
}

.order-modal-close svg {
  width: 100%;
  height: 100%;
}

.order-modal-close:hover {
  opacity: .5;
}


///////
</style>
