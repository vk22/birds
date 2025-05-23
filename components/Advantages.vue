<template>     
      <section class="advantages">
        <b-container>
          <!-- <b-row class="list" v-if="advantagesData.page === 'index'">
            <b-col>
              <div class="advantages__item block-sh">    
                <div>
                  <span>7</span> объектов <i>в Москве:</i> офисно-складские комплексы, бизнес-центры и бизнес-парки
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="advantages__item block-sh">   
                <div> 
                  Более <span>170 000 кв. м.</span> офисов и складских помещений <i>в аренду</i>
                </div>  
              </div>
            </b-col>
            <b-col>
              <div class="advantages__item block-sh">    
                <div>
                  От <span>6 000 р.</span> <br>за 1 кв. м. аренда <i>офисов</i>
                </div>  
              </div>
            </b-col>
            <b-col>
              <div class="advantages__item block-sh">    
                <div>
                  От <span>3 000 р.</span> <br>за 1 кв. м. аренда <i>склада</i>
                </div>  
              </div>
            </b-col>
          </b-row> -->

          <b-row class="list" v-if="advantagesData.page === 'about'">
            <b-col>
              <div class="advantages__item">    
                  <div class="count">99+</div>
                  <div class="text">Партнеров среди застройщиков и банков</div>
              </div>
            </b-col>
            <b-col>
              <div class="advantages__item">    
                  <div class="count">350+</div>
                  <div class="text">Офисов и складов в Москве</div>
              </div>
            </b-col>
            <b-col>
              <div class="advantages__item">    
                  <div class="count">484+</div>
                  <div class="text">Профессиональных сотрудников</div>
              </div>
            </b-col>
            <b-col>
              <div class="advantages__item">    
                  <div class="count">99%</div>
                  <div class="text">Уровень лояльности среди клиентов</div>
              </div>
            </b-col>
          </b-row>

        </b-container>
      </section>
      
</template>      

<script>

export default {
    props: ['advantagesData'],
    name: 'Advantages',

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


<style lang="scss">



.advantages {

  padding: 2rem 0;
  background: #fff;
  margin-bottom: 2rem;

  .list {
      letter-spacing: 0.25px; 
      font-weight: 400; 
      
      @include for-phone-only {  
        padding: .75rem 0 .75rem 0rem ;  
        line-height: 1.35rem;
        flex-direction: column;
        font-size: .85rem;
      }
      
      @include for-small-phone-only {    
        font-size: .75rem;
      }

      @include for-tablet-portrait-up {
        padding: .75rem 0 .75rem 0rem ;  
        line-height: 1.35rem;
        flex-direction: row;
        font-size: .85rem;
      }

      @include for-tablet-landscape-up { 
        font-size: 1rem;
        line-height: 1.75rem;
      }
          
      @include for-big-desktop-up {
        font-size: 1rem;
        line-height: 1.95rem;
      }

      div:first-child {
          border-left: none!important;
      }
    }
  
    &__item {

      &.block-sh {
        min-height: 250px;
        display: flex;
        align-items: center;
        padding: 2em 2rem 2rem 2rem;

        div {
          text-align: center;
        }
      }

      span {
        font-weight: 500;
        font-size: 1.5rem;
        // margin-right: 3px;
        @include for-phone-only {  
          font-size: 1.1rem;
        }
        @include for-tablet-portrait-up {
          font-size: 1.1rem;
        }
        @include for-tablet-landscape-up { 
          font-size: 1.5rem;
        }

      }

      .count {
        font-size: 3rem;
        font-weight: 400;
        margin-bottom: 2rem;
      }

      .text {
        color: #999;
        line-height: 1.25;  
      }

  }

}



</style>