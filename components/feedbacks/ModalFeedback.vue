<template>
  <div class="feedback-modal-overlay">
    <div class="feedback-modal-close" @click="$emit('close')">
      <CloseBtn></CloseBtn>
    </div>
    <div class="feedback-modal ">
      <div class="form-wrap slideUp fade-in-form">
        <FeedbacksMainForm :formData="formData"></FeedbacksMainForm>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  name: 'myModal',
  data() {
    return {
      formData: {
        title: 'Получить предложение',
        fields: ['name', 'email', 'phone'],
        pageFrom: 'Модальное окно'
      },
    }
  },
  methods: {
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
  }
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

.feedback-modal-overlay {
  background: rgba(255, 255, 255, 0.95);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feedback-modal {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  top: 20%;

  @include for-phone-only {}

  @include for-tablet-portrait-up {}

  @include for-tablet-landscape-up {}

  @include for-desktop-up {}

  @include for-big-desktop-up {}

  @include for-min-height-only {}

  @include for-all-height-up {}

  .form-wrap {
    position: relative;
    width: 500px;
    padding: 2rem;
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
</style>
