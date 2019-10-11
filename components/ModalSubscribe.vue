<template>
    <div class="subscribe-modal-wrap">
    
      <div class="subscribe-modal-close" @click="$emit('close')">          
        <svg width="18px" height="17px" viewBox="0 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                <g id="LandingPopup" transform="translate(-983.000000, -267.000000)" stroke="#000000">
                    <g id="Group-6">
                        <g id="Group-5" transform="translate(420.000000, 243.000000)">
                            <path d="M571.87315,32.8400752 L582.911677,32.8400752 L571.87315,32.8400752 L571.87315,21.6856907 L571.87315,32.8400752 Z M571.87315,32.8400752 L560.911677,32.8400752 L571.87315,32.8400752 L571.87315,44.0437203 L571.87315,32.8400752 Z" id="Combined-Shape" transform="translate(571.911677, 32.864706) rotate(-315.000000) translate(-571.911677, -32.864706) "></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      </div>

      <div class="heading"><span>Stay in the know! Add your name to the list for special updates from fqueens</span></div>

      <div class="subscribe-modal-container">


              <div class="field" v-bind:class="{ 'has-error': hasErrorEmail }">
                <div class="control">
                  <input class="input" type="email" v-model="subscriber.email" placeholder="Email" value="">
                </div>
                <span class="error">{{ responseMessageEmail }}</span> 
                
              </div>
              <div class="field">
                    <div class="sub-oferta">
                        <p>By subscribing you are agreeing to the <br><a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Policy</a></p>
                    </div>
              </div>

              <div class="errors" v-if="errors.length">
                <ul>
                  <li v-for="error in errors">{{ error }}</li>
                </ul>
              </div>

              <div class="field is-grouped subscribe-form-footer">
                <div class="control">
                  <button class="btn subscribe-send" @click="sendEmail()">Подписаться</button>
                </div>
              </div>

              <div class="success-message" v-if="responseStatus">
                  <p>{{responseMessage}}</p>
              </div>     

        </div>
    </div>    
</template>

<script>
export default {
    props: ['order'],
    name: 'myModal',
    data () {
      return {
        subscriber: {
          email: ''
        },
        errors: [],
        hasErrorEmail: false,
        responseMessageEmail: '',
        responseMessage: '',
        responseStatus: false,
        termsChecked: false
      }
    },
    methods: {
      beforeOpen (event) {
        },
      async sendEmail () {

        this.errors = [];

        if (!this.subscriber.email) {
          this.errors.push('Укажите электронную почту.');
        } else if (!this.validEmail(this.subscriber.email)) {
          this.errors.push('Укажите корректный адрес электронной почты.');
          //this.hasErrorEmail = true;
        } 
        
         if (!this.errors.length) {

          const response = await this.$axios.$post('/add-new-subscribes/', this.subscriber)
          console.log('response: '+JSON.stringify(response))

          if (response.success) {
            this.errors = [];
            this.subscriber.email = '';
            this.responseMessage = 'Спасибо за подписку!';
            this.responseStatus = true;
          }

        }


      },  
      validEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    }, 
    created() {
      //console.log('created: '+event.params.title);
    }
 }
</script>


<style scoped>

.v--modal-overlay {
    background: rgba(255, 255, 255, .5);
    z-index: 9999;
}


.subscribe-modal-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  padding: 50px 40px;
  background: #fff!important;
  box-shadow: 0 1px 20px #999;
  text-align: center;
}

.subscribe-modal-wrap .subscribe-modal-close {
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  transition-property: transform;
  transition-duration: .25s;
  transition-timing-function: ease-out;
  z-index: 99;
}

.subscribe-modal-wrap .subscribe-modal-close:hover {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    transform: rotate(-90deg);
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

.success-message {
    color: #000000;
    font-weight: 400;
    background: #fff;
    text-align: center;
    padding: 0 12%;
    height: 100%;
    font-size: 18px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.field.has-error .error {
  display: block;
}


.subscribe-modal-wrap .heading {
    margin: 0px 0 30px;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 0px 50px;
    line-height: 1.5;
}

.subscribe-modal-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.subscribe-send {
    padding: 10px 20px;
    border: 1px solid #000;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 13px;
    letter-spacing: 1.5px;
    background: #000;
    color: #fff;
    cursor: pointer;  
    transition-property: all;
    transition-duration: .25s;
    transition-timing-function: ease-out;
}

.subscribe-send:hover {
    background: #fff;
    color: #000;
}


.subscribe-form-footer {
    justify-content: flex-end!important;
    padding-top: 0px;
}

.subscribe-form-footer .subscribe-price {
    text-align: right;
    padding-right: 20px;
    font-size: 32px;
    font-weight: 700;
    padding-top: 0px;
    line-height: 1.25;
}

.subscribe-form-footer .subscribe-price .title {
    font-size: 14px;
    margin-bottom: 0;
    position: relative;
    font-weight: 400;
}

.subscribe-modal-wrap input, textarea {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    box-shadow: none;
    padding: 0.75rem .5rem;
    height: 2.75rem;
    width: 60%;
}

.subscribe-modal-wrap .field:not(:last-child) {
    margin-bottom: 1rem;
}

.subscribe-modal-wrap .field .label:not(:last-child) {
    margin-bottom: .15rem;
}

.sub-oferta{
  width: 70%;
  margin: 0 auto;
}

.sub-oferta p, .sub-oferta a{
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
}


.subscribe-modal-wrap .errors{
    margin-bottom: 10px;
    position: absolute;
    bottom: 35px;
    left: 0px;
    width: 100%;
    text-align: center;
}

.subscribe-modal-wrap .errors ul {
    list-style: none;
    margin: 0;
    padding: 0;
    color: red;
    font-size: 13px;
}

@media (min-width: 320px) and (max-width: 480px) { 

  .v--modal-overlay .v--modal-background-click {
      display: flex;
      justify-content: center;
  }

  .v--modal-overlay .v--modal-box {
      width: 90%!important;
      left: 0!important;
      top: 115px!important;
      height: 420px!important;
  }

  .subscribe-modal-wrap{
    box-shadow: 0 1px 20px #999;
  }

  .subscribe-modal-wrap .heading {
    padding: 0;
  }

  .subscribe-modal-wrap input {
    width: 100%;
  }
  .sub-oferta {
    width: 100%;
  }

}


</style>
