<template>
  <div>
    <div class="admin-dialog" v-if="type == 'promo'">
      <b-row>
        <h3>Удалить промо?</h3>
      </b-row>
      <b-row>
        <button class="admin-main-btn mr-10" @click="deletePost()">Удалить</button>
        <button class="admin-sec-btn" @click="$emit('close')">Отмена</button>
      </b-row>
    </div>
    <div class="admin-dialog" v-if="type == 'project'">
      <b-row>
        <h3>Удалить проект?</h3>
      </b-row>
      <b-row>
        <button class="admin-main-btn mr-10" @click="deleteProject()">Удалить</button>
        <button class="admin-sec-btn" @click="$emit('close')">Отмена</button>
      </b-row>
    </div>
    <div class="admin-dialog" v-if="type == 'contact'">
      <b-row>
        <h3>Удалить контакт?</h3>
      </b-row>
      <b-row>
        <button class="admin-main-btn mr-10" @click="deleteContact()">Удалить</button>
        <button class="admin-sec-btn" @click="$emit('close')">Отмена</button>
      </b-row>
    </div>
    <div class="admin-dialog" v-if="type == 'lot'">
      <b-row>
        <h3>Удалить лот?</h3>
      </b-row>
      <b-row>
        <button class="admin-main-btn mr-10" @click="deleteLot()">Удалить</button>
        <button class="admin-sec-btn" @click="$emit('close')">Отмена</button>
      </b-row>
    </div>
    <div class="admin-dialog" v-if="type == 'lots'">
      <b-row>
        <h3>Удалить лоты?</h3>
      </b-row>
      <b-row>
        <button class="admin-main-btn mr-10" @click="deleteLots()">Удалить</button>
        <button class="admin-sec-btn" @click="$emit('close')">Отмена</button>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  props: ['type', 'promo', 'project', 'contact', 'lot', 'lots'],
  name: 'adminDeleteModal',
  data() {
    return {
      hasError: false,
      responseMessage: '',
      responseStatus: false,
      items: []
    }
  },
  methods: {
    beforeOpen(event) {
    },
    async deletePost() {
      await this.$axios.$delete('/delete-promo/' + this.promo._id)
      this.$emit('close');
      this.$router.push({
        name: 'admin-promo'
      })
    },
    async deleteProject() {
      await this.$axios.$delete('/delete-project/' + this.project._id)
      this.$emit('close');
      this.$router.push({
        name: 'admin-projects'
      })
    },
    async deleteContact() {
      await this.$axios.$delete('/delete-contact/' + this.contact._id)
      this.$emit('close');
      this.$router.push({
        name: 'admin-contacts'
      })
    },
    async deleteLot() {
      this.items.push(this.lot)
      const response = await this.$axios.$delete('/delete-lots/', { data: { lots: this.items } } )
      if (response.success) {
        this.$emit('close');
        $nuxt.$emit('updateLots');
        this.$router.push({
          name: 'admin-lots'
        })
      }

    },
    async deleteLots() {
      this.items = [...this.lots]
      const response = await this.$axios.$delete('/delete-lots/', { data: { lots: this.items } } )
      if (response.success) {
        this.$emit('close');
        $nuxt.$emit('updateLots');
        this.$router.push({
          name: 'admin-lots'
        })
      }
    },
  },
  created() {
    //console.log('created: '+event.params.title);
  }
}
</script>


<style lang="scss">

@import 'assets/scss/admin.scss';

.v--modal-overlay {
  background: rgba(255, 255, 255, .5);
}


.admin-dialog {
  padding: 3rem 3rem;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
}

h3 {
  font-size: 20px;
  margin-bottom: 30px;
}

</style>
