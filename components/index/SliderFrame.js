export default {
  data() {
    return {
      activeIndex: 0,
    };
  },
  computed: {
    slides() {
      // All slides must be children of the `SliderSlides` component.
      return this.$children
        .find(x => x.$options.name === `SliderSlides`).$children;
    },
    slidesCount() {
      return this.slides.length;
    },
    nextIndex() {
      let nextIndex;
      console.log('this.activeIndex ', this.activeIndex)
      console.log('this.slides.length ', this.slides.length)
      if (this.activeIndex == this.slides.length-1) {
        nextIndex = 0;
      } else {
        nextIndex = this.activeIndex + 1;
      }
      return nextIndex <= this.slidesCount - 1 ? nextIndex : 0;
    },
    prevIndex() {
      const prevIndex = this.activeIndex - 1;
      return prevIndex >= 0 ? prevIndex : this.slidesCount - 1;
    },
  },
  mounted() {
    // Immediately activate the first slide.
    if(this.slides.length) {
      this.goToIndex(this.activeIndex);
    }
    
  },
  methods: {
    goToIndex(index) {
      // Find out the direction we're moving.
      // This is useful for animations.
      const direction = index > this.activeIndex ? `left` : `right`;
      // Call the `hide()` method on the currently
      // active `SliderSlide` component.
      this.slides[this.activeIndex].hide(direction);
      // Call the `show()` method on the `SliderSlide`
      // component with the correspondign index.
      this.slides[index].show(direction);
      this.activeIndex = index;
      console.log('this.activeIndex ', this.activeIndex)
    },
    next() {
      this.goToIndex(this.nextIndex);
    },
    prev() {
      this.goToIndex(this.prevIndex);
    },
  },
  render() {
    return this.$scopedSlots.default({
      // Data
      activeIndex: this.activeIndex,
      // Methods
      goToIndex: this.goToIndex,
      next: this.next,
      prev: this.prev,
    });
  },
};
