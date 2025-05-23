<template>     
      <section class="index-intro">
                
          <div class="intro-text">
              <h1 class="title desktop">Специальные условия по аренде офисов и складов в Москве</h1>  
              <h1 class="title mobile">Специальные условия по аренде офисов и складов в Москве</h1>  
              <span class="line"></span>
          </div>
          <div class="index-filter">
             <FilterMain :filterType="'index'" :lots="allLots" @onchange="onchange(data)"></FilterMain>
             <div class="filter-action">
               <button class="main-btn" @click="goToResults()">Искать</button>
             </div>
          </div>
             
        <div class="bg-img">
          <img v-lazy="topImg"/>
        </div> 
             
      </section>
</template>      

<script>
import img1 from '~/assets/img/slider-1.jpg'
export default {
    props: ['myData'],
    name: 'indexIntro',
    components: { 
    },
    data () {
      return {
        topImg: img1,
        introBottom: undefined,
        selectedValues: {},
        query: {}
      }
    },
    methods:{
      goToResults() {
        if (Object.keys(this.query).length == 0) {
            
            this.$router.push({
              name: 'rent'
            })
        } else {

          if (this.query.type == 'sklad') {
            this.$router.push({
              name: 'rent-warehouses',
              query: this.query
            })
          } else {
            this.$router.push({
              name: 'rent-offices',
              query: this.query
            })
          }

        }
      },
      makeFilter(data) {


        console.log('makeFilter ', data)
        if (data.prop == 'planType') {
          if (data.value) {
            this.selectedValues[data.prop] = planType => planType === data.value;
            this.query[data.prop] = data.value
          } else {
            delete this.selectedValues[data.prop];
          }
        } else if (data.prop == 'isEntry') {
          if (data.value) {
            this.selectedValues[data.prop] = isEntry => isEntry === data.value;
          } else {
            delete this.selectedValues[data.prop];
          }
        } else if (data.prop == 'isFinishing') {
          if (data.value) {
            this.selectedValues[data.prop] = isFinishing => isFinishing === data.value;
          } else {
            delete this.selectedValues[data.prop];
          }
        } else if (data.prop == 'price') {
          if (data.value) {
            this.selectedValues[data.prop] = price => price > data.value[0] && price <= data.value[1];
          } else {
            delete this.selectedValues[data.prop];
          }
        } else if (data.prop == 'square') {
          if (data.value) {
            this.selectedValues[data.prop] = square => square > data.value[0] && square <= data.value[1];
          } else {
            delete this.selectedValues[data.prop];
          }
        } else if (data.prop == 'type') {
          if (data.value.text == 'Офисы класса А и Б') {
            this.selectedValues[data.prop] = type => type === 'Офис';
            this.selectedValues['projectType'] = projectType => projectType === 'Бизнес-центр';
          } else if (data.value.text == 'Офисы в бизнес-парках') {
            this.selectedValues[data.prop] = type => type === 'Офис';
            this.selectedValues['projectType'] = projectType => projectType === 'Бизнес-парк';
          } else if (data.value.text == 'Офисы в складских комплексах') {
            this.selectedValues[data.prop] = type => type === 'Офис';
            this.selectedValues['projectType'] = projectType => projectType === 'Офисно-складской комплекс';
          } else if (data.value.text == 'Складские помещения') {
            this.selectedValues[data.prop] = type => type === 'Склад';
            delete this.selectedValues['projectType']
          } else {
            delete this.selectedValues[data.prop];
          }
        } else if (data.prop == 'metro') {
          if (data.value) {
            this.selectedValues[data.prop] = metro => metro === data.value;
          } else {
            delete this.selectedValues[data.prop];
          }
        }

        if (data.value) {
          this.query[data.prop] = data.value.value
        } else {
          delete this.selectedValues[data.prop];
        }
        
        console.log('this.query ', this.query)
        //console.log('selectedValues ', this.selectedValues)
        // this.filteredLots = this.filterArray(this.lots, this.selectedValues)
        // console.log('this.filteredLots ', this.filteredLots)
      },
    },
    created() {
      this.$nuxt.$on('onchange', (data) => {
        this.makeFilter(data)
      })
    },
    mounted () {

    },  
    computed: {

      allLots() {
        // console.log('this.$store.getters' , this.$store.getters['getAllLots']('Все'))
        return this.$store.getters['getAllLots']('Все')
      }

    },
    watch: {
      // firstName: function (val) {
      //   this.fullName = val + ' ' + this.lastName
      // },
    }
    

    
}
</script>


<style lang="scss">




.index-intro {
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
        opacity: .1;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        object-fit: cover;
        object-position: 5% 40%;
        @include base-transition(all);
    }
  }


  .intro-text {
    position: relative;
    width: 100%;
    max-width: 1400px;
    text-align: center;
    z-index: 500;
    font-weight: 300;
    line-height: 1.25;
    padding: 0 7%;
    margin-bottom: 5rem;
    @include base-transition(opacity);

    @include for-phone-only {   

    }

    @include for-tablet-portrait-up {

    }

    @include for-tablet-landscape-up {

    }

    @include for-desktop-up {

    }
    @include for-big-desktop-up {
      // width: 100%;
      // max-width: 1400px;
      // left: 50%;
    }

    &.hide {
        opacity: 0;
    }

    .title {
        margin-bottom: 2.5rem;
        letter-spacing: 2px;
        font-weight: 400;
        line-height: 1.55;
        text-transform: uppercase;

        @include for-phone-only {    
            font-size: 1.25rem;
            margin-bottom: 1.5rem;
            letter-spacing: 1px;
        }
        @include for-small-phone-only {    
            font-size: 1.15rem;
        }
        @include for-tablet-portrait-up {
            font-size: 1.5rem;
            margin-bottom: 3rem;
            letter-spacing: 1px;
        }
        @include for-tablet-landscape-up {
            font-size: 2rem;
        }
        @include for-desktop-up {
            font-size: 2rem;
        }
        @include for-big-desktop-up {
            font-size: 2.5rem;
        }
    }

    .line {
        //display: none!important;
        height: 3px;
        width: 100px;
        background-color: $mainColor;
        display: block;
        margin: 0 auto;

        @include for-phone-only {    

        }
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
    display: flex;
    flex-direction: column;
    align-items: center;
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
      padding: 0 15px;
      right: auto;
      //transform: translateX(0%) translateY(5%);
    }

    @include for-tablet-landscape-up {
      width: 100%;
      max-width: 1140px;
    }

    @include for-big-desktop-up {
      width: 100%;
      max-width: 1440px;
    }
    
    @include base-transition(all);

    &.hide {
        opacity: 0;
    }

    .filter-action {
      width: 250px;
      margin-top: 2rem;
    }

  }

}




</style>