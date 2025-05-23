<template>
  <div class="inner-page">
    <main>
      <b-container>
        <div class="promo-content" v-if="promo">
          <b-row>
            <b-col cols="9">

              <div class="content-item mb-3">
                <div class="info-block">
                   <nuxt-link to="/promo" class="promo-back-btn">Все акции</nuxt-link>
                  <div class="h1 title">{{ promo.title }}</div>
                  <div class="promo-terms" v-if="!promo.no_terms">
                    <div class="promo-terms__header">Срок действия:</div>
                    <div class="promo-terms__date">{{ promo.dates }}</div>
                  </div>
                </div>
              </div>

            </b-col>
            <b-col cols="9">



              <div class="content-item" v-if="promo.cover != ''">
                <div class="gallery-block">
                  <img v-lazy="'/uploads/promo/'+promo.id+'/'+promo.cover" alt="">
                </div>
              </div>

              <div class="content-item">
                <div class="info-block">
                  <div class="content">
                    <p><span v-html="promo.description"></span></p>
                  </div> 
                </div>
              </div>

              <FeedbackPromo :promo="promo"></FeedbackPromo>
              

            </b-col>

            <b-col cols="3">
              <!-- <div class="content-item block-sh">
                <div class="promo-terms" v-if="!promo.no_terms">
                  <div class="promo-terms__header">Срок окончания</div>
                  <div class="promo-terms__date">{{ promo.date_end }}</div>
                </div>
                <div class="promo-terms" v-else>
                  <div class="promo-terms__header">Бессрочная</div>
                </div>
              </div> -->
             </b-col>
          </b-row>
        </div>
      </b-container>
      
      <!-- Filter -->
      <!-- <lots-similar :project="project.id"></lots-similar> -->

    </main>
  </div>
</template>

<script>
import googleMap from '~/components/Map.vue'
import PromoPreview from '~/components/PromoPreview.vue'
import FeedbackPromo from '~/components/feedbacks/FeedbackPromo.vue'

export default {
  components: { 
    googleMap,
    PromoPreview,
    FeedbackPromo
  },
  data() {
    return {      
    }

  },
  mounted: function () {
                
  } ,
  created() {

  },
  destroyed() {

  },
  methods: {

    showOrderkModal (data) {
      console.log('showOrderkModal')
        this.$modal.show(ModalOrderOneLot, {
          promo: this.promo,
          project: this.project
        }, {
          draggable: false,
          width: '100%',
          height: '100%',

        },{
        })
    },

  },
  
  computed: {
    promo() {
      const promo = this.$store.getters['getPromoOne'](this.$route.params.id)
      return promo;
    },
    project() {
      const project = this.$store.getters['getProjectOneById'](this.promo.projectID)
      return project
    }
  },
}
</script>

<style lang="scss">


.promo-back-btn {
  position: relative;
  color: #999;
  padding-left: 20px;
  margin-bottom: 2rem;
  font-size: .9rem;

    &::before {
      position: absolute;
      left: 0px;
      top: -1px;
      content: '';
      background: url(~assets/img/arr-back-b.svg) no-repeat left center;
      width: 6px;
      height: 100%;
      transition: left .45s ease-in-out;
  }

  &:hover:before {
    left: -2px;
  }
}

.promo-top-actions {
  display: flex;
  align-items: flex-end;
  height: 120px;
  padding: 2rem 0rem 2rem 0;
  justify-content: flex-end;
}

.promo-terms {

  display: flex;

  &__header {
    font-size: .95rem;
    text-transform: uppercase;
    color: #999;
    margin-right: .5rem;
  }

  &__date{
    font-size: .95rem;
    font-weight: 500;
    text-transform: uppercase;
    padding-bottom: 1rem;
  }
}



.arrow {
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    opacity: .75;
    transition: opacity .2s ease-in-out;

    &.arrow-next {
      margin-left: -8px;
    }
    
    &:hover {
      opacity: 1;
    }
}

// .main-btn {
//   padding: 24px 20px;
//   width: 100%;
//   border: 1px solid $mainColor;
//   text-align: left;
//   font-weight: 500;
//   font-size: 1rem;
//   letter-spacing: 1px;
//   color: #fff;
//   cursor: pointer;  
//   transition-property: all;
//   transition-duration: .25s;
//   transition-timing-function: ease-out;
//   border-radius: 0px;
//   clip-path: polygon(0 0,99.7% 0,95.1% 100%,0 100%);
//   background-color: $mainColor;
//   background-size: 10%;
//   background-repeat: no-repeat;
//   background-position: right 30px center;
//   background-image: url('~assets/img/ar-next.svg');

//   &:hover {
//     background-position: right 25px center;
//     background-color:$mainColorHover;
//   }
  
// }


.content-item {
  margin-bottom: 3rem;

  &.no-border {
    padding: 0rem;
  }

}

ul.custom-list {
  margin-left: 1rem;

    li {
      position: relative;
      margin: 1.25rem 0;
      font-weight: 300;

      &::before {
          position: absolute;
          top: 10px;
          content: "";
          background: $mainColor;
          font-weight: 700;
          display: lock;
          width: 6px;
          height: 6px;
          margin-left: -1em;
      }
          
    }
}

.promo-content {
  position: relative;

  .info-block {
    
    display: flex;
    flex-direction: column;
    padding-bottom: 0rem;

    .title {
      font-size: 2rem;
      font-weight: 400;
      letter-spacing: 0px;
      margin-bottom: 1.5rem;
      line-height: 1.35;
    }
    .subtitle {
      margin-bottom: 2rem;
      color: #9B9B9B;
    }
    .place {
      background: url('~assets/img/pin-orange.svg') left center no-repeat;
      padding: 0 1.75rem;
      margin-bottom: 1rem;
      div {
        line-height: 1.25rem;
        display: inline-block;
      }
    }
    .data {
      display: flex;
      flex-direction: row;
      margin-bottom: 1rem;
      div {
        flex: 0 1 calc(33.33% - 0px);
        text-align: center;
        font-weight: 500;
        color: #9B9B9B;
        padding: 1rem;
        border: 1px solid #ebebeb;
        border-left: none;
      }
    }
    .free-spaces {
      padding: 0 1.25rem;
    }
    
  }



  .promo-main-params {
      ul {
        li {
          display: flex;
          line-height: 1.5;
          padding-bottom: 1.5rem;
          

          div {
            flex-basis: 50%;
            padding-right: 1rem;
            
            &:last-child {
              font-weight: 600;
            }
          }
          
        }
      }
  }

  .promo-map {
    width: 100%;
    height: 600px;
  }

  .promo-action {
    width: 100%;
    height: 600px;
  }

  .gallery-block {
    img {
      width: 100%;
    }
  }

}





.promo-intro {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 12rem 0 5rem;

  @include for-phone-only {    
      //height: 115vh;
      

  }

  @include for-small-phone-only {    

  }

  @include for-tablet-portrait-up {

  }
  @include for-tablet-landscape-up {
    
  }
  @include for-desktop-up {

  }
  @include for-big-desktop-up {

  }

  .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-position: center center;
    background-size: cover; 
  
    @include for-phone-only {    
      height: 35%;
      top: 80px;
    }
  
      img {
        opacity: 0;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        object-fit: cover;
        object-position: 5% 40%;
        @include base-transition(all);
    }
  }


  .shadow-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    filter: drop-shadow(0 5px 20px rgba(70, 96, 140, 0.2));
    z-index: -1;
  }

  .index-filter {
    position: relative;
    color: #111;
    text-align: left;
    letter-spacing: 1px;
    z-index: 99;
    opacity: 1;
    
    @include for-phone-only {    
      position: relative;
      left: auto;
      bottom: auto;
      width: 92%;
      padding-left: 0rem;
      right: auto;
      //transform: translateX(0%) translateY(5%);
    }

    @include for-tablet-portrait-up {
      position: relative;
      left: auto;
      bottom: auto;
      width: 95%;
      padding-left: 0rem;
      right: auto;
      //transform: translateX(0%) translateY(5%);
    }

    @include for-tablet-landscape-up {
      width: calc(100% - 10rem);
      max-width: 1400px;
      //transform: translateY(25%);
    }

    @include for-big-desktop-up {
      width: calc(100% - 12rem);
      max-width: 1400px;
    }
    
    @include base-transition(all);

    &.hide {
        opacity: 0;
    }

  }



}

.visible .index-intro .bg-img img {
  opacity: .1;
  //object-position: 0% 75%;
}

</style>
