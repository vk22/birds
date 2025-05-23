<template>	
      <div class="listing-block block-sh">
        
        <div class="title">{{ listingData.title }}</div>
        <ul class="custom-list">
          <li v-for="(list, index) in listingData.list" :key="index">{{ list }}</li>
        </ul>

      </div>
</template>

<script>


export default {
    props: ['listingData'],
    name: '',

    data () {
      return {

      }
    },
    methods:{

    },

    mounted () {

    },  
    computed: {

    },
    watch: {

    }

    
}

</script>

<style lang="scss" scoped>



.custom-list {
  list-style: square;
  margin: 20px;
  padding: 0; 
  font-weight: 400;

  li {
    position: relative;
    margin: 1.25rem 0;
    font-weight: 300;
  }
} 

.listing-block{
  margin-bottom: 2rem;
  .title {
    font-size: 1.15rem;
  }

 
}


  

</style>
