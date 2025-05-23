<template>
  <div class="project-page">
    <main>
      <Tinybox v-if="projectGallery.length" v-model="index" :images="projectGallery" loop/>
      <!-- <ProjectGalleryModal
        :project="project"
        :images="projectGallery" 
      ></ProjectGalleryModal> -->
      <ProjectIntro :project="project"></ProjectIntro>
      <div class="project-content">
      <b-container>
        
          <b-row>
            <div class="col-md-8">
              <div class="project-top-actions">
                <div class="left">
                  <nuxt-link to="/projects" class="project-back-btn">Все проекты</nuxt-link>
                  <div class="project-gallery" v-if="projectGallery.length">
                      <div v-for="(img, idx) in projectGallery" class="project-gallery__thumb" @click="index = idx" :key="idx">
                        <img v-lazy="img" alt="">
                      </div>
                  </div>  
                </div>
                <div class="right">
                  <div class="go-to-lots mobile-only">
                    <button class="main-btn" v-if="lots.length" v-scroll-to="'#project-filter-container'">Выбрать помещение</button>
                  </div>
                </div>
              </div>
              <div class="content-item block-sh slideUp fade-in">
                <div class="info-block">
                  <div class="h1 title">{{ project.title }}</div>
                  <div class="subtitle">{{ project.type }}</div>
                  <div class="place">
                    <div class="metro" v-if="project.city != 'Москва'">г. {{ project.city }}.</div>
                    <div class="metro" v-else>м. {{ project.metro }}.</div>
                    <div class="address">{{ project.address }}</div>
                  </div>
                </div>
                <div class="project-action-block">
                  <div class="actionsBtn shareBtn"></div>
                  <!-- <div class="actionsBtn printBtn"></div> -->
                </div>
              </div>

              <div class="block-sh mb-3 mobile-only">
                <div class="project-main-params">
                  <ul>
                    <li><div class="text-grey">Класс</div><div>{{ project.class }}</div> </li>
                    <li><div class="text-grey">Обшая площадь</div><div>{{ utils.numberWithSpaces(project.square) }} <span v-if="project.square">м<sup>2</sup></span> </div> </li>
                    <li><div class="text-grey">Этажность</div><div>{{ project.floors }}</div> </li>
                    <li ><div class="text-grey">Парковка</div><div v-if="project.parking>0">{{ project.parking }} м/мест</div><div v-else>наземная</div></li>
                    <li><div class="text-grey">Вакантные площади</div><div><span v-for="(item, index) in project.freeSpaces" :key="index"> {{ item.type }}: <br>{{ item.data }} <span v-if="index+1 < project.freeSpaces.length"><br><br></span>  </span>   </div> </li>
                  </ul>
                </div>
              </div>

              <div class="content-item block-sh slideUp fade-in">
                <div class="info-block">
                  <div class="h3">Описание</div>
                  <!-- <div class="project-action-block">
                        <button class="sendPdfBtn" @click="showFeedbackModal()">Отправить презентацию</button>
                  </div>                   -->
                  <div class="content">
                    <div v-html="project.about"></div>
                  </div> 
                  <div class="pb-3 pt-3">
                    <button class="sendPdfBtn" @click="showFeedbackModal()" v-if="project.pdf[0]">
                      Отправить презентацию
                    </button>
                  </div>
                </div>
              </div>

              <div class="content-item block-sh slideUp fade-in">
                <div class="info-block">
                  <div class="h3">Преимущества</div>
                  <b-row>
                    <b-col md="6">
                      <ul class="custom-list">
                        <li v-for="(item,index) in feathersL" :key="index" >{{ item }}</li>
                      </ul>
                    </b-col>
                    <b-col md="6">
                      <ul class="custom-list">
                        <li v-for="(item,index) in feathersR" :key="index" >{{ item }}</li>
                      </ul>
                    </b-col>
                  </b-row>

                  </div> 

              </div>

            </div>
            <div class="col-md-4">
              
              <div class="project-top-actions go-to-lots desktop-only slideUp fade-in">
                <button class="main-btn w100" v-if="lots.length" v-scroll-to="'#project-filter-container'">Выбрать помещение</button>
              </div>
             
              <div class="block-sh mb-5 desktop-only slideUp fade-in">
                <div class="project-main-params">
                  <ul>
                    <li><div class="text-grey">Класс</div><div>{{ project.class }}</div> </li>
                    <li><div class="text-grey">Обшая площадь</div><div>{{ utils.numberWithSpaces(project.square) }} <span v-if="project.square">м<sup>2</sup></span> </div> </li>
                    <li><div class="text-grey">Этажность</div><div>{{ project.floors }}</div> </li>
                    <li><div class="text-grey">Парковка</div><div v-if="project.parking>0">{{ project.parking }} м/мест</div><div v-else>наземная</div></li>
                    <li><div class="text-grey">Вакантные площади</div><div><span v-for="(item, index) in project.freeSpaces" :key="index"> {{ item.type }}: <br>{{ item.data }} <span v-if="index+1 < project.freeSpaces.length"><br><br></span>  </span>   </div> </li>
                  </ul>
                </div>
              </div>

              <ProjectPromoSlider :projectPromos="projectPromos" v-if="projectPromos.length"></ProjectPromoSlider>
              
            </div>
          </b-row>
       
      </b-container>

      <ProjectMap :coords="project.mapCoords"></ProjectMap>

    
      <!-- Filter -->
      <FilterRent v-if="lots.length" :lots="lots" :project="project" :filterPage="'project'"></FilterRent>
       </div>
      <b-container>
        <b-row>
          <b-col>
            <div class="h3">Предложения по другим объектам</div>
          </b-col>
        </b-row>
      </b-container>
      <!-- Services -->  
      <IndexServices />

    </main>
  </div>
</template>

<script>
import googleMap from '~/components/Map.vue'
import PromoPreview from '~/components/PromoPreview.vue'
import utils from '~/utils/utils.js'
import ModalProjectPdf from '~/components/feedbacks/ModalProjectPdf.vue'

export default {

  components: { 
    googleMap,
    PromoPreview,
    ModalProjectPdf
  },
  data() {
    return {
      activeIndex: 0,
      index: null,
      projectGallery: []
      
      //feathersL: undefined,
      //feathersR: undefined,
    }

  },
  mounted: function () {
    
                
  } ,
  created() {
    this.utils = utils
  },
  destroyed() {

  },
  methods: {
    showFeedbackModal (data) {
      this.$modal.show(ModalProjectPdf, {
          project: this.project,
        }, {
        draggable: false,
        width: '100%',
        height: '100%',

      },{
        // 'before-open': (event) => { this.$store.commit('setFeedbackModal', true) },
        // 'before-close': (event) => { this.$store.commit('setFeedbackModal', false) }
      })
    }


  },
  
  computed: {
    project() {
      let project = this.$store.getters['getProjectOne'](this.$route.params.id);
      project.gallery.map( item => {
        this.projectGallery.push('/uploads/projects/'+project.id+'/'+item)
      })
      
      return project
    },
    projectPromos() {
      return this.$store.getters['getPromosForProject'](this.project.id); 
    },
    feathersL() {
      var features = [...this.project.features]
      var featuresL = features.splice(0, Math.ceil(features.length /2))
      return featuresL;
    },
    feathersR() {
      var features = [...this.project.features]
      var featuresR = features.splice(Math.ceil(features.length /2), features.length-1)
      return featuresR;
    },
    lots() {
      var lots = this.$store.getters['getProjectsLots'](this.project.guid)
      console.log('lots ', lots)
      return lots;
    }
  },
  watch: {
    // 'project.features': function (newVal, oldVal) {
    //   console.log('watch ', newVal, oldVal)
    //   this.feathersL = newVal.splice(0, Math.ceil(project.features.length /2));
    //   this.feathersR = newVal;
    // },

  },
}
</script>

<style lang="scss">

// 

.project-page {
  background: #f7f7f7;
}

.project-back-btn {
  position: relative;
  color: #fff;
  padding-left: 20px;
  text-shadow: 0px 1px 1px #0000002e;

    &::before {
      position: absolute;
      left: 0px;
      content: '';
      background: url(~assets/img/arr-back.svg) no-repeat left center;
      width: 6px;
      height: 100%;
      transition: left .45s ease-in-out;
  }

  &:hover {
    color: #fff;
  }

  &:hover:before {
    left: -2px;
  }
}

.project-top-actions {
  display: flex;
  justify-content: space-between;

  @include for-phone-only {    
    // height: 160px;
    padding: 1rem 0rem 1rem 0;
    // align-items: stretch;
    flex-direction: column;
  }
  @include for-tablet-portrait-up {
    height: 170px;
    padding: 2rem 0rem 2rem 0;
    align-items: flex-end;
  }

  .left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
  
    // @include for-phone-only {    
    //    flex-basis: 80%;
    // }
    // @include for-tablet-portrait-up {
    //    flex-basis: 100%;
    // }

  }

  .right {

    @include for-phone-only {    
      // flex-basis: 20%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      margin-top: 1rem;
    }

    @include for-tablet-portrait-up {
      display: none;
      flex-basis: 0%;
    }


  }

  .go-to-lots.mobile-only {
    width: 100%;
  }

}

.project-gallery {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
 
  width: 100%;

    @include for-phone-only {    
        margin-top: 0rem;
    }
    @include for-tablet-portrait-up {
        margin-top: 1rem;
    }

  &__thumb {
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 14px rgba(70, 96, 140, 0.2);
    cursor: pointer;
    transform: translateY(0%);
    @include base-transition(transform, 0.25s);

    @include for-phone-only {    
      width: 55px;
      height: 40px;
      margin-right: .5rem;
      margin-top: 1rem;
    }
    @include for-tablet-portrait-up {
      width: 100px;
      height: 65px;
      margin-right: 1rem;
      margin-top: 1rem;
    }

    img {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
      object-fit: cover;
      
    }

    &:hover {
        transform: translateY(-3%);
    }
    
  }
}

.project-action-block {
  position: absolute;
  top: 3rem;
  right: 3rem;
  width: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  @include for-phone-only {    
    top: 2.25rem;
    right: 2rem;
  }

  @include for-tablet-portrait-up {
    top: 3rem;
    right: 3rem;
  }
}

.project-content {
  position: relative;

  z-index: 2;

  @include for-phone-only {    
    margin-top: -350px;
  }
  @include for-tablet-portrait-up {
    margin-top: -300px;
  }

  .info-block {
    display: flex;
    flex-direction: column;
    padding-top: .5rem;

    .title {
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: .5px;
      margin-bottom: .5rem;

      @include for-phone-only {
        font-size: 1.75rem;
      }

      @include for-tablet-portrait-up {
        font-size: 2.25rem;
      }

    }
    .subtitle {
      margin-bottom: 2.5rem;
      color: #9B9B9B;
    }
    .place {
      background: url('~assets/img/pin-orange.svg') left center no-repeat;
      padding: 0 0 0 2.5rem;
      margin-bottom: 1rem;
      background-size: 20px;
      div {
        line-height: 1.5rem;
        // display: inline-block;
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



  .project-main-params {
    width: 100%;
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

  .project-map {
    width: 100%;
    height: 600px;
  }

  .project-action {
    position: absolute;
    width: 100%;
    height: 600px;
    margin-bottom: 0rem;
  }

}

 



// .project-intro {
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   padding: 12rem 0 5rem;

//   @include for-phone-only {    
//       //height: 115vh;
      

//   }

//   @include for-small-phone-only {    

//   }

//   @include for-tablet-portrait-up {

//   }
//   @include for-tablet-landscape-up {
    
//   }
//   @include for-desktop-up {

//   }
//   @include for-big-desktop-up {

//   }

//   .bg-img {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     left: 0;
//     top: 0;
//     background-position: center center;
//     background-size: cover; 
  
//     @include for-phone-only {    
//       height: 35%;
//       top: 80px;
//     }
  
//       img {
//         opacity: 0;
//         width: 100%;
//         height: 100%;
//         position: relative;
//         z-index: 2;
//         object-fit: cover;
//         object-position: 5% 40%;
//         @include base-transition(all);
//     }
//   }


//   .shadow-wrap {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     top: 0;
//     left: 0;
//     filter: drop-shadow(0 5px 20px rgba(70, 96, 140, 0.2));
//     z-index: -1;
//   }

//   .index-filter {
//     position: relative;
//     color: #111;
//     text-align: left;
//     letter-spacing: 1px;
//     z-index: 99;
//     opacity: 1;
    
//     @include for-phone-only {    
//       position: relative;
//       left: auto;
//       bottom: auto;
//       width: 92%;
//       padding-left: 0rem;
//       right: auto;
//       //transform: translateX(0%) translateY(5%);
//     }

//     @include for-tablet-portrait-up {
//       position: relative;
//       left: auto;
//       bottom: auto;
//       width: 95%;
//       padding-left: 0rem;
//       right: auto;
//       //transform: translateX(0%) translateY(5%);
//     }

//     @include for-tablet-landscape-up {
//       width: calc(100% - 10rem);
//       max-width: 1400px;
//       //transform: translateY(25%);
//     }

//     @include for-big-desktop-up {
//       width: calc(100% - 12rem);
//       max-width: 1400px;
//     }
    
//     @include base-transition(all);

//     &.hide {
//         opacity: 0;
//     }

//   }



// }

// .visible .index-intro .bg-img img {
//   opacity: .1;
//   //object-position: 0% 75%;
// }

</style>
