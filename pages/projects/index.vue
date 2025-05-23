<template>
  <div class="inner-page projects-page">
    <main>
      <b-container>
        <b-row>
          <b-col cols="12">
            <div class="page-title">
              <b-row>
                <b-col>
                  <div class="projects-map-top">
                    <div class="block-title h1">Проекты</div>
                    <div class="projects-map-nav">
                        <!-- <div v-for="city in cities" :key="city.path" @click="setActiveCity(city)" class="item" :class="{'active': city.path === activeCity.path}">{{ city.name }}</div> -->
                    </div>
                    <div class="right" style="width: 150px">

                    </div>
                  </div>

                </b-col>
              </b-row>
              
            </div>
          </b-col>
        </b-row>
        </b-container>
        <div class="projects-map">
          <google-map :city="activeCity.path" :projects="projects"></google-map>
        </div>
        <b-container>  
        <b-row>
          <b-col md="4" v-for="(project, index) in projects" :key="index">
              <ProjectPreview class="slideUp fade-in" :project="project"></ProjectPreview>
          </b-col>
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
      isShow: false,
      cities: [
        {
          name: 'Москва',
          path: 'moscow'
        },
        // {
        //   name: 'Липецк',
        //   path: 'lipetsk'
        // },
      ],
      activeCity: {
          name: 'Москва',
          path: 'moscow'
      }
    }
  },
  methods: {
  },
  mounted() {
  },
  created() {
  }, 
  destroyed() {
  },   
  computed: {
    projects() {
        return this.$store.getters['getProjects'](this.activeCity.name)
    },
  },
}
</script>

<style lang="scss">


.projects-map {
  width: 100%;
  height: 70vh;
  margin-bottom: 5rem;

  @include for-phone-only {   
    display: none;
  }

  @include for-tablet-portrait-up {
    display: block;
  }

}

.projects-map-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
    
    @include for-phone-only {   
      flex-direction: row;
    }

    @include for-tablet-portrait-up {
      flex-direction: row;
    }

    .block-title {
        @include for-phone-only {   
          margin-bottom: 1rem;
        }

        @include for-tablet-portrait-up {
          margin-bottom: 0rem;
        }
    }
}

.projects-map-nav {
  display: flex;
  justify-content: center;
  background: transparent;
  box-shadow: 0 1px 6px rgba(70, 96, 140, 0.2);
  // border: 2px solid #f3f4f7;

  .item {
    background: #fff;
    position: relative;
    font-size: .9rem;
    font-weight: 500;
    text-transform: uppercase;
    padding: .5rem 1rem;
    color: #000000;
    cursor: pointer;
    transition: all .25s;
    
    &:first-child {
      
    }

    &.active {
      background: $mainColor;
      color: #fff;
    }

    @include for-phone-only {   
      font-size: .75rem;
    }

    @include for-tablet-portrait-up {
      font-size: .75rem;
    }

    @include for-tablet-landscape-up {
      font-size: .75rem;
    }

    @include for-tablet-landscape-up {
      font-size: .8rem;
    }

    @include for-desktop-up {
      font-size: .9rem;
    }

    @include for-big-desktop-up {
      font-size: .95rem;
    }

  }
}

</style>
