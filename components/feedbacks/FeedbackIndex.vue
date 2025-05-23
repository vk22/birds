<template>
    <div class="feedback-index-wrap">
      <FeedbacksMainForm :formData="formData"></FeedbacksMainForm>
    </div>       
</template>

<script>
export default {
    props: ['order'],
    name: 'myModal',
    data () {
      return {
        formData: {
          title: 'Получить предложение',
          fields: ['name', 'email', 'phone'],
          pageFrom: 'Главная страница'
        },
      }
    },
    methods: {

    }, 
    mounted() {

    },
    computed: {

    }
 }
</script>


<style lang="scss">

.feedback-index-wrap {    
  background: #fff;
  position: relative;
  width: 450px;
  min-height: 250px;
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.15);
  z-index: 9;

  @include for-phone-only {  
      width: calc(100% - 2rem);
      margin: 1rem;
      padding: 2rem 1rem;
  }
  @include for-tablet-portrait-up {  
      width: calc(100% - 2rem);
      margin: 1rem;
      padding: 2rem 1rem;
  }
  @include for-tablet-landscape-up {
      width: 600px;
      margin: 1rem;
      padding: 2rem 1rem;
  }
  @include for-desktop-up {
      width: 600px;
      padding: 3rem;
  }
  @include for-big-desktop-up {
      // top: 12%;
      padding: 3rem;
  }

  @include for-min-height-only {  
      padding: 2.5rem;
      width: 90%;
      max-height: auto;
  }

  @include for-all-height-up {  
      padding: 3rem;
      max-height: auto;

  }
  
}


</style>
