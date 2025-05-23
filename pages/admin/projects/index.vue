<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>Проекты</h1>
            <nuxt-link to="/admin/projects/add-new" class="admin-main-btn"><span class="plus">+</span>Добавить проект
            </nuxt-link>
          </div>

          <div class="list-item" v-for="(project, index) in projects" :key="index">
              <nuxt-link :to="`/admin/projects/${project._id}`">
                <b-row>
                  <b-col cols="1">
                    {{ index + 1 }}
                  </b-col>
                  <b-col cols="2" class="lazyImg">
                    <img v-lazy="'/uploads/projects/' + project.id + '/' + project.cover" alt="">
                  </b-col>
                  <b-col class="list-item__title">
                    {{ project.title }}
                  </b-col>
                  <b-col>
                    {{ project.type }}
                  </b-col>
                  <b-col>
                    Класс {{ project.class }}
                  </b-col>
                </b-row>
              </nuxt-link>
          </div>



        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  components: {
  },
  layout: 'admin',
  data() {
    return {
      activetab: 1,
      isShow: false,
      category: 'admin',
      projects: [],
      allpostsSorted: []
    }
  },
  methods: {
    async getProjects() {
      const response = await this.$axios.$get('/projects/')
      response.projects.sort(function (a, b) {
        return parseFloat(a.order) - parseFloat(b.order);
      });
      this.projects = response.projects;
    }
  },
  created() {
    this.getProjects()
  },
  destroyed() {
  },
  mounted() {
  },
  computed: {
  }
} 
</script>

<style lang="scss">

.project-item{
  padding: 1rem 0;
  border-bottom: 1px solid #ebebeb;

  &__title {
    font-size: 1rem;
    text-transform: uppercase;

    a {
      color: #111
    }
  }

}
</style>
