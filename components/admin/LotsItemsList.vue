<template>
  <div class="admin-table">
    <!-- <div style="opacity: 0; height: 0;"> {{ selectedItems }}</div>   -->
    <div class="admin-table__header">
      <b-row align-v="start">
        <b-col cols="1">
          <div class="checkbox" v-if="selectable">
            <input type="checkbox" class="custom-checkbox" :id="'checkbox-all'" @change="selectItems($event, items)" v-model="selectAll">
            <label :for="'checkbox-all'"></label>
          </div>
        </b-col>
        <b-col cols="11">
          <b-row align-v="start">
            <b-col cols="1">
              Тип
            </b-col>
            <b-col cols="2">
              Фото
            </b-col>
            <b-col cols="3">
              Проект
            </b-col>
            <b-col cols="1">
              Этаж
            </b-col>
            <b-col cols="1">
              Отдельный вход
            </b-col>
            <b-col cols="1">
              Площадь, м2
            </b-col>
            <b-col cols="1">
              Стоимость, руб./мес.
            </b-col>
            <b-col cols="1">
              Статус
            </b-col>
          </b-row>
        </b-col>

      </b-row>
    </div>
    <div class="loading" v-show="loading">
      <b-spinner variant="secondary" label="Loading..."></b-spinner>
    </div>
    <div class="admin-card" v-for="(lot, index) in items" :key="index">
        <b-row class="lot-item">
          <b-col cols="1">
            <div class="checkbox" v-if="selectable">
              <input type="checkbox" class="custom-checkbox" :id="'checkbox-' + lot.guid" v-model="lot.checked"
                @change="selectItems($event, [lot])">
              <label :for="'checkbox-' + lot.guid"></label>
            </div>
          </b-col>
          <b-col cols="11">
            <nuxt-link :to="'/admin/lots/' + lot.guid">
            <b-row>
              <b-col cols="1">
                {{ lot.type }}
              </b-col>
              <b-col cols="2" class="lazyImg">
                <img v-if="lot.gallery[0]" v-lazy="'/uploads/lots/' + lot.guid + '/' + lot.gallery[0]" width="100" alt="" class="lot-item__img">
                <img v-else v-lazy="lot.gallery_fake[0]" width="100" alt="" class="lot-item__img">
              </b-col>
              <b-col cols="3">
                {{ lot.project_title }}
              </b-col>
              <b-col cols="1">
                {{ lot.floor_number }}
              </b-col>
              <b-col cols="1">
                <span v-if="lot.own_entrance">Да</span>
                <span v-else>Нет</span>
              </b-col>
              <b-col cols="1">
                {{ lot.square }}
              </b-col>
              <b-col cols="1">
                {{ lot.price }}
              </b-col>
              <b-col cols="1">
                <b-badge :variant="statusHandler(lot.status).color">
                  {{ statusHandler(lot.status).text }}
                </b-badge>
              </b-col>
            </b-row>
          </nuxt-link>
          </b-col>
        </b-row>
    </div> 
  </div>
</template>      

<script>

export default {
  // props: ['lot','index', 'checked', 'selectedItems'],
  props: {
    items: {
      type: Array,
      default: () => []
    },
    lot: {
      type: Object,
    },
    index: {
      type: Number,
      default: 0
    },
    selectable: {
      type: Boolean,
      default: true
    },
    checked: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    // selectedItems: {
    //   type: Array,
    //   default: () => []
    // }
  },
  name: 'AdminLotsItemsList',
  components: {
  },
  data() {
    return {
      isChecked: false,
      selectedItems: [],
      selectAll: false
    }
  },
  methods: {
    selectItems(event, items) {
      // console.log('selectItems 1 ', event.target.checked)
      
      if (event.target.checked) {
        items.forEach( item => {
          const index = this.selectedItems.findIndex(selected => selected == item._id)
          // console.log('selectItems TRUE index ', index)
          if (index > -1) return
          this.selectedItems.push(item._id)
        })
      } else {
        items.forEach( item => {
          const index = this.selectedItems.findIndex(selected => selected == item._id)
          // console.log('selectItems FALSE index ', index)
          this.selectedItems.splice(index, 1)
        })
      }
      // console.log('selectItems 2', this.selectedItems)
      this.$emit('selectedItemsPush', { items: this.selectedItems });
    },
    showOrderModal(data) {
      console.log('showOrderModal')
      this.$modal.show(ModalOrderOneLot, {
        lot: this.lot,
        project: this.project
      }, {
        draggable: false,
        width: '100%',
        height: '100%',

      }, {
        // 'before-open': (event) => { this.$store.commit('setFeedbackModal', true) },
        // 'before-close': (event) => { this.$store.commit('setFeedbackModal', false) }
      })
    },
    statusHandler(status) {
      let res = {};
      if (status === 'secured') {
        res.text = 'Бронь'
        res.color = 'warning'
      } else {
        res.text = 'Свободен'
        res.color = 'success'
      }
      return res
    }

  },
  mounted() {
  },
  created() {

  },
  computed: {
  },
  watch: {
    // items (newData, oldData) {
    //   console.log('>>>> items watch ', newData)
    // },
    selectedItems(newData, oldData) {
      // console.log('selectedItems watch ', newData)
      if (newData.length) {
       
        if (newData.length === this.items.length) {
          this.selectAll = true
          this.items.map(item => {
            item.checked = true
            return item
          })
        } else {
          this.selectAll = false
        }

      } else {
        this.items.map(item => {
          item.checked = false
          return item
        })
      }

    }

  }


}
</script>


<style lang="scss" scoped>
  .lot-item {
    background: #fff;
    padding: .5rem 0;
    margin-bottom: .25rem;

    &__img {
      width: 100%;
    }
  }
  .loading {
    display: flex;
    justify-content: center;
    padding: 4rem;
    width: 100%;
  }
</style>