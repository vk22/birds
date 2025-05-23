<template>
  <div class="inner-page projects-page" v-bind:class="{visible: isShow}">
    <main>
      <PromoList></PromoList>
    </main>
  </div>
</template>

<script>
import ProjectsSlider from '~/components/ProjectsSlider'
import Breads from '~/components/Breads.vue'

export default {
  components: { 
      ProjectsSlider,
      Breads,
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    projects() {
        return this.$store.getters['projects/getProjects']
    },
  },
}
</script>

<style lang="scss">


</style>
