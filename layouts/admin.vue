<template>
  <div>
    <AdminHeader/>
    <AdminSidebar/>
    <div class="admin-container">
      <nuxt />
    </div>
  </div>
</template>

<script>

export default {
  //middleware: 'auth',
  middleware: ['auth-user'],
  components: {
  },
  data() {
    return {
    }
   
  }
  
}
</script>

<style lang="scss">

</style>
