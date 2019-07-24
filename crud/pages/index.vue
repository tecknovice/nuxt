<template>
  <el-container>
    <div>
      <el-row>
        <el-table
          :data="users"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="id"
            width="50"/>
          <el-table-column
            prop="name"
            label="Name"
            width="300"/>
          <el-table-column
            prop="dob"
            label="Date of Birth"
            width="100"/>
          <el-table-column
            label="Operations"
            width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleUpdate(scope.$index, scope.row)">Update</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-button @click="handleAdd">Add new</el-button>
      </el-row>
    </div>

  </el-container>
</template>

<script>
export default {
  computed: {
    users() {
      return this.$store.state.usermodule.users
    }
  },
  async fetch({ store }) {
    await store.dispatch('usermodule/getUsers')
  },
  methods: {
    handleAdd() {
      this.$router.push('/createUser')
    },
    handleUpdate(index, user) {
      this.$router.push({ path: '/updateUser', query: { id: user.id } })
    },
    async handleDelete(index, user) {
      await this.$store.dispatch('usermodule/deleteUser', user)
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
