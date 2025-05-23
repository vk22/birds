<template>
  <section >
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>Заявка №{{ order.num }}</h1>
            <nuxt-link :to="'/admin/orders'">Назад</nuxt-link>
          </div>
          <div class="card">
            <div class="table-header row">
              <div class="col-md-3">
                Имя
              </div>
              <div class="col-md-3">
                Телефон
              </div>
              <div class="col-md-3">
                Email
              </div>

              <div class="col-md-3">
                Дата
              </div>
            </div>
          </div>
          <div class="card">
            <div class="table-list row">
              <div class="col-md-3">
                {{ order.name }}
              </div>
              <div class="col-md-3">
                {{ order.phone }}
              </div>
              <div class="col-md-3">
                {{ order.email }}
              </div>
              <div class="col-md-3">
                {{ order.date }}
              </div>
            </div>
          </div>
          <div class="order-lots">
            <div class="order-lots__title">
              Лоты
            </div>
            <div class="admin-lots-list">
              <AdminLotsItemsList :items="order.order"
                :header="['Выбрать', 'Тип', 'Фото', 'Название', 'Этаж', 'Отдельный вход', 'Площадь, м2', 'Стоимость, руб./мес.', 'Статус']"
                :selectable="false"></AdminLotsItemsList>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="page-actions fixed" :class="{ 'active': selectedItems.length > 0 }">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <button class="btn mr-3" @click="deleteMany()">Удалить</button>
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
      order: {},
      selectedItems: []
    }
  },
  methods: {
    selectItem(event, item) {
      if (event.target.checked) {
        this.selectedItems.push(item._id)
      } else {
        var index = this.selectedItems.findIndex(selected => selected._id == item._id)
        this.selectedItems.splice(index, 1)
      }
    },
    async deleteMany() {
      const response = await this.$axios.$post('/delete-orders/', this.selectedItems)
      if (response.success) {
        this.getOrders()
        this.selectedItems = []
      }
    },
    async getOrder() {
      const response = await this.$axios.$get('/get-order/' + this.$route.params.id)

      function formatDate(date) {
        var date = new Date(date)
        var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        var yyyy = date.getFullYear();
        var time = date.toLocaleTimeString();
        return (dd + "." + MM + "." + yyyy + " " + time);
      };

      response.order.date = formatDate(response.order.date)
      response.order.remove = false

      this.order = response.order;

    }

  },
  created() {

  },
  destroyed() {
  },
  mounted() {
    this.getOrder();
    setTimeout(function () {
      this.isShow = true;
    }.bind(this), 400)
  },
  computed: {

  }
} 
</script>

<style lang="scss">

  .order-lots {
    margin-top: 3rem;

    &__title {
      font-size: 1.35rem;
      font-weight: 500;
      // text-transform: uppercase;
      margin-bottom: 1rem;
    }
  }

</style>
