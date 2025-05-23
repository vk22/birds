<template>
  <div class="index-page">
    <main>
      <IndexSectionTop />
      <IndexAbout />
      <IndexServices />
      <IndexSection2 />
      <IndexPromos />
      <IndexSection3 />      
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
      lastPosition: 0
    }
  },
  methods:{
  },
  mounted: function () {
  } ,
  created() {
  },
  destroyed() {
  },
  computed: {
  }
}
</script>

<style lang="scss">

// @import 'assets/scss/index.scss';

.index-section-promos {
  padding: 4rem 0;
  background: #f3f5f9;
}

</style>
