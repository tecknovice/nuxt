<template>
  <section class="container">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-input placeholder="Please input" v-model="newTodo"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button icon="el-icon-circle-plus-outline" @click="createTodo">Tạo</el-button>
      </el-col>
    </el-row>
    <el-row v-for="(todo, index) in todos" :key="index" :gutter="20">
      <el-col :span="16">
        <el-input
          v-model="todo.name"
          @keyup.enter="updateTodo(todo)"
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button icon="el-icon-edit" @click="updateTodo(todo)"
        >Sửa</el-button
        >
      </el-col>
      <el-col :span="4">
        <el-button icon="el-icon-delete" @click="deleteTodo(todo)"
          >Xoá</el-button
        >
      </el-col>
    </el-row>
  </section>
</template>
<script>
import todoApi from "@/apis/todo";
export default {
  data() {
    return {
      newTodo: "",
      todos: JSON.parse(JSON.stringify(this.$store.state.todo.todos))
    };
  },
  async fetch({ store, req }) {
    let result = await todoApi.readAllTodos(store, req);
    if(!result.status){
      console.log(result.message)
    }
  },
  methods: {
    async createTodo() {
      let todo = {
        name: this.newTodo
      };
      let result = await todoApi.createTodo(this.$store, todo);
      if(result.status){
        this.todos = JSON.parse(JSON.stringify(this.$store.state.todo.todos))
        this.newTodo = ""
      }else{
        this.$message.error(result.message)
      }
    },
    async updateTodo(todo) {
      let result = await todoApi.updateTodo(this.$store, todo);
      if(result.status){
      }
      else{
        this.$message.error(result.message)
      }
    },
    async deleteTodo(todo) {
      let result = await todoApi.deleteTodo(this.$store, todo);
      if(result.status){
        this.todos = JSON.parse(JSON.stringify(this.$store.state.todo.todos))
      }
      else{
        this.$message.error(result.message)
      }
    }
  }
};
</script>
<style scoped>
.container {
  width: 800px;
  margin: auto;
}
.el-row {
  margin-top: 20px;
}
</style>
