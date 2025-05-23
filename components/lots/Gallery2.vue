<template>
  <div class="swiper-container" >
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="image in images" :key="image">
        <img v-if="!fake" v-lazy="'/uploads/lots/' + guid + '/' + image" class="slide-image" />
        <img v-else v-lazy="image" class="slide-image" />
      </div>
    </div>
    <!-- If pagination is needed -->
    <div class="swiper-pagination"></div>

    <!-- If navigation buttons are needed -->
    <!-- <div v-if="images.length > 1" class="swiper-prev">&#10094;</div>
      <div v-if="images.length > 1" class="swiper-next">&#10095;</div> -->
    <button class="arrow swiper-prev" v-if="images.length > 1">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" fill="#483949" />
        <path
          d="M25.1992 36L17.9992 29.4L25.1992 22.8"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="square"
        />
        <rect
          x="41.3984"
          y="30.6"
          width="22.8"
          height="1.2"
          transform="rotate(180 41.3984 30.6)"
          fill="white"
        />
      </svg>
    </button>
    <button class="arrow swiper-next" v-if="images.length > 1">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="60" fill="#483949" />
        <path
          d="M34.1992 22.8L41.3992 29.4L34.1992 36"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="square"
        />
        <rect x="18" y="28.2" width="22.8" height="1.2" fill="white" />
      </svg>
    </button>
  </div>
</template>

<script>
import { Swiper, Navigation, Pagination, Autoplay, EffectFade } from "swiper";
import "swiper/swiper-bundle.min.css";
export default {
  name: "Slider",
  props: ["images", "guid", "lot", "fake"],
  data() {
    return {
      isShow: true,
      sliderOptions: {
        effect: "fade",
        centeredSlides: true,
        // direction: "horizontal",
        loop: true,
        modules: [Navigation, Autoplay, EffectFade],
        pagination: false,
        autoplay: {
          delay: 10000,
        },
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        },
      },
    };
  },

  mounted: function () {
    Swiper.use([Navigation, Autoplay, EffectFade]);
    const swiper = new Swiper(".swiper-container", this.sliderOptions);
  },

  methods: {
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-wrapper {
  width: 50%;
}
.swiper-slide {
  text-align: center;
  width: auto;
}
.slide-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: none;
  padding: 0;
  margin: 0;
  //opacity: .75;
  transition: opacity 0.2s ease-in-out;
  path {
    fill: $mainColor;
  }

  // svg {
  //   width: 100%;
  //   height: 100%;
  // }
}

.swiper-prev,
.swiper-next {
  background-color: $mainColor;
  cursor: pointer;
  position: absolute;
  top: 40%;
  // padding: 10px 18px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 1px;
  text-decoration: none;
  user-select: none;
  z-index: 9;

  &:hover {
    // background-color: $mainColorHover;
  }
}

.swiper-next {
  right: 1rem;
}

.swiper-prev {
  left: 1rem;
}

.swiper-button-next,
.swiper-button-prev {
  display: flex;
  background: var(--swiper-navigation-background-color);
  border-radius: 2rem;
  height: 2rem;
  width: 2rem;
}

.swiper-button-next {
  left: auto;
  right: 1.875rem;
}

.swiper-button-prev {
}
</style>