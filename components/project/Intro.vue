<template>     
      <section class="project-intro">
        <!-- <div class="project-banner-container">
          <div class="container">
            <nuxt-link to="/projects" class="project-back-btn">Все проекты</nuxt-link>
          </div>
        </div> -->
        <div class="bg-img lazyImg">
          <img v-lazy="'/uploads/projects/'+project.id+'/'+project.cover"/>
        </div> 
      </section>
</template>      

<script>
//import img1 from './img/project-banner.jpg'

export default {
    props: ['project'],
    name: '',
    components: { 
        
    },
    data () {
      return {
        //topImg: img1,
        introBottom: undefined
      }
    },
    methods:{

    },

    mounted () {
        
    },  
    computed: {

    },
    watch: {
      // firstName: function (val) {
      //   this.fullName = val + ' ' + this.lastName
      // },
    }

    
}
</script>


<style lang="scss">




.project-intro {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 12rem 0 5rem;
  min-height: calc(100vh - 20vh);

  @include for-phone-only {    

  }

  @include for-small-phone-only {    

  }

  @include for-tablet-portrait-up {

  }
  @include for-tablet-landscape-up {
    
  }
  @include for-desktop-up {

  }
  @include for-big-desktop-up {

  }

  .project-banner-container {
      position: absolute;
      z-index: 999;
      bottom: 200px;

      .project-back-btn {
        position: relative;
        color: #fff;
        padding-left: 20px ;

          &::before {
            position: absolute;
            left: 0;
            content: '';
            background: url(~assets/img/arr-back.svg) no-repeat left center;
            width: 6px;
            height: 100%;
        }
      }
  }


  .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-position: center center;
    background-size: cover; 
    // background-color: #fff;
  
    @include for-phone-only {    
      height: 75%;
      top: 0px;
    }
  
      img {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        object-fit: cover;
        object-position: 5% 40%;
        filter: brightness(75%);
        // @include base-transition(all);
    }
  }


  .intro-text {
    position: relative;
    width: 100%;
    max-width: 1400px;
    text-align: center;
    z-index: 500;
    font-weight: 300;
    line-height: 1.25;
    padding: 0 7%;
    margin-bottom: 5rem;
    @include base-transition(opacity);

    @include for-phone-only {   

    }

    @include for-tablet-portrait-up {

    }

    @include for-tablet-landscape-up {

    }

    @include for-desktop-up {

    }
    @include for-big-desktop-up {
      // width: 100%;
      // max-width: 1400px;
      // left: 50%;
    }

    &.hide {
        opacity: 0;
    }

    .title {
        margin-bottom: 2.5rem;
        letter-spacing: 2px;
        font-weight: 400;
        line-height: 1.55;
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
            font-size: 2.5rem;
        }
    }

    .line {
        //display: none!important;
        height: 3px;
        width: 100px;
        background-color: $mainColor;
        display: block;
        margin: 0 auto;

        @include for-phone-only {    

        }
    }
    
  } 

  .shadow-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    filter: drop-shadow(0 5px 20px rgba(70, 96, 140, 0.2));
    z-index: -1;
  }

  .index-filter {
    position: relative;
    color: #111;
    text-align: left;
    letter-spacing: 1px;
    z-index: 99;
    opacity: 1;
    
    @include for-phone-only {    
      position: relative;
      left: auto;
      bottom: auto;
      width: 92%;
      padding-left: 0rem;
      right: auto;
      //transform: translateX(0%) translateY(5%);
    }

    @include for-tablet-portrait-up {
      position: relative;
      left: auto;
      bottom: auto;
      width: 95%;
      padding-left: 0rem;
      right: auto;
      //transform: translateX(0%) translateY(5%);
    }

    @include for-tablet-landscape-up {
      width: calc(100% - 10rem);
      max-width: 1400px;
      //transform: translateY(25%);
    }

    @include for-big-desktop-up {
      width: calc(100% - 12rem);
      max-width: 1400px;
    }
    
    @include base-transition(all);

    &.hide {
        opacity: 0;
    }

  }

}

// .visible .project-intro .bg-img img {
//   opacity: 1;
//   //object-position: 0% 75%;
// }


</style>