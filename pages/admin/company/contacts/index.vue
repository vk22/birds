<template>
    <section>
      <div class="container">
          <div class="row">
              <div class="col-md-12">
                  <div class="admin-content-header">
                    <h1>Контакты</h1>
                    <nuxt-link to="/admin/add-new-project" class="admin-main-btn">Добавить новый </nuxt-link>
                    
                  </div>
                    
                    <div class="card" v-for="(contact, index) in contacts" :key="index">
                        <div class="one-project-prev-info-block row">
                          <div class="col-md-1 row-item-col-1">
                            <div>{{index+1}} </div>
                          </div>
                          <div class="col-md-2 row-item-col-2">
                            <nuxt-link :to="'/admin/contacts/'+contact._id"> 
                              {{contact.city}}
                            </nuxt-link>  
                          </div>
                          <div class="col-md-8 row-item-col-3">
                              {{contact.address}}
                          </div>
                          <div class="col-md-1 row-item-col-1">
                            <div class="handle">
                              <span></span>
                              <span></span>
                              <span></span>

                            </div>
                          </div>

                        </div>
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
  data () {
      return {
        activetab: 1,
        isShow: false,
        category: 'admin',
        contacts: []
      }
    },
    methods: {
      async getContacts () {
          const response = await this.$axios.$get('/contacts/')
          this.contacts = response.contacts;
      },
      async onEnd() {
        // alert('onEnd')

        var posts = this.projects;

        this.allpostsSorted = this.projects.map((project, index) => {
          return { project, order: index + 1 };
        })

        //console.log('this.allposts2 ', this.allpostsSorted)  

        const response = await this.$axios.$o('/order-posts/', this.allpostsSorted)
        //console.log('order-posts response ', response)


        
      }   
        
    },
    created () {

    },
    destroyed () {
    },
    mounted() {
      this.getContacts();
      setTimeout(function () { 
          this.isShow = true;   
       }.bind(this), 400)

    },
    computed: {

  }
} 
</script>

<style lang="scss">


.one-project-prev-info-block {
  
  &__title {
    font-size: 1rem;
    text-transform: uppercase;

    a {
      color: #111
    }
  }
}

</style>
