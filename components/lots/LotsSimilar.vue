<template>     
      <b-container>
        <b-row>
          <b-col>
             <div class="h3">Похожие предложения</div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="items-list">
              
              <b-row class="header" v-if="lots.length">
                    <b-col cols="1">Лот</b-col> 
                    <b-col cols="2">Проект</b-col> 
                    <b-col cols="2">Тип планировки</b-col> 
                    <b-col cols="1">Этаж</b-col>
                    <b-col cols="2">Отдельный вход</b-col>
                    <b-col cols="1">С отделкой</b-col>
                    <b-col cols="1">Площадь, м2</b-col>
                    <b-col cols="2">Ставка аренды, руб/мес</b-col>
                    
              </b-row>
              <b-row v-else>
                    <b-col cols="12"><span style="color: #bbb; display:none;">Нет площадей...</span> </b-col> 
              </b-row>
              <nuxt-link :to="'/lots/'+lot.lot" class="item block-sh" v-for="(lot, index) in lots" :key="index">
                <LotPreview :lot="lot"></LotPreview>
              </nuxt-link> 

            </div>  
          </b-col>
        </b-row>
      </b-container>  
</template>      

<script>
import img1 from '~/assets/img/slider-1.jpg'
export default {
    props: ['project'],
    name: 'indexIntro',
    components: { 
    },
    data () {
      return {
        topImg: img1
      }
    },
    methods:{

    },

    mounted () {
        
    },  
    computed: {

      lots() {
        var lots = this.$store.getters['getProjectsLots'](this.project)
        console.log('lots ', lots)
        return lots;
      }

    },
    watch: {

    }

    
}
</script>


<style lang="scss">





</style>