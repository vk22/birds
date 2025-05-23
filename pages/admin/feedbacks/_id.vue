<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>Обратная связь </h1>
            <nuxt-link :to="`/admin/${parentRoute}/`" class="admin-sec-btn">Назад</nuxt-link>
          </div>
          <div class="card">
            <b-row class="mb-2">
              <b-col>
                <b>Имя/Телефон/Email:</b> {{ feedback.name }}
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col>
                <b>Дата:</b> {{ feedback.date }}
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col>
                <b>Сообщение:</b> {{ feedback.message }}
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="page-actions fixed active">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <button class="admin-sec-btn mr-3" @click="deleteMany()">Удалить</button>
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
      feedback: {},
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
      const response = await this.$axios.$post('/delete-feedbacks/', [this.feedback._id])
      if (response.success) {
        this.$router.push(`/admin/${parentRoute}/`)
      }
    },
    async getItem() {
      const response = await this.$axios.$get(`/get-one-feedback/${this.$route.params.id}`)
      response.feedback.date = this.$formatDate(response.feedback.date)
      response.feedback.remove = false
      this.feedback = response.feedback;

    }

  },
  created() {

  },
  destroyed() {
  },
  mounted() {
    this.getItem();
  },
  computed: {
    parentRoute() {
      return this.$route.path.split('/')[2];
    }
  }
} 
</script>

<style lang="scss">
#feedback {

  .feedback-lots {
    margin-top: 3rem;

    &__title {
      font-size: 1.35rem;
      font-weight: 500;
      // text-transform: uppercase;
      margin-bottom: 1rem;
    }
  }

}
</style>
