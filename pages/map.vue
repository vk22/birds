<template>
  <div class="inner-page projects-page" v-bind:class="{visible: isShow}">
    <main>
      <b-container>
        <b-row>
          <b-col cols="12">
            <div class="page-breads">
              <breads></breads>
            </div>
            <div class="page-title">
              <div class="block-title h1">Наши проекты</div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="projects-map">
              <google-map :projects="projects"></google-map>
            </div>
          </b-col>
          <!-- <b-col cols="4" v-for="(project, index) in projects" :key="index">
              <project-preview :project="project"></project-preview>
          </b-col> -->
        </b-row>

      </b-container>  
    </main>
  </div>
</template>

<script>
import Breads from '~/components/Breads.vue'
import googleMap from '~/components/MapAllProjects.vue'

export default {
  components: { 
      Breads,
      googleMap
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted: function () {
      //this.startRotation();
      //this.isShow = true;
      setTimeout(() => {
          this.isShow = true;
      }, 100);

                
  } ,
  created() {
    // window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    // window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
      declOfNum(number, titles) {  
          var cases = [2, 0, 1, 1, 1, 2];  
          return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
      }
  },
  
  computed: {
    projects() {
        return this.$store.getters['getProjects']
    },
  },
  beforeRouteLeave (to, from, next) {
      //this.$modal.hide();
      next()
    }
}
</script>

<style lang="scss">

.projects-map {
  width: 100%;
  height: 60vh;
}

</style>
