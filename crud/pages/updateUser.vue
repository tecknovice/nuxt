<template>
  <el-container>
    <user-form 
      :old-data="$store.state.usermodule.user"
      type="update"
      @update-user="updateUser"/>
  </el-container>
</template>
<script>
import UserForm from '@/components/userForm'
export default {
  components: { UserForm },
  async fetch({ store, query }) {
    await store.dispatch('usermodule/getUser', query.id)
  },
  methods: {
    async updateUser(user) {
      await this.$store.dispatch('usermodule/updateUser', user)
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
</style>
