<template>
  <div class="rent-page" v-bind:class="{ visible: isShow }">
    <main>
      <FilterRent :type="$route.params.id" :lots="allLots" :filterPage="'rent'"></FilterRent>
      <div class="index-section-promos">
        <PromoList></PromoList>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      isShow: false,
      arrowPos: 0,
      limitPosition: 100,
      scrolled: true,
      lastPosition: 0,
      advantagesData: {
        page: 'index'
      }
    }
  },
  mounted: function () {
    setTimeout(() => {
      this.isShow = true;
    }, 100);
  },
  created() {
  },
  destroyed() {
  },
  methods: {

  },

  computed: {
    allLots() {
      return this.$store.getters['getAllLots'](this.$route.params.id)
    }
  },
  beforeRouteLeave(to, from, next) {
    //this.$modal.hide();
    next()
  }
}
</script>

<style lang="scss"></style>
