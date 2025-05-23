<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>Акции</h1>
            <nuxt-link to="/admin/promo/add-new" class="admin-main-btn"
              >Добавить новую
            </nuxt-link>
          </div>

          <div class="list-item" v-for="(promo, index) in promos" :key="index">
            <b-row>
              <b-col md="2" class="lazyImg">
                <nuxt-link :to="'/admin/promo/' + promo._id">
                  <img
                    v-lazy="'/uploads/promo/' + promo.id + '/' + promo.cover"
                    width="100"
                    alt=""
                  />
                </nuxt-link>
              </b-col>
              <b-col md="4">
                <div class="one-promo-prev-info-block__title">
                  <nuxt-link :to="'/admin/promo/' + promo._id">{{
                    promo.title
                  }}</nuxt-link>
                </div>
              </b-col>
              <b-col md="3">
                <div class="one-promo-prev-info-block__title">
                  <span v-if="promo.date_start">
                    Начало: {{ $formatDate(promo.date_start) }}</span
                  >
                </div>
              </b-col>
              <b-col md="3">
                <div class="one-promo-prev-info-block__title">
                  <span v-if="promo.date_end">
                    Окончание: {{ $formatDate(promo.date_end) }}</span
                  >
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  layout: "admin",
  data() {
    return {
      activetab: 1,
      isShow: false,
      category: "admin",
      promos: [],
      allpostsSorted: [],
    };
  },
  methods: {
    async getItems() {
      const response = await this.$axios.$get("/promos/");
      response.promos.sort(function (a, b) {
        return parseFloat(a.order) - parseFloat(b.order);
      });
      this.promos = response.promos;
    },
  },
  created() {},
  destroyed() {},
  mounted() {
    this.getItems();
  },
  computed: {},
};
</script>

<style lang="scss">

</style>
