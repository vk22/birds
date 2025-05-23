<template>
  <div class="project-prev block-sh">
    <nuxt-link :to="'/projects/' + project.url">
      <div class="image-block lazyImg">
        <div class="label">{{ project.type }}</div>
        <img v-lazy="'/uploads/projects/' + project.id + '/' + project.preview" alt="">
      </div>
      <div class="info-block">
        <div class="info-top">
          <div class="title">{{ project.title }}</div>
          <!-- <div class="subtitle">{{ project.type }}</div> -->
        </div>
        <div class="place">
          <div class="metro" v-if="project.city != 'Москва'">г. {{ project.city }}</div>
          <div class="metro" v-else>г. {{ project.city }}. м. {{ project.metro }}</div>
          <div class="address">{{ project.address }}</div>
        </div>
        <div class="data">
          <div class="">{{ utils.numberFormate(project.square) }} <span v-if="project.square">м<sup>2</sup></span></div>
          <div class="">{{ project.floors }} {{ utils.declOfNum(project.floors, ['этаж', 'этажа', 'этажей']) }}</div>
          <div class="" v-if="project.parking > 0">{{ project.parking }} м/м</div>
          <div class="" v-else>наземный</div>
        </div>
        <div class="free-spaces">
          <span v-for="(item, index) in freeSpaces" :key="index"> {{ item.type }}: {{ item.data }} <span
              v-if="index + 1 < freeSpaces.length">/</span> </span>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>      

<script>
import utils from '~/utils/utils.js'
export default {
  props: ['project'],
  name: 'ProjectsSlider',

  data() {
    return {

    }
  },
  methods: {

  },

  mounted() {


  },
  created() {
    this.utils = utils
  },
  computed: {
    freeSpaces() {
      return this.project.freeSpaces.filter(space => {
        return space.data != ''
      })
    }
  },
  watch: {

  }


}
</script>


<style lang="scss">
.project-prev {
  position: relative;
  padding: 0 !important;
  margin-bottom: 2rem;
  transform: translateY(0%);
  @include base-transition(transform, 0.5s);

  @include for-phone-only {
    font-size: .85rem;
  }

  @include for-tablet-portrait-up {
    font-size: .85rem;
  }

  @include for-tablet-landscape-up {
    font-size: .85rem;
  }

  @include for-desktop-up {
    font-size: 1rem;
  }

  @include for-big-desktop-up {
    font-size: 1rem;
  }


  &:hover {
    transform: translateY(-1%);

    // .image-block img {
    //   transform: scale(1.05);
    // }
  }

  a {
    color: #111;
    width: 100%;

    &:hover {
      color: #111;
    }
  }

  .image-block {
    width: 100%;
    height: 250px;
    position: relative;
    overflow: hidden;
    margin-bottom: 1.5rem;

    .label {
      position: absolute;
      top: 2rem;
      left: 0;
      background: $mainColor;
      padding: .5rem 1.25rem;
      z-index: 99;
      clip-path: polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
      text-transform: uppercase;
      color: #fff;
      font-size: .8rem;
      letter-spacing: .5px;
    }

    img {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
      object-fit: cover;
      @include base-transition(transform, 0.25s)
    }
  }

  .info-block {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
    width: 100%;
    overflow: hidden;

    .info-top {
      // height: 100px;
    }

    .title {
      font-size: 1.75rem;
      line-height: 1.25;
      font-weight: 500;
      text-transform: none;
      padding: 0 1.25rem;
      letter-spacing: 0px;
      margin-bottom: 1.25rem;
      color: $mainColorText;
    }

    .subtitle {
      padding: 0 1.25rem;
      margin-bottom: 1rem;
      color: #9B9B9B;
    }

    .place {
      background: url('~assets/img/pin-orange.svg') left center no-repeat;
      padding: 0 1.75rem;
      margin: 0 1.25rem;
      margin-bottom: 1.5rem;

      div {
        line-height: 1.25rem;
        font-weight: 300;
      }
    }

    .data {
      display: flex;
      flex-direction: row;
      margin-bottom: 1rem;

      div {
        flex: 0 1 calc(33.33% - 0px);
        text-align: center;
        font-weight: 500;
        color: #9B9B9B;
        padding: 1rem .5rem;
        border: 1px solid #ebebeb;
        border-left: none;
      }
    }

    .free-spaces {
      font-size: .85rem;
      padding: 0 1.25rem;


      // span {
      //   color: #9B9B9B;
      // }
    }

  }
}</style>