<template>
  <div class="lot-gallery">

    <div class="lot-gallery__image">
      <img v-lazy="'/uploads/lots/' + guid + '/' + currentImg" />
    </div>
          
    <a v-if="images.length > 1" class="prev" @click="prev" href='#'>&#10094;</a>
    <a v-if="images.length > 1" class="next" @click="next" href='#'>&#10095;</a>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: ['images', 'guid', 'lot'],
  data() {
    return {
      timer: null,
      currentIndex: 0,
    }
  },

  mounted: function () {
    //this.startSlide();
  },

  methods: {
    startSlide: function () {
      this.timer = setInterval(this.next, 4000);
    },

    next: function () {
      this.currentIndex += 1
    },
    prev: function () {
      this.currentIndex -= 1
    }
  },

  computed: {
    currentImg: function () {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    }
  }

}
</script>

<style lang="scss" scoped>



.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width: 100%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  width: 100%;
  opacity: 0;
}

.lot-gallery {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;

  &__image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 75%;
      max-height: 75%;
    }

  }
.prev, .next {
  background-color: $mainColor;
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 10px 18px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 1px;
  text-decoration: none;
  user-select: none;
  z-index: 9;

  &:hover {
    background-color: $mainColorHover;
  }
}

.next {
  right: 1rem;
}
.prev {
  left: 1rem;
}

}





</style>