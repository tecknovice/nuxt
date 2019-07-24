<template>
  <el-container>
    <user-form 
      type="create"
      @create-user="createUser"/>
  </el-container>
</template>
<script>
import UserForm from '@/components/userForm'
export default {
  components: { UserForm },
  methods: {
    async createUser(user) {
      await this.$store.dispatch('usermodule/createUser', user)
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
</style>
