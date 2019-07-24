<template>
  <el-form
    ref="form"
    :model="newData"
    label-width="120px">
    <el-form-item label="Name">
      <el-input v-model="newData.name"/>
    </el-form-item>
    <el-form-item label="DOB">
      <el-input v-model="newData.dob"/>
    </el-form-item>
    <el-form-item>
      <el-button
        v-if="type==='create'"
        type="primary"
        @click="$emit('create-user',newData)">create</el-button>
      <el-button
        v-if="type==='update'"
        type="primary"
        @click="$emit('update-user',newData)">update</el-button>
      <el-button @click="$router.push('/')">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'create'
    },
    oldData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      newData: JSON.parse(JSON.stringify(this.oldData))
    }
  }
}
</script>

<style scoped>
</style>
