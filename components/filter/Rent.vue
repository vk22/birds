<template>
  <div>
    <section class="rent-filter">
      <div class="intro-text">
        <h1 class="title" v-if="type === 'offices'">Аренда офисов {{ activeCity }}</h1>
        <h1 class="title" v-else-if="type === 'warehouses'">Аренда складов {{ activeCity }}</h1>
        <h1 class="title" v-else-if="type === 'retail'">Аренда торговых помещений {{ activeCity }}</h1>
        <h1 class="title" v-else-if="type === 'psn'">Аренда помещений свободного назначения {{ activeCity }}</h1>
        <h1 class="title" v-else>Аренда {{ activeCity }}</h1>
        <!-- <span class="line"></span> -->
      </div>
      <div class="filter-wrap">
        <FilterMain :filterPage="filterPage" :filterType="type" :lots="filteredLots" @onchange="onchange(data)">
        </FilterMain>
      </div>
      <div class="bg-img">
        <img v-lazy="topImg" />
      </div>
    </section>
    <b-container>
      <b-row>
        <b-col cols="12" class="items-list">
          <b-row>
            <b-col cols="12">
              <div class="sub-header">
                <div class="action-table">
                  <button class="action-table-printBtn" @click="print()">Распечатать</button>
                  <button class="action-table-mailBtn" @click="showSendEmailModal()">Отправить на почту</button>
                </div>
                <div class="sorting-table">
                  <div class="sorting-table-title">Сортировать</div>
                  <div class="sorting-table-select">
                    <v-select placeholder="По умолчанию" :options="sorting.options"
                      v-model="sorting.selected"></v-select>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>

          <div id="lots-list">
            <LotsPreview :filteredLots="filteredLots" :filterPage="'rent'" :makeFilterWork="makeFilterWork"></LotsPreview>
          </div>

          <div class="lots-order-block" :class="{ 'active': showOrderLotsPanel }" v-if="filteredLots.length">
            <b-container>
              <b-row>
                <b-col>
                  <div class="lots-order-block-notice">Выберите лоты для бронирования</div>
                </b-col>
                <b-col class="lots-order-block-right">
                  <div class="lots-order-block-selected">
                    <div class="title">Выбрано лотов:</div>
                    <div class="count">{{ selectedLots.length }}</div>
                  </div>
                  <button class="main-btn" @click="showOrderModal()" :class="{'active': selectedLots.length}"
                    :disabled='!selectedLots.length'>Забронировать</button>
                </b-col>
              </b-row>
            </b-container>
          </div>

          <div class="no-lots" v-else>
            По вашему запросу не найдено предложений.
          </div>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>      

<script>
// import vSelect from '~/plugins/vue-select/src/index.js'
// import '~/plugins/vue-select-scss/vue-select.scss'

import img1 from '~/assets/img/slider-1.jpg'
import ModalOrderManyLots from '~/components/modal/OrderManyLots.vue'
import ModalSendLotsToEmail from '~/components/modal/SendLotsToEmail.vue'

export default {
  props: ['type', 'lots', 'filterPage'],
  name: 'indexIntro',
  components: {
    ModalOrderManyLots,
    ModalSendLotsToEmail,
    // vSelect
  },
  data() {
    return {
      topImg: img1,
      filteredLots: [],
      selectedValues: {},
      selectedLots: [],
      sorting: {
        options: [
          {
            label: 'Цена по возрастанию',
            value: 'priceASC'
          },
          {
            label: 'Цена по убыванию',
            value: 'priceDESC'
          },
          {
            label: 'Площадь по возрастанию',
            value: 'squareASC'
          },
          {
            label: 'Площадь по убыванию',
            value: 'squareDESC'
          },
        ],
        selected: [],

      },
      showOrderLotsPanel: false,
      activeCity: '',
      makeFilterWork: false
    }
  },
  methods: {
    async print() {
      const response = await this.$axios.$post('/print-pdf', { lots: this.filteredLots })
      console.log('response ', response)
      if (response.success) {
        setTimeout(() => {
          window.open(response.file, '_blank');
        }, 1000);
      }

    },
    makeFilter(data) {
      console.log('makeFilter ', data)
      this.makeFilterWork = true
      this.hideVisibleLots()
      if (data.prop == 'planType') {
        if (data.value) {
          this.selectedValues[data.prop] = planType => planType === data.value;
        } else {
          delete this.selectedValues[data.prop];
        }
      } else if (data.prop == 'own_entrance') {
        if (data.value) {
          this.selectedValues[data.prop] = own_entrance => own_entrance === data.value;
        } else {
          delete this.selectedValues[data.prop];
        }
      } else if (data.prop == 'isFinishing') {
        if (data.value) {
          this.selectedValues[data.prop] = isFinishing => isFinishing === data.value;
        } else {
          delete this.selectedValues[data.prop];
        }
      } else if (data.prop == 'isWarm') {
        if (data.value) {
          this.selectedValues[data.prop] = isWarm => isWarm === data.value;
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
        if (data.value) {
          this.selectedValues[data.prop] = type => type === data.value;
        } else {
          delete this.selectedValues[data.prop];
        }
      } else if (data.prop == 'metro') {
        if (data.value) {
          this.selectedValues[data.prop] = metro => metro === data.value;
        } else {
          delete this.selectedValues[data.prop];
        }
      } else if (data.prop == 'city') {
        if (data.value) {
          this.selectedValues[data.prop] = city => city === data.value;
        } else {
          delete this.selectedValues[data.prop];
        }
      }

      // console.log('selectedValues ', this.selectedValues)
      // this.filteredLots = this.filterArray(this.lots, this.selectedValues)
      setTimeout(() => {
        this.filteredLots = this.filterArray(this.lots, this.selectedValues)
      }, 500);

      setTimeout(() => {
        this.makeFilterWork = false
        this.showHiddenLots()
      }, 1000);

    },
    filterArray(array, filters) {
      console.log('filters ', filters)
      const filterKeys = Object.keys(filters);
      return array.filter(item => {
        // validates all filter criteria
        return filterKeys.every(key => {
          // ignores non-function predicates
          if (typeof filters[key] !== 'function') return true;
          return filters[key](item[key]);
        });
      });
    },
    selectLots(data) {
      if (data.checked) {
        this.selectedLots.push(data.lot)
      } else {
        var index = this.selectedLots.findIndex(lot => lot.lot == data.lot.lot)
        this.selectedLots.splice(index, 1)
      }

    },
    showOrderModal(data) {
      console.log('this.selectedLots ', this.selectedLots)
      this.$modal.show(ModalOrderManyLots, {
        mode: 'orderLots',
        lots: this.selectedLots
      }, {
        draggable: false,
        width: '100%',
        height: '100%',

      }, {
        // 'before-open': (event) => { this.$store.commit('setFeedbackModal', true) },
        // 'before-close': (event) => { this.$store.commit('setFeedbackModal', false) }
      })
    },
    showSendEmailModal(data) {
      this.$modal.show(ModalSendLotsToEmail, {
        mode: 'sendEmail',
        lots: this.filteredLots
      }, {
        draggable: false,
        width: '100%',
        height: '100%',

      }, {
        // 'before-open': (event) => { this.$store.commit('setFeedbackModal', true) },
        // 'before-close': (event) => { this.$store.commit('setFeedbackModal', false) }
      })
    },
    sortingLots(data) {

      if (data == 'squareDESC') {
        this.filteredLots.sort(function (a, b) {
          return b.square - a.square;
        });
      } else if (data == 'squareASC') {
        this.filteredLots.sort(function (a, b) {
          return a.square - b.square;
        });
      } else if (data == 'priceDESC') {
        this.filteredLots.sort(function (a, b) {
          return b.price - a.price;
        });
      } else if (data == 'priceASC') {
        this.filteredLots.sort(function (a, b) {
          return a.price - b.price;
        });
      } else if (data == 'default') {
        this.filteredLots.sort(function (a, b) {
          return a.lot - b.lot;
        });
      }
    },
    isElemVisible(el) {
      var rect = el.getBoundingClientRect();
      var elemTop = rect.top; // 200 = buffer
      var elemBottom = rect.bottom;
      return elemTop < window.innerHeight && elemBottom >= 0;
    },
    showHiddenLots() {
      const fadeInElements = Array.from(document.getElementsByClassName("lot-container"));
      console.log('fadeInElements ', fadeInElements.length)
      const interval = 200;
      for (let i = 0; i < fadeInElements.length; i++) {
        setTimeout(
          function () {
            const elem = fadeInElements[i];
            //if (this.isElemVisible(elem)) {
            if (true) {
              elem.classList.add("show")
            }
          }.bind(this),
          i * interval
        );
        //fadeInElements.splice(i, 1) // only allow it to run once
      }

    },
    hideVisibleLots() {
      const fadeInElements = Array.from(document.getElementsByClassName("lot-container"));
      console.log('fadeInElements ', fadeInElements.length)
      for (let i = 0; i < fadeInElements.length; i++) {
        const elem = fadeInElements[i];
        elem.classList.remove("show")
      }
    }

  },
  mounted() {

    setTimeout(() => {
      this.showHiddenLots()
    }, 500);
    
    setTimeout(() => {
      this.showOrderLotsPanel = true;
    }, 1000);

  },
  created() {
    this.$nuxt.$on('onchange', (data) => {
      console.log('onchange ', data)
      if (data.prop == 'city' && data.value == 'Москва') {
        this.activeCity = 'в Москве'
      } else if (data.prop == 'city' && data.value == 'Липецк') {
        this.activeCity = 'в Липецке'
      } else {
        this.activeCity = ''
      }
      this.makeFilter(data)
    })
    this.$nuxt.$on('selectLot', (data) => {
      this.selectLots(data)
    })
    this.filteredLots = this.lots
    this.sortingLots('default')
    //this.sortingLots(this.sorting.selected)

  },
  computed: {

    // filteredLots() {

    //   return this.filterArray(this.lots, this.selectedValues)
    // }

  },
  watch: {
    'sorting.selected': function (newVal, oldVal) {
      //console.log('sorting ', newVal.value, oldVal.value)
      if (newVal != null) {
        this.sortingLots(newVal.value)
      } else {
        this.sortingLots('default')
      }
    }

  }


}
</script>


<style lang="scss">


</style>