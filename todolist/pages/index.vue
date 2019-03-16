<template>
  <section class="container">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-input placeholder="Please input" v-model="newTodo"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button icon="el-icon-add" @click="addTodo">Thêm</el-button>
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
        <el-button icon="el-icon-delete" @click="updateTodo(todo)"
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
  },
  methods: {
    async addTodo() {
      let todo = {
        name: this.newTodo
      };
      let result = await todoApi.createTodo(this.$store, todo);
      if(result.status){
        this.todos.push(result.todo);
        this.newTodo = "";
      }else{
        this.$message.error(result.message)
      }
    },
    async updateTodo(todo) {
      let result = await todoApi.updateTodo(this.$store, todo);
    },
    async deleteTodo(todo) {
      let result = await todoApi.deleteTodo(this.$store, todo);
      let index = this.todos.findIndex(item => item.id === todo.id);
      this.todos.splice(index, 1);
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
