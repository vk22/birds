<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>Обратная связь</h1>
          </div>

          <AdminOrdersItemsList 
            :type="'feedbacks'"
            :items="feedbacks" 
            :header="['Имя/Телефон/Email', 'Сообщение', 'Дата']"
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
            <button class="admin-sec-btn mr-3" @click="deleteMany()">Удалить</button>
            <span>Выбрано: {{ selectedItems.length }}</span>
          </div>
        </div>
      </div>
    </div>

  </section>

</template>

<script>

export default {
  components: {
  },
  layout: 'admin',
  data() {
    return {
      activetab: 1,
      isShow: false,
      feedbacks: [],
      selectedItems: []
    }
  },
  methods: {
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
      const response = await this.$axios.$post('/delete-feedbacks/', this.selectedItems)
      if (response.success) {
        this.getFeedbacks()
        this.selectedItems = []
      }
    },
    async getFeedbacks() {
      const response = await this.$axios.$get('/get-feedbacks/')    
      response.feedbacks.map(item => {
        item.date = this.$formatDate(item.date)
        item.remove = false
      });
      this.feedbacks = response.feedbacks;
    }

  },
  created() {

  },
  destroyed() {
  },
  mounted() {
    this.getFeedbacks();
    setTimeout(function () {
      this.isShow = true;
    }.bind(this), 400)
  },
  computed: {

  }
} 
</script>

<style>

</style>
