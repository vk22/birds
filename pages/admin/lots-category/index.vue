<template>
    <section>
      <div class="container">
          <div class="row">
              <div class="col-md-12">
                  <div class="admin-content-header">
                    <h1>Разделы</h1>
                    <!-- <nuxt-link to="/admin/add-new-project" class="admin-main-btn">Добавить новый </nuxt-link> -->
                  </div>
                  <b-row class="list-item" v-for="(section, index) in lotCategories" :key="index">
                    
                      <b-col cols="1">
                        {{ index + 1 }}
                      </b-col>
                      <b-col>
                        <nuxt-link :to="`/admin/${parentRoute}/${section._id}`"> 
                          {{ section.title }}
                        </nuxt-link>
                      </b-col>
                    
                  </b-row>
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
  data () {
      return {
        activetab: 1,
        isShow: false,
        category: 'admin',
        lotCategories: []
      }
    },
    methods: {
      async getSections () {
          const response = await this.$axios.$get('/lot-categories/')
          this.lotCategories = response.lotCategories;
          console.log('this.lotCategories ', this.lotCategories)
      },  
        
    },
    created () {

    },
    destroyed () {
    },
    mounted() {
      this.getSections();
    },
    computed: {
      parentRoute() {
        return this.$route.path.split('/')[2];
      }

  }
} 
</script>

<style lang="scss">



</style>
