<template>               
    <div class="filter-container" v-if="selectedOptions.square.length">
        <div class="list" v-if="filterPage == 'index'">
          <b-row>
            <b-col>
              <label>Тип</label>
              <v-select placeholder="Выберите тип" label="text" :options="filterOptions.type" v-model="selectedOptions.type"></v-select>
            </b-col>
            <b-col>
              <label>Метро</label>
              <v-select placeholder="Выберите станцию" :options="filterOptions.metro" v-model="selectedOptions.metro"></v-select>
            </b-col>
            <b-col class="slider">
              <label>Площадь, м2</label>
              <vue-slider ref="slider" v-model="selectedOptions.square" :min="filterOptions.squareRange[0]" :max="filterOptions.squareRange[1]" :tooltip="'always'" @drag-end="sliderSquareChanged()"></vue-slider>
            </b-col>
            <b-col class="slider">
              <label>Стоимость, руб./мес.</label>
              <vue-slider ref="slider" v-model="selectedOptions.price" :min="filterOptions.priceRange[0]" :max="filterOptions.priceRange[1]" :tooltip="'always'" @drag-end="sliderPriceChanged()"></vue-slider>
            </b-col>
          </b-row>
        </div>
        <!-- -->
        <div class="list" v-else-if="filterPage == 'rent'">
          <b-row class="top-row">
            <!-- <b-col>
              <label>Город</label>
              <v-select 
                class="imedi-select"
                placeholder="Выберите город" 
                label="text" 
                :options="filterOptions.city" 
                v-model="selectedOptions.city">
              </v-select>
            </b-col> -->
            <b-col>
              <label>Метро</label>
              <v-select 
                placeholder="Выберите станцию" 
                :options="filterOptions.metro" 
                v-model="selectedOptions.metro"
                :class="{'disabled': filterOptions.metro.length == 0}"
              ></v-select>
            </b-col>
            <b-col class="slider">
              <label>Площадь, м2</label>
              <vue-slider ref="slider" v-model="selectedOptions.square" :min="filterOptions.squareRange[0]" :max="filterOptions.squareRange[1]" :tooltip="'always'" @drag-end="sliderSquareChanged()"></vue-slider>
              <div class="slider-data">
                <div class="slider-data__min">{{ utils.numberWithSpaces(selectedOptions.square[0]) }}</div>
                <div class="slider-data__max">{{ utils.numberWithSpaces(selectedOptions.square[1]) }}</div>
              </div>            
            </b-col>
            <b-col class="slider">
              <label>Стоимость, руб./мес.</label>
              <vue-slider ref="slider" v-model="selectedOptions.price" :min="filterOptions.priceRange[0]" :max="filterOptions.priceRange[1]" :tooltip="'always'" @drag-end="sliderPriceChanged()"></vue-slider>
              <div class="slider-data">
                <div class="slider-data__min">{{ utils.numberWithSpaces(selectedOptions.price[0]) }}</div>
                <div class="slider-data__max">{{ utils.numberWithSpaces(selectedOptions.price[1]) }}</div>
              </div>   
            </b-col>
          </b-row>
          <b-row class="bottom-row">
            <b-col v-if="filterType == 'offices' || filterType == 'retail' || filterType == 'psn'">
              
                <div class="checkbox">
                  <input type="checkbox" class="custom-checkbox" id="isEntry" value="true" v-model="selectedOptions.isEntry">
                  <label for="isEntry">Отдельный вход</label>
                </div>
                <!-- <div class="checkbox">
                  <input type="checkbox" class="custom-checkbox" id="isFinishing" value="true" v-model="selectedOptions.isFinishing">
                  <label for="isFinishing">C отделкой</label>
                </div> -->

            </b-col>
            <b-col v-else-if="filterType == 'warehouses'">
                <!-- <div class="checkbox">
                  <input type="checkbox" class="custom-checkbox" id="isEntry" value="true" v-model="isEntry">
                  <label for="isEntry">Отдельный вход</label>
                </div> -->
                <!-- <div class="checkbox">
                  <input type="checkbox" class="custom-checkbox" id="isFinishing" value="true" v-model="selectedOptions.isFinishing">
                  <label for="isFinishing">C отделкой</label>
                </div> -->
                <div class="checkbox">
                  <input type="checkbox" class="custom-checkbox" id="isEntry" value="true" v-model="selectedOptions.isEntry">
                  <label for="isEntry">Отдельный вход</label>
                </div>
                <div class="checkbox">
                  <input type="checkbox" class="custom-checkbox" id="isWarm" value="true" v-model="selectedOptions.isWarm">
                  <label for="isWarm">Теплый</label>
                </div>
            </b-col>
            <b-col></b-col>
            <b-col class="d-flex justify-content-end">
              <div class="reset-filter">
                <span @click="resetFilter()">Очистить фильтр</span>
              </div>
            </b-col>
          </b-row>
        </div>
        <!-- -->
        <div class="list" v-else-if="filterPage == 'project'">
          <b-row>
            <b-col>
              <label>Тип</label>
              <v-select placeholder="Выберите тип" :options="filterOptions.type" v-model="selectedOptions.type"></v-select>
            </b-col>
            <b-col class="slider">
              <label>Площадь, м2</label>
              <vue-slider ref="slider" v-model="selectedOptions.square" :min="filterOptions.squareRange[0]" :max="filterOptions.squareRange[1]" :tooltip="'always'" @drag-end="sliderSquareChanged()"></vue-slider>
              <div class="slider-data">
                <div class="slider-data__min">{{ utils.numberWithSpaces(selectedOptions.square[0]) }}</div>
                <div class="slider-data__max">{{ utils.numberWithSpaces(selectedOptions.square[1]) }}</div>
              </div>            
            </b-col>
            <b-col class="slider">
              <label>Стоимость, руб./мес.</label>
              <vue-slider ref="slider" v-model="selectedOptions.price" :min="filterOptions.priceRange[0]" :max="filterOptions.priceRange[1]" :tooltip="'always'" @drag-end="sliderPriceChanged()"></vue-slider>
              <div class="slider-data">
                <div class="slider-data__min">{{ utils.numberWithSpaces(selectedOptions.price[0]) }}</div>
                <div class="slider-data__max">{{ utils.numberWithSpaces(selectedOptions.price[1]) }}</div>
              </div>   
            </b-col>
          </b-row>
          <b-row>
            <b-col class="bottom-row">
                <div class="checkbox">
                  <input type="checkbox" class="custom-checkbox" id="isEntry" value="true" v-model="selectedOptions.isEntry">
                  <label for="isEntry">Отдельный вход</label>
                </div>
                <!-- <div class="checkbox">
                  <input type="checkbox" class="custom-checkbox" id="isFinishing" value="true" v-model="selectedOptions.isFinishing">
                  <label for="isFinishing">C отделкой</label>
                </div> -->
            </b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>
        </div>
        <div class="shadow-wrap">
          <div class="bg"></div> 
        </div>
    </div> 
</template>      

<script>
// import vSelect from '~/plugins/vue-select/src/index.js'
// import '~/plugins/vue-select-scss/vue-select.scss'
import utils from '~/utils/utils.js'

export default {
    props: ['filterPage', 'filterType', 'lots'],
    name: 'InitailFilter',
    components: {
      //vSelect
    },
    data () {
      return {
        filterOptions: {
          type: [
            {
              text: 'Офисы класса А и Б',
              value: 'office-ab'
            },
            {
              text: 'Офисы в бизнес-парка',
              value: 'office-park'
            },
            {
              text: 'Офисы в складских комплексах',
              value: 'office-sklad'
            },
            {
              text: 'Складские помещения',
              value: 'sklad'
            }
          ],
          city: [
            {
              text: 'Москва',
              value: 'moscow'
            },
            {
              text: 'Липецк',
              value: 'lipetsk'
            }
          ],
          plansType: [
            'Открытая',
            'Кабинетная',
            'Смешанная',
          ],
          squareRange:[],
          priceRange:[],

        },
        selectedOptions: {
          city: [],
          type: [],
          metro: [],
          plansType: [],
          square: [],
          price: [],
          isEntry: false,
          isFinishing: false,
          isWarm: false,
        },
        currentDataFromURL: {
          city: '',
          metro: '',
          price_min: '',
          price_max: '',
          square_min: '',
          square_max: ''
        },
        wasGettenFromURL: false 
      }
    },
    methods:{
      removeDublikates(data) {
        return data.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t === item && t != ''
        )))
      },
      resetFilter() {
        this.getCitiesData()
        this.getTypesData()
        this.getMetrosData()
        this.getSquareData()
        this.getPriceData()
        this.getDataFromURL()
      },
      getDataFromURL() {
        console.log('this.filterOptions ', this.filterOptions)
        var query = this.$route.query
        for (var prop in query) {

          this[prop] = this.filterOptions.type.find( type => type.value == query[prop])
          console.log(prop + " = " + query[prop]);

          if (prop == 'price_min') {
            this.filterOptions.priceRange[0] = query[prop]
          }
          if (prop == 'price_max') {
            this.filterOptions.priceRange[1] = query[prop]
          }
          if (prop == 'square_min') {
            this.filterOptions.squareRange[0] = query[prop]
            this.sliderSquareChanged()
          }
          if (prop == 'square_max') {
            this.filterOptions.squareRange[1] = query[prop]
            this.sliderSquareChanged()
          }
          if (prop == 'city') {
            // this.city = this.filterOptions.city.find(city => city.value == query[prop])
            this.selectedOptions.city = query[prop]
          }
          if (prop == 'metro') {
            this.selectedOptions.metro = query[prop]
          }

          this.currentDataFromURL[prop] = query[prop]

        }
        if (Object.keys(query).length !== 0) {
          this.wasGettenFromURL = true
        }
        console.log('this.currentDataFromURL ', this.currentDataFromURL) 
      },
      getTypesData() {
        var allTypes = []
        this.lots.map( item => {
          allTypes.push(item.type)
        })
        //console.log('allTypes', allTypes)
        this.filterOptions.type = this.removeDublikates(allTypes)
      },
      getCitiesData() {
        var allCities = []
        this.lots.map( item => {
          allCities.push(item.project.city)
        })
        //console.log('allMetros', allMetros)
        this.filterOptions.city = this.removeDublikates(allCities)
      },
      getMetrosData() {
        var allMetros = []
        this.lots.map( item => {
          allMetros.push(item.project.metro)
        })
        //console.log('allMetros', allMetros)
        this.filterOptions.metro = this.removeDublikates(allMetros)
      },
      getSquareData() {
        var allSquares = []
        this.lots.map( item => {
          allSquares.push(Math.round(item.square))
        })
        var Smin = Math.floor(Math.min.apply(null, allSquares))
        var Smax = Math.ceil(Math.max.apply(null, allSquares))
        this.selectedOptions.square = [Smin,Smax]
        this.filterOptions.squareRange = [Smin,Smax]
      },
      updateSquare() {
        var allSquares = []
        this.lots.map( item => {
          allSquares.push(Math.round(item.square))
        })
        var Smin = Math.floor(Math.min.apply(null, allSquares))
        var Smax = Math.ceil(Math.max.apply(null, allSquares))
        this.selectedOptions.square = [Smin,Smax]
        //this.squareRange = [Smin,Smax]
      },
      getPriceData() {
        var allPrices = []
        this.lots.map( item => {
          allPrices.push(item.price)
        })

        console.log('allPrices ', allPrices)

        var Smin = Math.floor(Math.min.apply(null, allPrices))
        var Smax = Math.ceil(Math.max.apply(null, allPrices))
        this.selectedOptions.price = [Smin,Smax]
        this.filterOptions.priceRange = [Smin,Smax]
      },
      updatePriceData() {
        var allPrices = []
        this.lots.map( item => {
          allPrices.push(item.price)
        })

        console.log('allPrices ', allPrices)

        var Smin = Math.floor(Math.min.apply(null, allPrices))
        var Smax = Math.ceil(Math.max.apply(null, allPrices))
        this.selectedOptions.price = [Smin,Smax]
        //this.filterOptions.priceRange = [Smin,Smax]
      },
      plansTypeOnchange() {
        console.log('plansTypeOnchange')
        $nuxt.$emit('onchange', this.filterOptions.plansType);
      },
      sliderPriceChanged() {
        if (this.selectedOptions.price[0] === this.filterOptions.priceRange[0] && this.selectedOptions.price[1] === this.filterOptions.priceRange[1]) {
          var data = {
            prop: 'price',
            value: false
          }
        } else {
          var data = {
            prop: 'price',
            value: this.selectedOptions.price
          }
        }
        $nuxt.$emit('onchange', data);
      },
      sliderSquareChanged() {
        this.wasGettenFromURL = false
        if (this.selectedOptions.square[0] === this.filterOptions.squareRange[0] && this.selectedOptions.square[1] === this.filterOptions.squareRange[1]) {
          var data = {
            prop: 'square',
            value: false
          }
        } else {
          var data = {
            prop: 'square',
            value: this.selectedOptions.square
          }
        }

        this.pushDataOutside(data)
        
      },
      pushDataOutside(data) {
        $nuxt.$emit('onchange', data);
        
        // if (!this.wasGettenFromURL) {
        //   this.pushDataToURL(data)
        // }
        this.pushDataToURL(data)
        
      },
      pushDataToURL(data) {
          var urlPath =  window.location.protocol + "//" + window.location.host + window.location.pathname
         
          if (data.prop == 'square') {
            this.currentDataFromURL['square_min'] = data.value[0]
            this.currentDataFromURL['square_max'] = data.value[1]
          } else if (data.prop == 'price') {
            this.currentDataFromURL['price_min'] = data.value[0]
            this.currentDataFromURL['price_max'] = data.value[1]
          } 
          else if (data.prop == 'city') {
            this.currentDataFromURL[data.prop] = data.value
          }
          else if (data.prop == 'metro') {

            this.currentDataFromURL[data.prop] = data.value
          }

          // console.log ('pushDataToURL data ', data)
          // console.log('this.currentDataFromURL ', this.currentDataFromURL)
          
          var searchPath = ''

          for (var key in this.currentDataFromURL) {
           if (this.currentDataFromURL[key] != '' && this.currentDataFromURL[key] != null) {
             console.log ('key ', key)
             searchPath += '&'+key+'='+this.currentDataFromURL[key]+''
           }
          }

          // console.log ('searchPath ', searchPath)

          if (searchPath != '') {
            var refresh = urlPath + '?' +searchPath
          } else {
            var refresh = urlPath + searchPath
          }
          
          window.history.replaceState(null, null, refresh);
      },
    },

    mounted () {
      this.getCitiesData()
      this.getTypesData()
      this.getMetrosData()
      this.getSquareData()
      this.getPriceData()
      this.getDataFromURL()
    },  
    created() {
      this.utils = utils
    },
    computed: {


    },
    watch: {
      lots: function (newVal, oldVal) {
        //this.updateSquare()
      },
      'selectedOptions.type': function (newVal, oldVal) {
        var data = {
          prop: 'type',
          value: newVal
        }
        this.pushDataOutside(data)
      },
      'selectedOptions.city': function (newVal, oldVal) {
        var data = {
          prop: 'city',
          value: newVal
        }
        this.pushDataOutside(data)
        setTimeout(() => {
            this.getMetrosData()
            this.updateSquare()
            this.updatePriceData()
        }, 1000);
        
      },
      'selectedOptions.metro': function (newVal, oldVal) {
        var data = {
          prop: 'metro',
          value: newVal
        }
        this.pushDataOutside(data)

        setTimeout(() => {
            this.updateSquare()
            this.updatePriceData()
        }, 1000)
      },
      'selectedOptions.plansType': function (newVal, oldVal) {
        var data = {
          prop: 'planType',
          value: newVal
        }
         this.pushDataOutside(data)
      },
      'selectedOptions.isEntry': function (newVal, oldVal) {
        var data = {
          prop: 'own_entrance',
          value: newVal
        }
         this.pushDataOutside(data)
      },
      'selectedOptions.isFinishing': function (newVal, oldVal) {
        var data = {
          prop: 'isFinishing',
          value: newVal
        }
         this.pushDataOutside(data)
      },
      'selectedOptions.isWarm': function (newVal, oldVal) {
        var data = {
          prop: 'isWarm',
          value: newVal
        }
         this.pushDataOutside(data)
      },

    }

    
}
</script>


<style lang="scss">





.filter-container {
  position: relative;
  color: #111;
  text-align: left;
  letter-spacing: 1px;
  z-index: 9;
  opacity: 1;
  

  @include for-phone-only {    
    position: relative;
    left: auto;
    bottom: auto;
    width: 100%;
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
    width: 100%;
    max-width: 1400px;
    //transform: translateY(25%);
  }

  @include for-big-desktop-up {
    width: 100%;
    max-width: 1400px;
  }
  
  @include base-transition(all);

  &.hide {
      opacity: 0;
  }

  .list {
      letter-spacing: 0.25px; 
      font-weight: 400; 
      margin: 0;
      
      @include for-phone-only {  
        padding: .75rem 1.5rem .75rem 1.5rem ;  
        line-height: 1.35rem;
        flex-direction: column;
        font-size: .85rem;
      }
      
      @include for-small-phone-only {    
        font-size: .75rem;
      }

      @include for-tablet-portrait-up {
        padding: 1.25rem 2rem 0.25rem 2rem ;  
        line-height: 1.35rem;
        flex-direction: row;
        font-size: .75rem;
      }

      @include for-tablet-landscape-up { 
        font-size: .85rem;
        line-height: 1.75rem;
      }
          
      @include for-big-desktop-up {
        font-size: .85rem;
        line-height: 1.95rem;
      }
  
      .col {
          position: relative;
          text-align: left;
          @include base-transition(all);

          @include for-phone-only {    
            padding: .75rem 1.5rem;
            width: 100%;
            flex-basis: 100%;
          }
          @include for-tablet-portrait-up {
            padding: .5rem 1.5rem;
          }

          @include for-tablet-landscape-up { 
            padding: 1rem .5rem 1rem .5rem;
          }

          &:last-child {
              @include for-phone-only {    
                padding: .75rem 1.5rem;
              }
              @include for-tablet-portrait-up {
                border-left: none!important;
                padding: 1.25rem 2rem 1.25rem .5rem;
              }

          }

          &.slider {

            @include for-tablet-landscape-up { 
              padding: 1.25rem 1rem 1.25rem 1rem;
            }

              &:last-child {

                @include for-phone-only {    
                   padding: .75rem 1.5rem;
                }
                @include for-tablet-portrait-up {
                  border-left: none!important;
                  padding: 1.25rem 2rem 1.25rem 1rem;
                }

              }

          }

          span {
            font-weight: 500;
            font-size: 1rem;
            // margin-right: 3px;
            @include for-phone-only {  
              font-size: .85rem;
            }
            @include for-tablet-portrait-up {
              font-size: .85rem;
            }
            @include for-tablet-landscape-up { 
              font-size: .85rem;
            }

          }

          i {
            //  margin-left: 3px;
          }

          &.show {

            &:before {
              opacity: 1;
            }

          }
      }

      // div:first-child {
      //     border-left: none!important;
      // }
  }

  .bg {
    background: #fff;
    box-shadow: 0 5px 25px #eaeaf4;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    //transform: skew(-10deg, 0deg);
    width: 100%;
    height: 100%;
    clip-path: polygon(0 0,100% 0,calc(100% - 35px) 100%,0 100%);
        
      @include for-phone-only {    
        clip-path: none;
      }
  }

  .bg2 {
    background: #fff;
    box-shadow: 0 5px 25px #eaeaf4;
    position: absolute;
    left: 2rem;
    top: 2rem;
    z-index: -1;
    //transform: skew(-10deg, 0deg);
    width: 100%;
    height: 100%;
    clip-path: polygon(0 0,100% 0,calc(100% - 35px) 100%,0 100%);
    opacity: .5;
      
      @include for-phone-only {    
        clip-path: none;
      }
  }

  label {
    display: block;
    font-weight: 600;
    font-size: .85rem;
    letter-spacing: .25px;
    margin-bottom: 0;
    line-height: 1.1;
    height: 30px;

    @include for-phone-only {   
      font-size: .75rem;
      height: 20px;
    }

    @include for-tablet-portrait-up {
      font-size: .75rem;
      height: 30px;
    }

    @include for-tablet-landscape-up {
      font-size: .85rem;
    }

    @include for-desktop-up {
      font-size: .85rem;
    }

    @include for-big-desktop-up {
      font-size: .85rem;
    }
  }

  .filter-select {
      display: block;
      font-size: 15px;
      letter-spacing: .5px;
      font-family: sans-serif;
      font-weight: 400;
      color: #444;
      line-height: 1.7;
      padding: .7em 2.5em 0.7em 0.8em;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      margin: 0;
      border: 1px solid #ccc;
      border-radius: 0px;
      appearance: none;
      background-color: transparent;
      background-image: url('~assets/img/select-arrow.svg');
      background-repeat: no-repeat, repeat;
      background-position: right .7em top 50%, 0 0;
      background-size: .65em auto, 100%;
  }
  .filter-select::-ms-expand {
      display: none;
  }
  .filter-select :hover {
      border-color: #888;
  }
  .filter-select:focus {
      border-color: #aaa;
      box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
      box-shadow: 0 0 0 3px -moz-mac-focusring;
      color: #222;
      outline: none;
  }
  .filter-select option {
      font-weight:normal;
  }


  ///// vue-select



  // .imedi-select .vs__search::placeholder,
  // .imedi-select .vs__dropdown-toggle,
  // .imedi-select .vs__dropdown-menu {
  //   background: #dfe5fb;
  //   border: none;
  //   color: #394066;
  //   text-transform: lowercase;
  //   font-variant: small-caps;
  // }

  // .imedi-select .vs__clear,
  // .imedi-select .vs__open-indicator {
  //   fill: #394066;
  // }

  .vs__dropdown-option--highlight {
    background: $mainColor!important;
    color: #fff;
  }

  .disabled {
      pointer-events: none;
      cursor: not-allowed;
      background-color: #f3f3f3;
      opacity: .75;
  }

  .vs__dropdown-toggle {
    padding: 8px 0 10px 0;
    border-radius: 0;
    cursor: pointer;
  }

  .vs__selected-options {
    
  }

  .vs__clear {
    ///display: none;
    position: absolute;
    right: 20px;
    top: 8px;
    z-index: 999;
  }

  .vs__search {
    color: #aaa;
    cursor: pointer;
    // position: absolute;
    // width: 100%;
  }

  .vs__selected {
      text-overflow: ellipsis;
      overflow: hidden; 
      width: 190px; 
      white-space: nowrap;
      display: block!important;
  }

  .vs__open-indicator,  .vs__clear svg{
    fill: rgba(60, 60, 60, 0.5);
    transform: scale(.95);
  }

  .bottom-row {
      display: flex;
      align-items: center;

      @include for-phone-only {    
        margin-top: 0px;
      }
      @include for-tablet-portrait-up {
        margin-top: -20px;
      }


      div {
        display: flex;
        align-items: center;
        margin-right: 1.25rem;
        label {
          height: auto;
          //margin-left: .5rem;
        }
      }

      .reset-filter {
        margin-right: 0px;

        span {
            position: relative;
            cursor: pointer;

            &:before, &:after {
                content: "";
                background-color: #bbbec2;
                width: 2px;
                height: 10px;
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                -webkit-transition: all .3s;
                transition: all .3s;
          }
          &:before {
              left: -15px;
              transform: rotate(45deg);
          }

          &:after {
              left: -15px;
              transform: rotate(-45deg);
          }

        }



      }
  }

  .slider-data {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }
}

</style>