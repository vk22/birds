<template>
  <div class="admin-content-header__filters">
    <div v-if="options">
      <b-form-select
        placeholder="Выберите тип"
        :options="options.type"
        v-model="selectedOptions.type"
      ></b-form-select>
    </div>
    <div v-if="options">
      <b-form-select
        placeholder="Выберите проект"
        :options="options.project_title"
        v-model="selectedOptions.project_title"
      ></b-form-select>
    </div>
    <div class="btn-col" v-if="page === 'lots'">
      <nuxt-link to="/admin/lots/add-new" class="admin-main-btn"><span class="plus">+</span>Добавить лот
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options', 'page'],
  data() {
    return {
      filterOptions: {
        type: [
          { value: null, text: 'Выберите тип' }
        ],
        project_title: [
          { value: null, text: 'Выберите проект' }
        ],
      },
      filterSelect: {
      },
      selectedOptions: {
        type: null,
        project_title: null
      }
    }
  },
  watch: {
    'selectedOptions.project_title': function (newVal, oldVal) {
      var data = {
        prop: 'project_title',
        value: newVal
      }
      this.$store.commit('admin/SET_FILTER_SELECTED', data) 
    },
    'selectedOptions.type': function (newVal, oldVal) {
      var data = {
        prop: 'type',
        value: newVal
      }
      this.$store.commit('admin/SET_FILTER_SELECTED', data)
    },
  },
};
</script>

<style>
.red {
  color: red;
}
</style>