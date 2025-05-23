<template>          
  <section id="index-section-actions" class="index-section-promos" v-if="promos.length">  
      <b-container>
        <b-row>
          <b-col cols="12">
            <div class="page-title slideUp fade-in">
              <div class="block-title h1 ">Акции и скидки</div>
              <nuxt-link class="view-more" :to="'/promo/'">
                  <svg viewBox="0 0 22 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="Group-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square" transform="translate(0.000000, 3.000000)">
                        <path d="M0.357142857,1.5 L19.3875558,1.5" id="Line-2"></path>
                        <path d="M0.357142857,6.5 L19.3875558,6.5" id="Line-2"></path>
                        <path d="M9.64285714,11.5 L19.1571429,11.5" id="Line-2"></path>
                    </g>
                  </svg>
                  <span>Все акции</span>
              </nuxt-link>
            </div>
          </b-col>
        </b-row>
        <b-row class="list">
            <b-col sm="6" v-for="(promo, index) in promos" :key="index">
              <div class="promo-prev slideUp fade-in">
                <nuxt-link :to="'/promo/'+promo.id">
                  <div class="image-block">
                    <img v-lazy="'/uploads/promo/'+promo.id+'/'+promo.cover" alt="">
                  </div>
                  <div class="info-block">
                    <div class="title">{{ promo.title }}</div> 
                    <div class="date">
                      <span class="date-exist" v-if="!promo.no_terms && promo.date_start && promo.date_end">{{ promo.dates }}</span>  
                      <!-- <span class="date-exist" v-else-if="!promo.no_terms && !promo.date_start && promo.date_end ">до {{ promo.date_end }}</span>   -->
                      <span v-else>Бессрочная</span>  
                    </div> 
                    <div class="bg"></div>
                  </div>
                </nuxt-link>
              </div>
            </b-col>
        </b-row>
      </b-container>  
  </section> 
</template>      

<script>

export default {
    props: ['page'],
    name: 'actionsSlider',

    data () {
      return {
        sliderOptions: {
          slidesPerView: 3,
          spaceBetween: 30,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        activeIndex: 0,
        actions: [
          {
            cover: 'uploads/promo-prev.jpg',
            title: 'Скидки на аренду в бизнес-парке «На Донском» до 8%',
            day: '10',
            mounth: 'Сентября',
            year: '2020'
          },
          {
            cover: 'uploads/promo-prev.jpg',
            title: 'Скидки на аренду в бизнес-парке «На Донском» до 8%',
            day: '10',
            mounth: 'Сентября',
            year: '2020'
          },
          {
            cover: 'uploads/promo-prev.jpg',
            title: 'Скидки на аренду в бизнес-парке «На Донском» до 8%',
            day: '10',
            mounth: 'Сентября',
            year: '2020'
          },
          {
            cover: 'uploads/promo-prev.jpg',
            title: 'Скидки на аренду в бизнес-парке «На Донском» до 8%',
            day: '10',
            mounth: 'Сентября',
            year: '2020'
          },
         
        ],

      }
    },
    methods:{
    },
    mounted() {
    },
    created() {
    }, 
    destroyed() {
    }, 
    computed: {
        promos() {
          return this.$store.getters['getPromos'](this.$route.name)
        }
    },
    watch: {

    }

    
}
</script>


<style lang="scss">

//

</style>