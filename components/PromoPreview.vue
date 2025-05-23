<template>	
      <div class="action-block" v-if="promoData">
        <nuxt-link :to="'/promo/'+promoData.id">
          <div class="image-block">
            <img v-lazy="'/uploads/promo/'+promoData.id+'/'+promoData.cover" alt="">
          </div>
          <div class="info-block ">
            <div class="title"><span v-html="promoData.title"></span></div> 
            <div class="date">
              <span class="date-exist" v-if="!promoData.no_terms">до {{ promoData.date_end }}</span>  
              <span v-else>Бессрочная</span>  
            </div> 
            <div class="bg"></div>
          </div>
        </nuxt-link>
      </div>
</template>

<script>


export default {
    props: ['promoData'],
    name: '',

    data () {
      return {
        cover: '/uploads/promo-prev.png',
        title: 'Скидки на аренду в бизнес-парке «На Донском» <span class="orange">до 8%</span>',
        day: '10',
        mounth: 'Сентября',
        year: '2020'

      }
    },
    methods:{


    },

    mounted () {
      console.log('promoData ', this.promoData)
    },  
    computed: {

    },
    watch: {

    }

    
}

</script>

<style lang="scss" scoped>


.action-block {

  position: relative;
  width: 100%;
  height: 100%;

  a {
    color: #111;
  }

  .image-block {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
      object-fit: cover;
    }
  }

  .info-block {
    position: absolute;
    width: calc(100% - 6rem);
    left: 2rem;
    top: 30%;
    display: flex;
    flex-direction: column;
    z-index: 99;
    filter: drop-shadow(0 5px 20px rgba(70,96,140,.2));

    .title {
      font-size: 1.5rem;
      line-height: 1.35;
      font-weight: 400;
      text-transform: none;
      padding: 2rem 1.5rem 0 1.5rem;
      letter-spacing: 0px;
      margin-bottom: 0;
    }
    // .date {
    //   display: flex;
    //   flex-direction: row;
    //   text-align: left;
    //   font-size: .75rem;
    //   font-weight: 400;
    //   color: #9B9B9B;
    //   padding: 2rem 1rem 0 1rem;
    //   line-height: 1.25;
    //   text-transform: uppercase;
    //   letter-spacing: 1px;

    //   span {
    //     padding: 0 .2rem;
    //   }
    // }
    
    .date {
      font-size: 0.85rem;
      text-transform: uppercase;
      color: #999;
      padding: 1rem 1.5rem 2rem 1.5rem;

      .date-exist {
          color: $mainColor;
      }
    }

    .more {
      padding: 1rem 1rem 2rem 1rem;
      display: flex;

      a {
        color: $mainColor;
        font-size: .8rem;
        font-weight: 400;
      }
    }

    .bg {
      background: #fff;
      box-shadow: 0 5px 25px #eaeaf4;
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      clip-path: polygon(0 0,100% 0,calc(100% - 15px) 100%,0 100%);
    }
    
  }
}


  

</style>
