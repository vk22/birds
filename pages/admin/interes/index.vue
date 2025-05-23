<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>Интересы</h1>
          </div>
          <AdminOrdersItemsList 
            :type="'interes'"
            :items="filteredInteres" 
            :header="['Лоты / Проект', 'Имя/Телефон/Email', 'Дата']"
            :selectable="true" 
            :selectedItems="selectedItems" 
            @selectItem="selectItem">
          </AdminOrdersItemsList>
        </div>
      </div>
    </div>
    <div class="page-actions fixed" :class="{ 'active': selectedItems.length > 0 }">
      <div class="container">
        <div class="row">
          <div class="col-md-10 d-flex align-items-center justify-content-start">
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
      interes: [],
      filteredInteres: [],
      selectedItems: [],
      filterOptions: {
        type: [
          {
            label: 'Офисы',
            value: 'офис'
          },
          {
            label: 'Склады',
            value: 'склад'
          },
          {
            label: 'Торговые помещения',
            value: 'retail'
          }
        ],
        project: [
        ],
      },
      selectedOptions: {
        type: [],
        project: []
      }
    }
  },
  methods: {
    // selectItem(event, item) {
    //   console.log('item ', item._id)
    //   if (event.target.checked) {
    //     this.selectedItems.push(item)
    //   } else {
    //     var index = this.selectedItems.findIndex(selected => selected._id == item._id)
    //     this.selectedItems.splice (index, 1)
    //   }
    //   console.log('this.selectedItems ', this.selectedItems)
    // },
    selectItem(data) {
      console.log('selectItem ', data)
      const selectedItemsNew = data.items
      console.log('selectedItemsNew ', selectedItemsNew)
      console.log(' this.selectedItems ', this.selectedItems)

      if (data.checked) {
        selectedItemsNew.forEach(item => {
          const find = this.selectedItems.find(selected => selected == item._id)
          console.log('find ', find)
          if (!find) this.selectedItems.push(item._id)
        })
      } else {
        selectedItemsNew.forEach(item => {
          const index = this.selectedItems.findIndex(selected => selected == item._id)
          this.selectedItems.splice(index, 1)
        })

      }
    },
    async deleteMany() {
      const response = await this.$axios.$post('/delete-interes/', this.selectedItems)
      if (response.success) {
        this.getItems()
        this.selectedItems = []
      }
    },
    async getItems() {
      const response = await this.$axios.$post('/get-interes/')
      response.interes.map(item => {
        item.date = this.$formatDate(item.date)
        item.remove = false
      });

      this.interes = response.interes;
      this.filteredInteres = response.interes;
      this.getProjectsData()

    },
    getProjectsData() {
      var allProjects = []
      this.interes.map(order => {

        order.order.map(item => {
          allProjects.push(item.project)
        })

      })
      //console.log('allProjects', allProjects)
      this.filterOptions.project = this.removeDublikates(allProjects)
    },
    removeDublikates(data) {
      return data.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t === item
        ))
      )
    },
    makeFilter(data) {
      console.log('makeFilter ', data)
      if (data.prop == 'project') {
        if (data.value) {
          this.filteredInteres = this.interes.filter(order => {
            let filteredLots = order.order.filter(lot => {
              return lot.project === data.value
            })

            if (filteredLots.length > 0) {
              return true
            } else {
              return false;
            }
          })
        } else {
          this.filteredInteres = this.interes
        }
      }
      if (data.prop == 'type') {
        if (data.value) {
          console.log('data.value ', data.value)
          this.filteredInteres = this.interes.filter(order => {
            let filteredLots = order.order.filter(lot => {
              return lot.type === data.value.value
            })

            if (filteredLots.length > 0) {
              return true
            } else {
              return false;
            }
          })
        } else {
          this.filteredInteres = this.interes
        }
      }
    },
    showSendEmailModal(data) {
      console.log('this.selectedItems ', this.selectedItems)
      this.$modal.show(ModalSendOrdersToEmailAdmin, {
        mode: 'sendEmail',
        interes: this.selectedItems
      }, {
        draggable: false,
        width: '100%',
        height: '100%',

      }, {
        // 'before-open': (event) => { this.$store.commit('setFeedbackModal', true) },
        // 'before-close': (event) => { this.$store.commit('setFeedbackModal', false) }
      })
    },

  },
  watch: {
    'selectedOptions.project': function (newVal, oldVal) {
      var data = {
        prop: 'project',
        value: newVal
      }
      this.makeFilter(data)
    },
    'selectedOptions.type': function (newVal, oldVal) {
      var data = {
        prop: 'type',
        value: newVal
      }
      this.makeFilter(data)
    },
  },
  created() {

  },
  destroyed() {
  },
  mounted() {
    this.getItems();
  },
  computed: {

  }
} 
</script>

<style lang="scss">
#interes {

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

}
</style>
