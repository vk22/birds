<template>
  <section class="lots-list">
    <b-container>
      <b-row>
        <b-col>
          <div class="admin-content-header">
            <h1>Лоты</h1>
            <AdminFilterItems
            :options="filterOptions" :page="'lots'"
            >
            </AdminFilterItems>
          </div>
          <div class="admin-lots-list">
            <AdminLotsItemsList
            :items="filteredLots"
            :header="['Выбрать', 'Тип', 'Фото', 'Название', 'Этаж', 'Отдельный вход', 'Площадь, м2', 'Стоимость, руб./мес.', 'Статус']"
            :selectable="true"
            :loading="loading"
            @selectedItemsPush="selectedItemsGet"
            ></AdminLotsItemsList> 
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div class="page-actions fixed" :class="{ 'active': selectedItems.length > 0 }">
      <div class="container">
        <div class="row">
          <div class="col-md-10 d-flex align-items-center justify-content-start">
            <button class="admin-sec-btn mr-3" @click="showDeletePostModal()">Удалить</button>
            <button class="admin-sec-btn mr-3" @click="clearSelectedItems()">Очистить</button>
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
import adminDeleteModal from '~/components/admin/DeleteModal.vue'
export default {
  components: {
    adminDeleteModal
  },
  layout: 'admin',
  data() {
    return {
      activetab: 1,
      isShow: false,
      category: 'admin',
      lots: [],
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
      selectedOptions: {
        type: null,
        project: null
      },
      loading: false
    }
  },
  methods: {
    async getLots() {
      this.loading = true
      const response = await this.$axios.$get('/lots/', { params: { mode: 'all' } })
      console.log('getLots ', response)
      if (response.success) {
          response.lots.map(item => {
            item.remove = false
            item.checked = false
          });
          // this.filteredLots = response.lots;
          this.lots = response.lots;
          this.loading = false
          this.getProjectsData()
      } else {
        this.lots = []
        this.filteredLots = []
      }

    },
    updateLots() {
      this.selectedItems = []
      this.getLots()
    },
    clearSelectedItems() {
      this.selectedItems = []
    },
    getProjectsData() {
      var allProjects = []
      var allTypes = []
      this.lots.forEach(lot => {
        allProjects.push(lot.project_title)
        allTypes.push(lot.type)
      })
      this.filterOptions.project_title.push.apply(this.filterOptions.project_title, this.removeDublikates(allProjects));
      this.filterOptions.type.push.apply(this.filterOptions.type, this.removeDublikates(allTypes));

      console.log('this.filterOptions ', this.filterOptions)
    },
    removeDublikates(data) {
      return data.filter((item, index, self) =>
        index === self.findIndex((t) => (
          t === item
        ))
      )
    },
    makeFilter(data) {
      
      if (data.value) {
        this.filterSelect[data.prop] = data.value;
      } else {
        delete this.filterSelect[data.prop];
      }
      
      this.filteredLots = this.filterArray(this.lots, this.filterSelect)

    },
    filterArray(array, filters) {
      const filterKeys = Object.keys(filters);
      return array.filter(item => {
        return filterKeys.every(key => {
          return filters[key] === item[key]
        });
      });
    },
    // selectItem(data) {
    //   console.log('3) selectItem ', data)
    //   const selectedItemsNew = data.items
     
    //   if (data.checked) {
    //     selectedItemsNew.forEach( item => {
    //       const find = this.selectedItems.find(selected => selected == item._id)
    //       console.log('4) find ', find)
    //       if (!find) this.selectedItems.push(item._id)
    //       console.log('5) selectedItems.push ', this.selectedItems)
    //     })
    //   } else {
    //     selectedItemsNew.forEach( item => {
    //       const index = this.selectedItems.findIndex(selected => selected == item._id)
    //       this.selectedItems.splice(index, 1)
    //     })
        
    //   }
    // },
    selectedItemsGet(data) {
        this.selectedItems = data.items
        console.log('selectedItemsGet ', data)
    },
    showDeletePostModal(data) {
      this.$modal.show(adminDeleteModal, {
        type: 'lots',
        lots: this.selectedItems,
      }, {
        draggable: false,
        width: 400,
        height: 200,

      }, {
        //'before-open': this.beforeOpen(data),
        'closed': this.deletedLots
      })
    },
    deletedLots() {
      console.log('deletedLots')
      this.getLots()
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
  created() {
    this.getLots()
    this.$nuxt.$on('updateLots', ($event) => this.updateLots())
  },
  destroyed() {
  },
  mounted() {

  },
  computed: {
    filteredLots() {
      const filterSelected = this.$store.getters['admin/getFilterSelected']
      let items = this.lots
      if (filterSelected) {
        items = this.filterArray(this.lots, filterSelected)
      }
      return items
    }
  },
  watch: {
    selectedItems(newData, oldData) {
      console.log('selectedItems !!!', newData)
    }
  },
} 
</script>

<style lang="scss">


.admin-lots-list {

  .row-header {
    display: flex;
    align-items: flex-start;
    color: #777;
    font-weight: 500;
    font-size: .85rem;
    margin: 0px;
    margin-bottom: 2px;
    border: none !important;
    padding: .5rem 0;
  }

}

.custom-select {
  height: 45px;
}

</style>
