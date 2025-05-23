<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>Заявки</h1>
            <AdminFilterItems
            :options="filterOptions"
            >
            </AdminFilterItems>
          </div>
          <AdminOrdersItemsList
            :type="parentRoute"
            :items="filteredOrders"
            :header="['Лоты', 'Имя/Телефон/Email', 'Дата']"
            :selectable="true"
            :selectedItems="selectedItems"
            @selectItem="selectItem" 
            ></AdminOrdersItemsList> 

        </div>
      </div>
    </div>
    <div class="page-actions fixed" :class="{ 'active': selectedItems.length > 0 }">
      <div class="container">
        <div class="row">
          <div class="col-md-10 d-flex align-items-center justify-content-start">
            <button class="admin-main-btn mr-3" @click="csvExport(csvData)">Экспорт в CSV</button>
            <button class="admin-main-btn mr-3" @click="showSendEmailModal()">Отправить на почту</button>
            <button class="admin-sec-btn mr-3" @click="deleteMany()">Удалить</button>
            <span>Выбрано: {{ selectedItems.length }}</span>
          </div>
          <div class="col-md-2 d-flex align-items-center">

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

// import vSelect from '~/plugins/vue-select/src/index.js'
// import '~/plugins/vue-select-scss/vue-select.scss'
import ModalSendOrdersToEmailAdmin from '~/components/feedbacks/ModalSendOrdersToEmailAdmin.vue'

export default {
  components: {
    // vSelect,
    ModalSendOrdersToEmailAdmin
  },
  layout: 'admin',
  data() {
    return {
      activetab: 1,
      isShow: false,
      orders: [],
      selectedItems: [],
      filterOptions: {
        type: [
          { value: null, text: 'Выберите тип' }
        ],
        project_title: [
          { value: null, text: 'Выберите проект' }
        ],
      },
      filterSelect: {
      },
    }
  },
  methods: {
    csvExport(arrData) {
      console.log('arrData ', arrData)

      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(arrData[0]).join(";"),
        ...arrData.map(item => Object.values(item).join(";"))
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "export.csv");
      link.click();
    },
    // selectItem(event, item) {
    //   console.log('item ', item._id)
    //   if (event.target.checked) {
    //     this.selectedItems.push(item)
    //   } else {
    //     var index = this.selectedItems.findIndex(selected => selected._id == item._id)
    //     this.selectedItems.splice(index, 1)
    //   }
    // },
    selectItem(data) {
      console.log('selectItem ', data)
      const selectedItemsNew = data.items
      console.log('selectedItemsNew ', selectedItemsNew)
      console.log(' this.selectedItems ',  this.selectedItems)
     
      if (data.checked) {
        selectedItemsNew.forEach( item => {
          const find = this.selectedItems.find(selected => selected == item._id)
          console.log('find ', find)
          if (!find) this.selectedItems.push(item._id)
        })
      } else {
        selectedItemsNew.forEach( item => {
          const index = this.selectedItems.findIndex(selected => selected == item._id)
          this.selectedItems.splice(index, 1)
        })
        
      }
    },
    selectAll(event, item) {
      if (event.target.checked) {
        this.filteredOrders.forEach(item => {
          item.remove = true
          this.selectedItems.push(item)
        })
      } else {
        this.filteredOrders.forEach(item => {
          item.remove = false
        })
        this.selectedItems = []
      }
    },
    async deleteMany() {
      const response = await this.$axios.$post('/delete-orders/', this.selectedItems)
      if (response.success) {
        this.getOrders()
        this.selectedItems = []
      }
    },
    async getItems() {
      const response = await this.$axios.$post('/get-orders/')
      response.orders.map(item => {
        item.date = this.$formatDate(item.date)
        item.remove = false
      });
      this.orders = response.orders;
      this.filteredOrders = response.orders;
      this.getProjectsData()
    },
    getProjectsData() {
      var allProjects = []
      var allTypes = []
      this.orders.forEach(order => {
        order.order.map(item => {
          allProjects.push(item.project_title)
          allTypes.push(item.type)
        })
      })
      this.filterOptions.project_title.push.apply(this.filterOptions.project_title, this.removeDublikates(allProjects));
      this.filterOptions.type.push.apply(this.filterOptions.type, this.removeDublikates(allTypes));
    },
    removeDublikates(data) {
      return data.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t === item
        ))
      )
    },

    showSendEmailModal(data) {
      console.log('this.selectedItems ', this.selectedItems)
      this.$modal.show(ModalSendOrdersToEmailAdmin, {
        mode: 'sendEmail',
        orders: this.selectedItems
      }, {
        draggable: false,
        width: '100%',
        height: '100%',

      }, {
        // 'before-open': (event) => { this.$store.commit('setFeedbackModal', true) },
        // 'before-close': (event) => { this.$store.commit('setFeedbackModal', false) }
      })
    },
    filterArray(array, filters) {
      const filterKeys = Object.keys(filters);
      return array.filter(item => {
        // // validates all filter criteria
        // console.log('item ', item)
        return filterKeys.every(key => {
          // if (typeof filters[key] !== 'function') return true;
          if (item[key] && filters[key])  {
            //console.log('filters[key] ', filters[key], item[key], '>>>', filters[key] === item[key])
            return filters[key] === item[key];
          }
        });
      });
    },
  },
  watch: {
  },
  created() {

  },
  destroyed() {
  },
  mounted() {
    this.getItems();
  },
  computed: {
    csvData() {
      return this.selectedItems.map(orders => ({
        name: orders.name,
        phone: orders.phone,
        lots: orders.order.map(order => {
          return order.project + ' / ' + order.type + ' / ' + order.square + 'm2 '
        }),
        date: orders.date,
      }));
    },
    parentRoute() {
      return this.$route.path.split('/')[2];
    },
    filteredOrders() {
      const filterSelected = this.$store.getters['admin/getFilterSelected']
      // console.log('filterSelected 111', filterSelected)
      let items = this.orders
      if (filterSelected) {
          items = this.orders.filter(order => {
            let filteredLots = this.filterArray(order.order, filterSelected)
            // console.log('filteredLots ', filteredLots, order.date)
            if (filteredLots.length > 0) {
              return true
            } else {
              return false;
            }
          })
      }
      return items
    }

  }
} 
</script>

<style lang="scss">
#orders {

  .card {
    .checkbox {
      display: flex;

      label {
        margin: 0;
      }
    }
  }

  .order-filters {
    width: 50%;

    .vs__dropdown-toggle {
      background: #fff;
      cursor: pointer;
    }

    .vs__search {
      color: #aaa;
      cursor: pointer;
    }
  }

  .sorting-table {
    display: flex;
    justify-content: flex-end;
    flex-basis: 50%;
    color: #111;

    font-size: .85rem;

    &-title {
      margin-right: 1rem;
      display: flex;
      align-items: center;
      font-weight: 600;
    }

    &-select {
      width: 240px;
    }

    ///// vue-select


    .vs__dropdown-toggle {
      background: #fff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 9px 4px 11px 6px;
      border-radius: 4px;
      cursor: pointer;
    }

    .vs__selected-options {}

    .vs__clear {
      ///display: none;
      position: absolute;
      right: 20px;
      top: 7px;
      z-index: 999;
      display: flex;
    }

    .vs__search {
      color: #aaa;
      cursor: pointer;
      position: absolute;
      width: 80%;
    }

    .vs__selected-options {
      position: relative;
      width: 80%;
      min-height: 22px;
    }

    .vs__actions {
      position: relative;
      width: 20%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .vs__selected {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 190px;
      white-space: nowrap;
      display: block !important;
      font-weight: 500;
    }

    .vs__open-indicator,
    .vs__clear svg {
      fill: rgba(60, 60, 60, 0.5);
      transform: scale(.95);
    }

  }

  .df-dr {
    flex-direction: row;
    display: flex;
  }

}
</style>
