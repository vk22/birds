<template>	
    <div class="project-map-full-w">

        <div class="content-item no-border block-sh">
          <div class="project-map">
            <google-map :coords="coords"></google-map>
          </div>
        </div>
    </div>            	
</template>

<script>
import googleMap from '~/components/Map.vue'

export default {
    props: ['coords'],
    name: "GoogleMap",
    components: { 
        googleMap
    },
    data() {
        return {
            direction: {
                startAddress: ''
            } 
    };
  },
  computed: {

  },
  methods: {

  },
    mounted: function () {

    },
};
</script>

<style lang="scss" scoped>



.project-map-full-w {
  position: relative;
  
  @include for-phone-only {    
    margin: 3rem 0;
  }
  @include for-tablet-portrait-up {

  }


}

</style>
