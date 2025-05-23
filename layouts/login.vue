<template>
   <div v-bind:class="{visible: isShow}">
    <nuxt />
  </div>
</template>

<script>

export default {

  components: {
  },
  data() {
    return {
      isShow: false,
    }
   
  },
  methods: {
      isElemVisible(el) {
          var rect = el.getBoundingClientRect()
          var elemTop = rect.top// 200 = buffer
          var elemBottom = rect.bottom
          return elemTop < window.innerHeight && elemBottom >= 0
      },
      handleScroll() {

          var interval = 250;
          var interval2 = 500;
          var interval3 = 350;
          var fadeInElements0 = Array.from(document.getElementsByClassName('fade-in-0'))
          var fadeInElements = Array.from(document.getElementsByClassName('fade-in'))
          var linesElements = Array.from(document.getElementsByClassName('col'))
          var fadeInElements2 = Array.from(document.getElementsByClassName('fade-in-2'))
          var fadeInElements3 = Array.from(document.getElementsByClassName('fade-in-3'))
          
          //console.log('fadeInElements4 ', fadeInElements4)
          for (let i = 0; i < fadeInElements0.length; i++) {
              setTimeout(function () {
                  var elem = fadeInElements0[i]
                  if (this.isElemVisible(elem)) {
                    //console.log('elem ', elem)
                    elem.style.opacity = '1'
                    elem.style.transform = 'translateY(0px)'
                    //elem.classList.add("show")
                    //fadeInElements.splice(i, 1) // only allow it to run once
                  }
              }.bind(this), i * interval);
          }
          setTimeout(function () {
            for (let i = 0; i < fadeInElements.length; i++) {
                setTimeout(function () {
                    var elem = fadeInElements[i]
                    if (this.isElemVisible(elem)) {
                      //console.log('elem ', elem)
                      elem.style.opacity = '1'
                      elem.style.transform = 'translateY(0px)'
                      //elem.classList.add("show")
                      //fadeInElements.splice(i, 1) // only allow it to run once
                    }
                }.bind(this), i * interval);
            }
          }.bind(this), 50)
          
          setTimeout(function () {
            for (let i = 0; i < fadeInElements2.length; i++) {
                setTimeout(function () {
                    var elem = fadeInElements2[i]
                    if (this.isElemVisible(elem)) {
                      //console.log('elem ', elem)
                      elem.style.opacity = '1'
                      if (window.outerWidth < 668) {
                          elem.style.transform = 'translateY(0px) translateX(0%)'
                      }  else {
                         elem.style.transform = 'translateY(0px) translateX(-50%)'
                      }
                     
                      //elem.classList.add("show")
                      //fadeInElements.splice(i, 1) // only allow it to run once
                    }
                }.bind(this), interval3);
            }
          }.bind(this), 750)

          for (let i = 0; i < fadeInElements3.length; i++) {
              setTimeout(function () {
                  var elem = fadeInElements3[i]
                  if (this.isElemVisible(elem)) {
                    //console.log('elem ', elem)
                    elem.style.opacity = '1'
                    elem.style.transform = 'translateY(0px) translateX(0%)'
                    //elem.classList.add("show")
                    //fadeInElements.splice(i, 1) // only allow it to run once
                  }
              }.bind(this), i * interval2);
          }

          for (let i = 0; i < linesElements.length; i++) {
              setTimeout(function () {
                  var elem = linesElements[i]
                  if (this.isElemVisible(elem)) {
                    elem.classList.add("show")
                  }
              }.bind(this), i * interval2);
          }

      }
  },
  mounted: function () {

      //this.$store.dispatch('getProjects')

      setTimeout(() => {
          this.isShow = true;
      }, 100);

      setTimeout(() => {
          document.addEventListener('scroll', this.handleScroll)
          this.handleScroll()
      }, 250);
                
  }
  
}
</script>



<style lang="scss">

// @import 'assets/scss/index.scss';

</style>

