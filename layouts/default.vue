<template>
   <div class="page-container" v-bind:class="{visible: isShow}">
    <main-header></main-header>
    <nuxt />
    <page-footer></page-footer>
  </div>
</template>

<script>
import utils from '~/utils/utils.js'
import MainHeader from '~/components/Header.vue'
import PageFooter from '~/components/Footer'

export default {
  components: {
    MainHeader,
    PageFooter
  },
  data() {
    return {
      isShow: true,
    }
   
  },
  methods: {
    handleScroll() {
      this.utils.handleScroll()
    }
  },
  mounted() {
    this.handleScroll()
    document.addEventListener('scroll', this.handleScroll)
  },
  created() {
    this.utils = utils
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },
  computed: {

  },
  watch: {
    $route(to, from) {
      setTimeout(() => {
        this.handleScroll()
      }, 500);
    },
  }
}
</script>



<style lang="scss">

@import 'assets/scss/main.scss';

.page-container {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

.inner-page {
   flex: 1;
}

</style>

