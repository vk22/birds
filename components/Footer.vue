<template>
    <footer class="page-footer">
        <b-container>
          <b-row>
            <b-col md="3">
              <div class="logo"><img src="~assets/img/logo-birds.svg" alt=""></div>
            </b-col>
            <b-col md="3">
                <div class="footer-nav">
                  <b-row>
                    <b-col>
                      <ul>
                        <li v-for="(link, index) in links[0]" :key="index" class="menu-item" >
                            <nuxt-link :to="link.route" class="">{{link.name}}</nuxt-link>
                        </li>
                      </ul>
                    </b-col>
                    <b-col>
                      <ul>
                        <li v-for="(link, index) in links[1]" :key="index" class="menu-item" >
                            <nuxt-link :to="link.route" class="">{{link.name}}</nuxt-link>
                        </li>
                      </ul>
                    </b-col>
                  </b-row>
                </div>
            </b-col>
            <b-col md="3">

            </b-col>
            <b-col md="3">
              <div class="footer-contact">
                <div class="phone">{{ mainPhone }}</div>  
                <div class="address">{{ mainAddress }}</div>
                <!-- <div class="email"><a :href="'mailto:'+mainEmail">{{ mainEmail }}</a></div> -->
              </div>
            </b-col>
          </b-row>
          <div class="footer-bottom">
            <b-row>  
                <b-col md="9">
                  <div class="allright">
                    УК «Birds» © {{ new Date().getFullYear() }} Все права защищены. <br>
                    Любая информация, представленная на данном сайте, носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями статьи 437 ГК РФ
                  </div>
                </b-col>
                <b-col md="3">
                    <div class="footer-social">
                      <span><a href="https://www.facebook.com/" target="_blank"  class="fb"></a></span>
                      <span><a href="https://vk.com/" target="_blank" class="vk"></a></span>
                      <span><a href="https://twitter.com/" target="_blank" class="tw"></a></span>
                    </div>
                </b-col>
            </b-row>
          </div>
        </b-container>
    </footer>  
</template>

<script>

export default {
    props: ['myData'],
    name: 'Footer',
    components: {

    },
    data () {
      return {
        isActive: false,
        links: [
          [
            // {
            //   name: 'О компании',
            //   route: '/company'
            // },
            {
              name: 'Проекты',
              route: '/projects/'
            },
            {
              name: 'Аренда',
              route: '/arenda'
            },
          ],
          [
            {
              name: 'Акции',
              route: '/news'
            },
            {
              name: 'Контакты',
              route: '/contacts'
            }
          ]
        ]
      }
    },
    methods:{

    },
    computed: {
      mainPhone() {
        return this.$store.getters['getCompany'].phone
      },
      mainAddress() {
        return this.$store.getters['getCompany'].address
      },
      mainEmail() {
        return this.$store.getters['getCompany'].email
      }
    },
    created () {

    },
    destroyed () {

    },
    mounted () {

    },  
    watch: {

    }
    
}
</script>


<style lang="scss">



.page-footer {
  background: $backgroundBlue;
  padding: 3rem 0;

  .logo {
    
    @include for-phone-only {    
      width: 125px;
    }
    @include for-tablet-portrait-up {
      width: 150px;
    }

    img {
      width: 100%;
    }
  }
  
  .footer-nav {

    @include for-phone-only {    
      padding: 2rem 0;
    }
    @include for-tablet-portrait-up {
      padding: 0;
    }
    
    ul {
      list-style: none;

      li {
        line-height: 2.25;
        a {
          color: #111;
          text-transform: uppercase;
          font-size: .85rem;
        }
      }
    }
  }

  .footer-contact {

    @include for-phone-only {    
      padding: 0rem 0 0rem;
    }
    @include for-tablet-portrait-up {
      padding: 0;
    }

    .phone {
      font-size: 1.25rem;
      font-weight: 500;
      margin-bottom: .5rem;
    }
    .address {
      margin-bottom: .75rem;
    }

  }

  .footer-social {

    a {
      display: inline-block;
      position: relative;
      width: 32px;
      height: 32px;
      opacity: .75;
      @include base-transition(all);

      &.fb::before {
          content: '';
          background-image: url('~assets/img/ic-fb.svg');
          background-repeat: no-repeat;
          background-size: 100%;
          width: 100%;
          height: 100%;
          position: absolute;
      }
      &.vk::before {
          content: '';
          background-image: url('~assets/img/ic-vk.svg');
          background-repeat: no-repeat;
          background-size: 100%;
          width: 100%;
          height: 100%;
          position: absolute;
      }
      &.tw::before {
          content: '';
          background-image: url('~assets/img/ic-tw.svg');
          background-repeat: no-repeat;
          background-size: 100%;
          width: 100%;
          height: 100%;
          position: absolute;
      }

      &:hover {
        opacity: 1;
      }
    }
    
  }

  .allright {
    font-size: .75rem;
    padding-right: 5rem;

    @include for-phone-only {    
      padding: 0rem 0 2rem;
    }
    @include for-tablet-portrait-up {
      padding: 0;
    }
  }

  .footer-bottom {
    margin-top: 2rem;
  }

}

</style>
