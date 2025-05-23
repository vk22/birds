<template>
  <div class="inner-page">
    <main>
      <b-container>
        <div class="lot-content" v-if="lot">
          <b-row>
            <b-col cols="8">
              
              <div class="content-item mb-3">
                <div class="info-block">

                  <Breads :page="lot"></Breads>
                  
                  <div class="h1 title">{{ lot.type }}, {{ lot.square }} м2</div>
                  <!-- <div class="subtitle">{{ type }}</div> -->
                  <div class="place">
                    <div class="metro">м. {{ lot.project.metro }}.</div>
                    <div class="address">{{ lot.project.address }}</div>
                  </div>
                </div>
              </div>

              <div class="content-item" v-if="lot.cover != ''">
                <div class="lot-gallery">
                  <LotsGallery2
                    :lot="lot"
                    :images="lot.gallery" 
                    :guid="lot.guid"
                  ></LotsGallery2>
                </div>
              </div>

              <div class="content-item block-sh">
                <div class="info-block">
                  <div class="h2">Описание</div>
                  <div class="content">
                    <p><span v-html="lot.about"></span></p>
                  </div> 
                </div>
              </div>

              <div class="content-item block-sh">
                <div class="info-block">
                  <div class="h2">Условия сделки</div>
                    <div class="lot-main-params">
                      <ul>
                        <li v-for="(option, index) in lot.project.options" :key="index">
                          <div>{{ option[0] }}</div>
                          <div>{{ option[1] }}</div>
                        </li>
                        <li v-for="(option, index) in lot.options" :key="index">
                          <div>{{ option[0] }}</div>
                          <div>{{ option[1] }}</div>
                        </li>
                        <!-- <li><div>Совокупный арендный платеж в месяц</div><div>75 000 руб</div> </li>
                        <li><div>Предоплата</div><div>да</div> </li>
                        <li><div>Коммунальные платежи</div><div>не включены</div> </li>
                        <li><div>Эксплуатационные расходы</div><div>-</div> </li>
                        <li><div>Мин. срок аренды</div><div>12 мес.</div> </li>

                        <li><div>Стоимость парковки</div><div>25 000 руб/мес.</div> </li>
                        <li><div>Интернет</div><div>1gb</div> </li>
                        <li><div>Телефония</div><div>да</div> </li>
                        <li><div>Видеонаблюдение</div><div>да</div> </li>
                        <li><div>Контроль доступа в здание и зоны паркинга</div><div>пропускная система</div> </li> -->
                      </ul>
                    </div>
                  </div> 
              </div>

            </b-col>

            <b-col cols="4">
              <div class="lot-top-actions">
                <div class="actionsBtn shareBtn"></div>
                <div class="actionsBtn printBtn"></div>
              </div>
              <div class="content-item block-sh">
                <div class="lot-price-notice">Ставка аренды руб. за 1 кв. м. в год, не включая НДС</div>
                <div class="lot-price">{{ lot.price }} руб</div>
                <button class="main-btn-send" @click="showOrderkModal()">Оставить заявку</button>
              </div>
              <div class="content-item block-sh">
                <div class="lot-main-params">
                  <ul>
                    <li><div class="text-grey">Проект</div><div>{{ lot.project_title }}</div> </li>
                    <li><div class="text-grey">Тип</div><div>{{ lot.type }}</div> </li>
                    <li><div class="text-grey">Лот</div><div>{{ lot.number }}</div> </li>
                    <li><div class="text-grey">Общая площадь</div><div>{{ lot.square }} м2</div> </li>
                    <li><div class="text-grey">Этаж</div><div>{{ lot.floor_number }}</div> </li>
                    <li><div class="text-grey">Отдельный вход</div><div><span v-if="lot.isEntry">Да</span><span v-else>Нет</span></div> </li>
                  </ul>
                </div>
              </div>

              <div class="content-item no-border block-sh">
                <div class="lot-map">
                  <GoogleMap :coords="lot.project.mapCoords"></GoogleMap>
                </div>
              </div>

              <!-- <div v-if="projectPromos.length > 1">
                <ProjectPromoSlider :projectPromos="projectPromos"></ProjectPromoSlider>
              </div>
              <div v-else>
                <div class="content-item no-border block-sh" v-for="projectPromo in projectPromos" :key="projectPromo.id">
                  <div class="lot-action">
                    <PromoPreview :promoData="projectPromo"></PromoPreview>
                  </div>
                </div>
              </div> -->
              <ProjectPromoSlider :projectPromos="projectPromos"></ProjectPromoSlider>


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
import GoogleMap from '~/components/Map.vue'
import PromoPreview from '~/components/PromoPreview.vue'
import LotsSimilar from '~/components/lots/LotsSimilar'
import ModalOrderOneLot from '~/components/modal/OrderOneLot.vue'

export default {
  components: { 
    GoogleMap,
    PromoPreview,
    LotsSimilar,
    ModalOrderOneLot
  },
  data() {
    return {
      slides: [
        {
          name: 'Slide 1',
          img: 'https://picsum.photos/200/300'
        },
        {
          name: 'Slide 2',
          img: 'https://picsum.photos/200/300'
        },
        {
          name: 'Slide 3',
          img: 'https://picsum.photos/200/300'
        }
      ]
      
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
          lot: this.lot,
          project: this.project
        }, {
          draggable: false,
          width: '100%',
          height: '100%',

        },{
          // 'before-open': (event) => { this.$store.commit('setFeedbackModal', true) },
          // 'before-close': (event) => { this.$store.commit('setFeedbackModal', false) }
        })
    },

  },
  
  computed: {
    lot() {
      var lot = this.$store.getters['getLotOne'](this.$route.params.id)
      console.log('lot ', lot)
      return lot;
    },
    projectPromos() {
      if (this.lot.project) {
        return this.$store.getters['getPromosForProject'](this.lot.project.id); 
      }
    },
  },
  beforeRouteLeave (to, from, next) {
      //this.$modal.hide();
      
      next()
    }
}
</script>

<style lang="scss" scoped>

.lot-gallery {
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.lot-top-actions {
  display: flex;
  align-items: flex-end;
  height: 120px;
  padding: 2rem 0rem 2rem 0;
  justify-content: flex-end;
}

.lot-price-notice {
  font-size: .95rem;
  line-height: 1.25;
  color: #333;
  margin-bottom: .25rem;
}

.lot-price {
  color: $mainColorText;
  font-size: 2.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
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

.content-item {
  margin-bottom: 3rem;

  &.no-border {
    padding: 0rem;
  }

}

.lot-content {
  position: relative;
  //z-index: 999;

  .info-block {
    
    display: flex;
    flex-direction: column;
    padding-bottom: 0rem;

    .title {
      font-weight: 400;
      text-transform: none;
      letter-spacing: .5px;
      margin-bottom: .75rem;

      @include for-phone-only {
        font-size: 1.75rem;
      }

      @include for-tablet-portrait-up {
        font-size: 2.5rem;
      }

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

  .lot-main-params {
      ul {

        li {
          display: flex;
          line-height: 1.5;
          padding-bottom: 1rem;

          &::before {

          }

          div {
            flex-basis: 50%;
            padding-right: 1.5rem;
            
            &:last-child {
              font-weight: 600;
            }
          }
          
        }
      }
  }

  .lot-map {
    width: 100%;
    height: 600px;

    .map-directions__panel {
      display: none;
      // width: 310px!important;
    }
  }

  .project-action {
    position: absolute;
    width: 100%;
    height: 600px;
    margin-bottom: 0rem;
}
}


.lot-intro {
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
