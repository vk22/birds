<template>     
      <section class="error-page">

        <div class="error-top">
            <div class="error-top__content container">
              <div class="left">
                <h1>404</h1>
              </div>
            </div>
            <div class="error-top__bg"></div>
            <div class="error-top__bg2"></div>
            <div class="error-top__img">
              <img src="/uploads/error-top.jpg" class="img-cover">
            </div>  
        </div>

      </section>
</template>      

<script>

export default {
    props: ['myData'],
    name: '404',
    components: {
    },
    data () {
      return {


      }
    },
    methods:{
      logout () {

      }
    },
    created () {


    },
    destroyed () {

    },
    mounted () {

        
        
    },  
    computed: {

    },

    
}
</script>


<style lang="scss">


.error-page {
    background: #f3f5f9;
}


.error-top {
  width: 100%;
  height: calc(100vh - 220px);
  display: flex;
  position: relative;

    &__bg {
      background: #F3F5F9;
      position: absolute;
      height: 100%;
      width: 75%;
      top: 0;
      left: 0;
      z-index: 9;
      clip-path: polygon(0 0,100% 0,calc(100% - 10%) 100%,0 100%);

          @include for-phone-only {    
              width: 60%;
              height: 51%;
              top: 30%;
              margin-top: -1px;
          }
          @include for-desktop-up {
              width: 85%;
          }
          @include for-big-desktop-up {
              width: 75%;
          }
      }

      &__bg2 {
        background: #F3F5F9;
        position: absolute;
        height: 100%;
        width: 75%;
        top: 0;
        left: 3rem;
        z-index: 9;
        clip-path: polygon(0 0,100% 0,calc(100% - 10%) 100%,0 100%);
        opacity: .5;

            @include for-phone-only {    
                width: 60%;
                height: 51%;
                top: 30%;
                margin-top: -1px;
            }
            @include for-desktop-up {
                width: 85%;
            }
            @include for-big-desktop-up {
                width: 75%;
            }
      }

      &__img {
        position: absolute;
        padding: 0px;
        height: 100%;
        width: 50%;
        top: 0;
        right: 0;
        z-index: 8;

        @include for-phone-only {   
          top: 30%; 
          height: 50%;
          width: 100%;
        }
        
      }

      &__content {
        position: absolute;
        height: auto;
        left: 0;
        z-index: 10;
        display: flex;
        justify-content: space-between;
        

        @include for-phone-only { 
            position: relative;   
            padding: 0 20px 10rem;
            top: 6rem;
            width: 100%;
            margin: 0;
            flex-direction: column;

        }
        @include for-tablet-portrait-up {

            position: relative;   
            padding: 0 20px 10rem;
            top: 6rem;
            width: 100%;
            margin: 0;
            flex-direction: row;
        }
        @include for-tablet-landscape-up {
            position: absolute;
            top: 30%;
            width: 100%;
            margin: 0 15px;
            flex-direction: row;
            padding: 0;
            left: 50%;
            transform: translateX(-50%);
        }
        @include for-desktop-up {

        }
        @include for-big-desktop-up {

        }

        .left {
          width: 70%;
          padding-right: 5rem;

          @include for-phone-only {    
            width: 100%;
            padding-right: 40%;
          }

          .title {
            margin-bottom: 4rem;
            letter-spacing: 2px;
            font-weight: 400;
            line-height: 1.45;
            text-transform: uppercase;

            @include for-phone-only {    
                font-size: 1.25rem;
                margin-bottom: 1.5rem;
                letter-spacing: 1px;
            }
            @include for-small-phone-only {    
              font-size: 1.15rem;
            }        
            @include for-tablet-portrait-up {
                font-size: 1.5rem;
                margin-bottom: 3rem;
                letter-spacing: 1px;
            }
            @include for-tablet-landscape-up {
                font-size: 2rem;
            }
            @include for-desktop-up {
                font-size: 2rem;
            }
            @include for-big-desktop-up {
                font-size: 2.25rem;
            }
            
          }

          .line {
              height: 3px;
              width: 100px;
              background-color: $mainColor;
              display: block;
              margin-bottom: 3rem;

            @include for-phone-only {    
                margin-bottom: 2rem;
            }
          }

          .address {
            letter-spacing: 1px;
            font-weight: 400;
            line-height: 1.45;
          }

        }

      }

}

</style>