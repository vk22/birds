<template>
    <section class="admin-content" id="subscrubers" v-bind:class="{ show: isShow }">
      <div class="container">
          <div class="row">
              <div class="col-md-12">
                  <div class="admin-content-header">
                    <h1>Subscrubers</h1>
                  </div>
                  <div class="item">
                      <div class="one-subscr-prev-info-block row">
                        <div class="col-md-1">
                          
                        </div>
                        <div class="col-md-7">
                              <b>Email</b>
                        </div>
                        <div class="col-md-4">

                        </div>
                    </div>
                  </div>  
                  <div class="item" v-for="(subscr, index) in subscribes" :key="index">
                      <div class="one-subscr-prev-info-block row">
                        <div class="col-md-1">
                           <input type="checkbox" name="checkbox" value="">
                        </div>
                        <div class="col-md-7">
                                {{subscr.email}}
                        </div>
                        <div class="col-md-4">

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
        subscribes: []
      }
    },
    methods: {
        async getsubscrs () {
          const response = await this.$axios.$post('/get-subscribes/')

          function formatDate(date){
              var date = new Date(date)
              var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
              var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
              var yyyy = date.getFullYear();
              return (dd + "." + MM + "." + yyyy);
          };
          
          // response.allsubscrs.sort(function ( a, b) {
          //     return new Date(a.date_start) - new Date(b.date_start);
          // });

          this.subscribes = response.subscribes;

      }   
        
    },
    created () {

    },
    destroyed () {
    },
    mounted() {
      this.getsubscrs();
      setTimeout(function () { 
          this.isShow = true;   
       }.bind(this), 400)
    },
    computed: {

  }
} 
</script>

<style>




</style>
