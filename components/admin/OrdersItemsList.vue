<template>
  <div class="admin-table">
    <div style="opacity: 0; height: 0;"> {{ selectedItems }}</div>
    <div class="admin-table__header">
      <b-row align-v="center">
        <b-col cols="1">
          <div class="checkbox" v-if="selectable">
            <input type="checkbox" class="custom-checkbox" :id="'checkbox-all'" @change="selectItems($event, items)" v-model="selectAll">
            <label :for="'checkbox-all'"></label>
          </div>
        </b-col>
        <b-col cols="11">
          <b-row>
            <b-col v-if="type === 'orders'" cols="1">
                #
            </b-col> 
            <b-col v-for="(item, index) in header" :key="index">
              {{ item }}
            </b-col>
          </b-row>
        </b-col>

      </b-row>
    </div>
    <div class="admin-card" v-for="(orderItem, index) in items" :key="index">
      <b-row class="order-item">
        <b-col cols="1">
          <div class="checkbox" v-if="selectable">
            <input type="checkbox" class="custom-checkbox" :id="'checkbox-' + orderItem._id" v-model="orderItem.checked"
              @change="selectItems($event, [orderItem])">
            <label :for="'checkbox-' + orderItem._id"></label>
          </div>
        </b-col>

        <b-col cols="11">
          <nuxt-link :to="`/admin/${type}/${orderItem._id}`">
            <b-row>
              <b-col v-if="type === 'orders'"  cols="1">
                {{ orderItem.num }}
              </b-col> 
              <b-col v-if="type === 'orders'">
                <div v-for="(lot, index) in orderItem.order" :key="index"> {{ lot.project_title }} / {{ lot.type }} / {{
                  lot.square
                }}м<sup>2</sup></div>
              </b-col>
              <b-col v-if="type === 'interes'">
                <span v-if="typeof(orderItem.order[0]) === 'string'">{{ orderItem.order[0] }}</span> 
                <span v-else>{{ orderItem.order.length }} шт.</span> 
              </b-col>
              <b-col>
                <div v-if="type === 'orders' || type === 'feedbacks'">{{ orderItem.name }}</div>
                <div>{{ orderItem.phone }}</div>
                <div>{{ orderItem.email }}</div>
              </b-col>
              <b-col v-if="type === 'feedbacks'">
                {{ getTextPreview(orderItem.message) }}
              </b-col>
              <b-col>
                {{ orderItem.date }}
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
    type: {
      type: String,
    },
    header: {
      type: Array,
      default: () => []
    },
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
    selectedItems: {
      type: Array,
      default: () => []
    }
  },
  name: 'AdminLotPreview',
  components: {
  },
  data() {
    return {
      isChecked: false,
      itemsSelected: [],
      selectAll: false
    }
  },
  methods: {
    getItems() {
      this.items.forEach(item => item.checked = true)
      console.log('this.items ', this.items)
    },
    selectItems(event, items) {
      console.log('selectItem ', event.target.checked)
      let selectItemsTemp = []
      items.forEach(lot => selectItemsTemp.push(lot))
      this.$emit('selectItem', { items: selectItemsTemp, checked: event.target.checked });
      selectItemsTemp = []
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
    getTextPreview(text) {
      if (!text) return;
      if (text.length < 30) {
        return text
      } else {
        return `${text.substring(0, 30)}...`
      }
    },
    goToItemPage(path) {
      this.$router.push(path)
    }

  },


  mounted() {
    this.getItems()
  },
  created() {

  },
  computed: {
    checkIfChecked: {
      get() {
        return this.selectedItems.some(item => item === this.lot._id)
      },
      set(value) {
        this.isChecked = value
      }

    },
  },
  watch: {
    selectedItems(newData, oldData) {
      console.log('new ', newData)
      if (newData.length) {
        newData.forEach(newDataItem => {
          this.items.map(item => {
            console.log('watch item', item._id)
            console.log(item._id === newDataItem)
            if (item._id === newDataItem) item.checked = true
            //else item.checked = false
            return item
          })
        })

        if (newData.length === this.items.length) {
          this.selectAll = true
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


<style lang="scss">
.order-item {
  background: #fff;
  padding: .5rem 0;
  margin-bottom: .25rem;
  cursor: pointer;

  &__img {
    width: 100%;
  }

  .item-table-link {
    font-weight: 600;
  }
}
</style>