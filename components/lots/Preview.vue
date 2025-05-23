<template>
  <div
    class="lots-list-wrap "
    :class="{ filtering: makeFilterWork }"
    style="padding: 50px"
  >
    <div class="header-wrap">
      <div class="row-header" v-if="filteredLots.length">
        <div class="row-header__select"><span class="checkbox"></span></div>
        <div class="row-header__object">Объект</div>
        <div class="row-header__floornum">Этаж</div>
        <div class="row-header__entry">Отдельный вход</div>
        <div class="row-header__square">Площадь, м2</div>
        <div class="row-header__price">Стоимость, руб./мес.</div>
        <div class="row-header__order"></div>
      </div>
    </div>
    <div
      v-for="(lot, index) in filteredLots"
      :key="index"
    >
      <div class="lot-container" v-if="lot" >
        <!-- checkbox -->
        <div class="checkbox select-lot">
          <input
            type="checkbox"
            class="custom-checkbox"
            :id="'checkbox-' + lot.guid"
            @change="selectLot($event, lot)"
          />
          <label :for="'checkbox-' + lot.guid"></label>
        </div>
        <div class="lot-card" @click="goToLot(lot._id)">
            <!-- image -->
            <div class="lot-card__image" v-if="lot.gallery">
              <img
                v-if="lot.gallery[0]"
                v-lazy="'/uploads/lots/' + lot.guid + '/' + lot.gallery[0]"
                alt=""
                class="lot-image"
              />
              <img
                v-else
                v-lazy="lot.gallery_fake[0]"
                alt=""
                class="lot-image"
              />
            </div>
            <!-- titles -->
            <div class="lot-card__object">
              <div class="lot-project">{{ lot.type }}</div>
              <div class="place" v-if="lot.project">
                <div class="metro">м. {{ lot.project.metro }}</div>
                <!-- <div class="address">{{ lot.project.address }}</div> -->
              </div>
            </div>
            <!-- floornum -->
            <div class="lot-card__floornum">{{ lot.floor_number }}</div>
            <!-- entry -->
            <div class="lot-card__entry">
              <span v-if="lot.own_entrance">Да</span>
              <span v-else>Нет</span>
            </div>
            <!-- square -->
            <div class="lot-card__square">
              {{ utils.numberWithSpaces(lot.square) }}
            </div>
            <!-- price -->
            <div class="lot-card__price">
              {{ utils.numberWithSpaces(lot.price) }}
            </div>
            <!-- order -->
            <div class="lot-card__order">
              <div class="order-btn">Забронировать</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>      

<script>
import ModalOrderOneLot from "~/components/modal/OrderOneLot.vue";
import utils from "~/utils/utils.js";
export default {
  props: ["filteredLots", "rows", "filterPage", "makeFilterWork"],
  name: "LotPreview",
  components: {
    ModalOrderOneLot,
  },
  data() {
    return {};
  },
  methods: {
    selectLot(event, lot) {
      console.log("selectLot ", event.target.checked);
      $nuxt.$emit("selectLot", { lot: lot, checked: event.target.checked });
    },
    goToLot(id) {
      this.$router.push('/lots/'+id)
    },
    showOrderModal(lot) {
      // console.log("showOrderModal");
      this.$modal.show(
        ModalOrderOneLot,
        {
          lot: lot,
          project: lot.project_title,
        },
        {
          draggable: false,
          width: "100%",
          height: "100%",
        },
        {
          // 'before-open': (event) => { this.$store.commit('setFeedbackModal', true) },
          // 'before-close': (event) => { this.$store.commit('setFeedbackModal', false) }
        }
      );
    },

  },

  mounted() {

  },
  created() {
    this.utils = utils;
  },
  computed: {
    project() {
      var project = this.$store.getters["getProjectOneById"](
        this.lot.project.guid
      );
      console.log("project ", project);
      return project;
    },
  },
  watch: {},
};
</script>


<style lang="scss" scoped>
.lot-card {
  .lot-project {
    font-weight: 600;
  }
}

.lots-list-wrap {
  .lot-container {
    background: #fff;
    color: #111;
    display: flex;
    position: relative;
    // border-radius: 12px;
    padding: 1.5rem 1rem;
    margin-bottom: 7px;
    font-size: 0.95rem;
    font-weight: 400;
    line-height: 1.45;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.02);
    transition: all 0.5s ease-in-out;
    opacity: 0;
    transform: translateY(2rem);

    @include for-phone-only {
      border: 2px solid $mainColor;
    }

    &:hover {
      box-shadow: 0 1px 50px rgba(0, 0, 0, 0.10);
    }

    &.show {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .header-wrap {
    display: block;
    position: relative;
    padding: 1rem;
  }

  .row-header {
    display: flex;
    align-items: flex-start;
    color: #777;
    font-weight: 500;
    font-size: 0.85rem;
    margin: 0px;
    margin-bottom: 2px;
    border: none !important;

    @include for-phone-only {
      display: none;
    }
    @include for-tablet-portrait-up {
      display: flex;
      font-size: 0.7rem;
    }
    @include for-tablet-landscape-up {
      font-size: 0.85rem;
    }
    @include for-desktop-up {
      font-size: 0.85rem;
    }
    @include for-big-desktop-up {
      font-size: 0.85rem;
    }

    div {
      overflow: hidden;
      // text-align: center;
    }

    //////

    &__select {
      width: 1%;
      text-align: left !important;
    }
    &__object {
      width: 45%;
      text-align: left;
    }
    &__floornum {
      width: 10%;
    }
    &__entry {
      width: 10%;
    }
    &__square {
      width: 10%;
    }
    &__price {
      width: 10%;
    }
    &__order {
      width: 9%;
    }
  }

  .select-lot {
      position: relative;
      text-align: left !important;
      display: flex;
      align-items: center;

      @include for-phone-only {
        width: 50%;
        &:before {
          content: "Выбрать";
          position: absolute;
          color: #6d6d6d;
          margin-top: -5rem;
        }

        // label {
        //   position: relative;
        //   top: 3px;
        // }
      }
      @include for-tablet-portrait-up {
        width: 2.5%;
      }
    }

  .lot-card {
    display: flex;
    align-items: center;
    cursor: pointer;

    @include for-phone-only {
      flex-wrap: wrap;
      padding-top: 2rem;
      width: 95%;
    }
    @include for-tablet-portrait-up {
      flex-wrap: nowrap;
      width: 97.5%;
    }

    & > div:not(.lot-card__order) {
      position: relative;

      @include for-phone-only {
        padding: 1.25rem 0.5rem;
        align-items: flex-start;
        justify-content: center;
        min-height: 60px;
        height: auto;
      }
    }

    div {
      overflow: hidden;
      // text-align: center;
    }



    &__image {
      @include for-phone-only {
        width: 50%;
      }
      @include for-tablet-portrait-up {
        width: 15%;
      }

      img {
        width: 100%;
      }
    }

    &__object {
      display: flex;
      align-items: left;
      flex-direction: column;
      text-align: left;
      padding: 0rem 1rem;

      @include for-phone-only {
        width: 50%;
        font-weight: 500;
        // &:before {
        //   content: "Проект";
        //   position: absolute;
        //   color: #6d6d6d;
        //   margin-top: -1.25rem;
        //   font-weight: 400;
        // }
      }

      @include for-tablet-portrait-up {
        width: 30%;
      }

      div {
        text-align: left;
      }
      .place {
        // background: url("~assets/img/pin-orange.svg") left 5px no-repeat;
        // padding: 0 0 0 1.1rem;
        // margin-top: .25rem;
        // background-size: 10px;
        div {
          line-height: 1.5rem;
          text-align: left;
        }
      }
    }
    &__floornum {
      @include for-phone-only {
        width: 50%;
        font-weight: 500;
        &:before {
          content: "Этаж";
          position: absolute;
          color: #6d6d6d;
          margin-top: -1.25rem;
          font-weight: 400;
        }
      }
      @include for-tablet-portrait-up {
        width: 10%;
      }
    }
    &__entry {
      @include for-phone-only {
        width: 50%;
        font-weight: 500;
        &:before {
          content: "Отдельный вход";
          position: absolute;
          color: #6d6d6d;
          margin-top: -1.25rem;
          font-weight: 400;
        }
      }
      @include for-tablet-portrait-up {
        width: 10%;
      }
    }
    &__finishing {
      @include for-phone-only {
        width: 50%;
        font-weight: 500;
        &:before {
          content: "Отделка";
          position: absolute;
          color: #6d6d6d;
          margin-top: -1.25rem;
          font-weight: 400;
        }
      }
      @include for-tablet-portrait-up {
        width: 10%;
      }
    }
    &__square {
      @include for-phone-only {
        width: 50%;
        font-weight: 500;
        &:before {
          content: "Площадь";
          position: absolute;
          color: #6d6d6d;
          margin-top: -1.25rem;
          font-weight: 400;
        }
      }
      @include for-tablet-portrait-up {
        width: 10%;
      }
    }
    &__price {
      @include for-phone-only {
        width: 50%;
        font-weight: 500;
        &:before {
          content: "Стоимость";
          position: absolute;
          color: #6d6d6d;
          margin-top: -1.25rem;
          font-weight: 400;
        }
      }
      @include for-tablet-portrait-up {
        width: 10%;
      }
    }
    &__order {
      @include for-phone-only {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0.25rem 0.5rem !important;
        background: $mainColor;
        height: auto !important;
      }
      @include for-tablet-portrait-up {
        width: 12%;
      }

      .order-btn {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.5px;
        color: $mainColor;
        cursor: pointer;
        transition-property: all;
        transition-duration: 0.25s;
        transition-timing-function: ease-out;
        // background: $mainColor;
        padding: 0.5rem 0;
        /* border: 1px solid rgba(73,57,73,0.14118); */
        text-align: center;
        border-radius: 4px;
        background: #e7e7e7;

        @include for-phone-only {
          color: #fff;
          background: transparent;
        }
        @include for-tablet-portrait-up {
          color: #868686;
        }
        &:hover {
          // background-color:$mainColorHover;
          // background-position: right 15px center;
          // background-color:$mainColorHover;
          color: $mainColor;
        }
      }
    }
  }
}
</style>