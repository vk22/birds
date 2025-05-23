<template>
  <div class="feedback-form">
    <div class="feedback-form__heading" v-if="!responseStatus"><span>{{ formData.title }}</span></div>
    <div class="feedback-form__container" v-if="!responseStatus">

      <!-- Name -->
      <div class="field" v-if="fieldExist('name')" v-bind:class="{ 'has-error': hasErrorName }">
        <div class="control">
          <input class="input" type="text" v-model="feedback.name" :placeholder="'Имя*'">
        </div>
      </div>
      <!-- Phone -->
      <div class="field" v-if="fieldExist('phone')" v-bind:class="{ 'has-error': hasErrorPhone }">
        <div class="control">
          <input class="input" type="phone" v-mask="'+7(###)-###-####'" v-model="feedback.phone"
            placeholder="+7(999)-999-9999*" value="">
        </div>
      </div>
      <!-- Email -->
      <div class="field" v-if="fieldExist('email')" v-bind:class="{ 'has-error': hasErrorEmail }">
        <div class="control">
          <input class="input" type="email" v-model="feedback.email" :placeholder="'Email'" value="">
        </div>
        <div class="errors" v-if='hasErrorEmailMessage'>{{ hasErrorEmailMessage }}</div>
      </div>
      <!-- Message -->
      <div class="field" v-if="fieldExist('message')">
        <div class="control">
          <textarea class="textarea" v-model="feedback.message" placeholder="Сообщение"></textarea>
        </div>
      </div>
      <!-- Send -->
      <div class="field is-grouped feedback-form__footer">
        <div class="control">
          <button class="main-btn" @click="sendFeedback()">Отправить</button>
        </div>
      </div>

      <div class="alright">
        Нажимая на кнопку "Отправить", вы выражаете свое
        <nuxt-link :to="'/personal-data'">согласие на обработку ваших персональных данных</nuxt-link>
      </div>

    </div>
    <Transition>
      <div class="success-message" v-if="responseStatus">
        <svg class="success-icon" viewBox="0 0 45 42">
          <path
            d="M40.2765 14.3333L43.7832 17.0886C44.0245 17.2782 44.1654 17.5681 44.1654 17.8749V38.7222C44.1654 39.8268 43.2699 40.7222 42.1654 40.7222H2.83203C1.72746 40.7222 0.832031 39.8268 0.832031 38.7222V18.1527C0.832031 17.8458 0.972919 17.556 1.21421 17.3664L4.72092 14.6111M30.5543 7.11111L22.8009 1.22925C22.6222 1.09371 22.3752 1.09371 22.1965 1.22925L14.4431 7.11111"
            stroke="$mainColor"></path>
          <path d="M4.72266 21.278V7.11133H40.2782V21.5558M44.1671 19.0558L28.3338 28.2224" stroke="$mainColor"></path>
          <path
            d="M0.832031 19.0566L16.6654 28.2233M1.10981 40.1678L22.192 24.0138C22.3727 23.8754 22.624 23.8765 22.8035 24.0163L43.8876 40.4455"
            stroke="$mainColor"></path>
          <path d="M10.6367 12.541H35.1822" stroke="$mainColor" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M10.6367 16.2227H35.1822" stroke="$mainColor" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M10.6367 19.9043H25.9776" stroke="$mainColor" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        {{ responseMessage }}
        <p>{{ responseMessage2 }}</p>
      </div>
    </Transition>

  </div>
</template>

<script>
export default {
  props: ['formData', 'slideUp'],
  name: 'myModal',
  data() {
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

      this.feedback.pageFrom = this.formData.pageFrom

      if (!this.errors.length) {

        const response = await this.$axios.$post('/send-email/', { title: this.title, feedback: this.feedback })
        console.log('response: ' + JSON.stringify(response))

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
    fieldExist(field) {
      return this.formData.fields.some( item => item === field)
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
      console.log('handleScroll ', this.formData.title )
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

.feedback-form {

  &__heading {
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

  &__container {
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

    input,
    textarea {
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

    .errors {
      position: relative;

    }

    .errors ul,
    .errors {
      list-style: none;
      margin: 0;
      padding: 0;
      color: #dc3545;
      font-size: 13px;
    }


    .field.has-error label,
    .field.has-error a {
      color: #dc3545 !important;
    }

    .field.has-error input {
      border: 1px solid #dc3545 !important;
    }

    .field .error {
      display: none;
      color: #dc3545 !important;
    }




  }


  &__footer {
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


  .success-message {
    color: #111;
    font-weight: 400;
    min-height: 250px;
    font-size: 1.65rem;
    text-transform: uppercase;
    width: 100%;
    transform: translateY(-15px);
    transition: all .75s ease;
    padding: 40px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
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

      path {
        stroke: $mainColor;
      }
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

}

</style>