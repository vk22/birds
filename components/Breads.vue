<template>
  <div class="breadcrumbs">
    <div v-for="(link, i) in breadcrumbsLinks" :key="i">
      <nuxt-link v-if="link.path" :to="link.path" class="breadcrumbs__level">
        <span>{{ link.title }}</span>
        <span class="breadcrumbs__arrow">/</span>
      </nuxt-link>
      <div v-else class="breadcrumbs__level">
        <span>{{ link.title }}</span>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  props: ['page'],
  name: 'breadcrumbs',
  data() {
    return {
      rent: {
        office: {
          title: 'Аренда офисов',
          path: '/rent/offices'
        },
        warehouse: {
          title: 'Аренда складов',
          path: '/rent/warehouses'
        },
        psn: {
          title: 'Аренда помещений свободного назначения',
          path: '/rent/psn'
        }
      },

    }
  },
  methods: {
  },
  computed: {
    breadcrumbsLinks() {
      return this.page.crumbs
    }
  }
}
</script>

<style lang="scss">
.breadcrumbs {
  display: flex;
  margin-bottom: 3rem;

  &__level {
    color: #9B9B9B;
    font-size: .85rem;
    font-weight: 400;
    line-height: 2rem;
  }

  &__arrow {
    color: #9B9B9B;
    font-size: .85rem;
    font-weight: 400;
    margin: 0 .5rem 0 .25rem;
  }

  .nuxt-link-exact-active {
    .breadcrumbs__arrow {
      display: none;
    }
  }
}
</style>