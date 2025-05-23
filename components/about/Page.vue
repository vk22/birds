<template>
  <section class="about-inner">
    <div class="about-top">
      <div class="about-top__content">
        <div class="container">
          <div class="left slideUp fade-in">
            <div class="top-slider-title">
              <p>Управляющая компания <strong>«Birds»</strong> оказывает услуги по управлению коммерческой
              недвижимостью с 2000 года.</p>
            </div>
            <span class="line"></span>
          </div>
        </div>
      </div>
      <div class="about-top__bg"></div>
      <div class="about-top__bg2"></div>
      <div class="about-top__img lazyImg slideUp fade-in">
        <img v-lazy='"/uploads/about-company.jpg"' class="img-cover">
      </div>
    </div>
    <!-- <advantages :advantagesData="advantagesData"></advantages>     -->
    <div class="about-main">
      <b-container>
        <b-row>
          <b-col cols="12" md="6">
            <div class="slideUp fade-in">
              <div class="block-title h1">Почему мы?</div>
              <div class="text-block">
                <p>Управляющая компания «Birds» оказывает услуги по управлению коммерческой недвижимостью с 2000 года.
                  Наши специалисты имеют большой опыт и многолетнюю практику в сфере property и facility management,
                  управления арендными отношениями, обслуживания зданий и эксплуатации недвижимости.</p>
                <p>В нашем портфеле 7 объектов, расположенных в разных районах Москвы, насчитывающих около 180 тыс.кв. м.
                  офисных, производственных, складских помещений и помещений свободного назначения.</p>
              </div>
            </div>
          </b-col>
          <b-col cols="12" md="6">
            <div class="slideUp fade-in lazyImg">
              <img v-lazy='"/uploads/about-company2.jpg"' alt="">
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="about-blocks">
      <b-container>
        <b-row>
          <b-col cols="12" md="6">
            <div class="slideUp fade-in">
              <list-block :listingData="listBlockData[0]"></list-block>
            </div>
          </b-col>
          <b-col cols="12" md="6">
            <div class="slideUp fade-in">
              <list-block :listingData="listBlockData[1]"></list-block>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div class="about-feedback">
      <feedback></feedback>
    </div>

  </section>
</template>      

<script>

import Feedback from '~/components/feedbacks/Feedback.vue'

export default {
  props: ['myData'],
  name: 'About',
  components: {
    Feedback
  },
  data() {
    return {
      listBlockData: [
        {
          title: 'Коммерческое управление (Property Management)',
          list: [
            'Разработка концепции развития объекта, реконцепция офисных, торговых и многофункциональных центров',
            'Планирование офисного/торгового пространства',
            'Маркетинговое продвижение объектов коммерческой недвижимости',
            'Коммерческое управление c детальной проработкой инвестиционных стратегий',
            'Брокеридж: определение оптимального пула консультантов с учетом особенностей объекта, управление агентскими договорами',
            'Управление арендными отношениями',
            'Управление дебиторской и кредиторской задолженностью',
            'Юридическое сопровождение',
            'Взаимодействие с государственными органами'
          ]
        },
        {
          title: 'Техническое обслуживание и эксплуатация (Facility Management)',
          list: [
            'Техническое обслуживание и эксплуатация',
            'Управление технической эксплуатацией, клинингом, охраной, услугами службы ресепшн',
            'Постоянный контроль над соблюдением условий договоров, заключенных в отношении объекта',
            'Управление строительно-монтажными, ремонтными и восстановительными работами',
            'Управление кризисными ситуациями, которые возникают при эксплуатации недвижимости, взаимодействие с коммунальными службами, органами управления, муниципальными учреждениями и пр.',
            'Управление инфраструктурой объектов',
            'Технический консалтинг, аудит, эксплуатационный надзор'
          ]
        },
      ],
      advantagesData: {
        page: 'about'
      }

    }
  },
  methods: {
  },
  mounted() {
  },
  destroyed() {
  },
  computed: {

  },


}
</script>


<style lang="scss">
.about-inner {
  background: #f3f5f9;
}


.about-top {
  width: 100%;
  // height: calc(100vh - 0px);
  display: flex;
  position: relative;
  overflow: hidden;

  @include for-phone-only {
    margin-bottom: 4rem;
    height: 70vh;
  }

  @include for-tablet-portrait-up {
    margin-bottom: 10rem;
    height: 100vh;
  }

  &__bg {
    background: #F3F5F9;
    position: absolute;
    height: 100%;
    width: 65%;
    top: 0;
    left: 0;
    z-index: 9;
    clip-path: polygon(0 0, 100% 0, calc(100% - 10%) 100%, 0 100%);

    @include for-phone-only {
      width: 60%;
      height: 100%;
      //top: 30%;
    }

    @include for-desktop-up {
      width: 80%;
    }

    @include for-big-desktop-up {
      width: 70%;
    }
  }

  &__bg2 {
    background: #F3F5F9;
    position: absolute;
    height: 100%;
    width: 65%;
    top: 0;
    left: 3rem;
    z-index: 9;
    clip-path: polygon(0 0, 100% 0, calc(100% - 10%) 100%, 0 100%);
    opacity: .5;

    @include for-phone-only {
      width: 60%;
      height: 100%;
      //top: 30%;
    }

    @include for-desktop-up {
      width: 80%;
    }

    @include for-big-desktop-up {
      width: 70%;
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
      //top: 30%; 
      height: 99%;
      width: 100%;
    }

  }

  &__content {
    position: absolute;
    height: auto;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;


    @include for-phone-only {
      // position: relative;   
      // padding: 0 20px 10rem;
      // top: 60%;
      // width: 100%;
      // margin: 0;
      // flex-direction: column;

    }

    @include for-tablet-portrait-up {
      // position: relative;   
      // padding: 0 20px 10rem;
      // top: 6rem;
      // width: 100%;
      // margin: 0;
      // flex-direction: row;
    }

    @include for-tablet-landscape-up {
      position: absolute;
      width: 100%;
      margin: 0 15px;
      flex-direction: row;
      padding: 0;
      align-items: end;
    }

    @include for-desktop-up {}

    @include for-big-desktop-up {}

    .left {
      width: 70%;
      padding-right: 5rem;
      padding-bottom: 5rem;

      @include for-phone-only {
        width: 100%;
        padding-right: 51%;
        padding-bottom: 2rem;
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

.about-main {

  @include for-phone-only {
    padding: 1rem 0;
  }

  @include for-tablet-portrait-up {
    padding: 5rem 0;
  }
}

.about-blocks {

  @include for-phone-only {
    padding: 2rem 0;
    margin-bottom: 2rem;
  }

  @include for-tablet-portrait-up {
    padding: 5rem 0;
    margin-bottom: 5rem;
  }

}

.about-feedback {

  @include for-phone-only {
    margin-bottom: 2rem;
  }

  @include for-tablet-portrait-up {
    margin-bottom: 5rem;
  }
}</style>