<template>     
      <section class="contact-page inner-page" v-if="contacts.length">
        <b-container>
          <b-row>
            <b-col md="12">
              <!-- <div class="page-breads">
                <breads></breads>
              </div> -->
              <div class="page-title slideUp fade-in">
                <div class="block-title h1">Контакты</div>
              </div>
            </b-col>
          </b-row>
          <b-row>
          <b-col md="6" class="mb-5" v-for="(contact,index) in contacts" :key="index">
            <b-row>
              <b-col md="12">
                <div class="contact-block slideUp fade-in">
                  <div class="subtitle">{{ contact.city }}</div>  
                  <div class="address">{{ contact.address }}</div>
                  <div class="phone">{{ contact.phone }}</div>
                  <!-- <div class="graphik">с 09:00 до 18:00 ежедневно</div> -->
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <div class="contact-map slideUp fade-in">
                  <google-map :coords="contact.mapCoords"></google-map>
                </div>
              </b-col>
            </b-row>

          </b-col>

          </b-row>
        </b-container>
        
        <div class="slideUp fade-in">
          <feedback></feedback>
        </div>

      </section>
</template>      

<script>
import googleMap from '~/components/Map.vue'
import Feedback from '~/components/feedbacks/Feedback.vue'
import Breads from '~/components/Breads.vue'

export default {
    props: ['myData'],
    name: 'About',
    components: {
      googleMap,
      Feedback,
      Breads
    },
    data () {
      return {
      }
    },
    methods:{
    },
    mounted() {
    },
    created() {
    }, 
    destroyed() {
    },
    computed: {
      contacts() {
          return this.$store.getters['getContacts']
      }
    },

    
}
</script>


<style lang="scss">


.contact-block {
  margin-bottom: 50px;
  @include for-phone-only {  
    margin-bottom: 50px;
  }

  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
  }

  .address {
    font-size: 1rem;
    margin-bottom: .75rem;
    padding-right: 2rem;
    padding-left: 30px;

      &:before {
          position: absolute;
          content: "";
          width: 15px;
          height: 22px;
          background-image: url('~assets/img/ic-pin.svg');
          background-size: 100%;
          background-repeat: no-repeat;
          transform: translateX(-28px) translateY(0px);
      }

  }

  .phone {
      position: relative;
      padding-left: 30px;
      margin-bottom: .75rem;

      &:before {
          position: absolute;
          content: "";
          width: 20px;
          height: 20px;
          background-image: url('~assets/img/ic-phone.svg');
          background-size: 100%;
          background-repeat: no-repeat;
          transform: translateX(-30px) translateY(3px);
      }
  }

  .email {
    position: relative;
    padding-left: 25px;

    &:before {
        position: absolute;
        content: "";
        width: 16px;
        height: 16px;
        background-image: url('~assets/img/ic-email.svg');
        background-size: 100%;
        background-repeat: no-repeat;
        transform: translateX(-24px) translateY(3px);
    }
    a {
      color: #111;
    }
  }

  .graphik {
      position: relative;
      padding-left: 25px;
      margin-bottom: 5px;

      &:before {
          position: absolute;
          content: "";
          width: 16px;
          height: 16px;
          background-image: url('~assets/img/ic-graphic.svg');
          background-size: 100%;
          background-repeat: no-repeat;
          transform: translateX(-24px) translateY(3px);
      }
  }

  .mb {
    margin-bottom: 48px;
  
    @include for-phone-only {  
        margin-bottom: 0px;
    }
  }

}

.contact-map {
  width: 100%;
  height: 400px;
  box-shadow: 0 1px 14px rgba(70, 96, 140, 0.2);
}

</style>