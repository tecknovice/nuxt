<template>
    <div class="grid-content bg-color">
        <el-form ref="comment" label-position="left" :model="comment" label-width="100px" >
        <el-form-item label="Name">
            <el-input v-model="comment.name"></el-input>
        </el-form-item>
        <el-form-item label="Email">
            <el-input v-model="comment.email"></el-input>
        </el-form-item>
        <el-form-item label="Comment">
            <el-input type="textarea" rows="5" v-model="comment.body"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Publish</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import CommentApi from "@/apis/comment";
export default {
    data() {
      return {
            comment: {
                postId: '',
                name: '',
                email: '',
                body: ''
            }
        }
    },
    methods: {
        async onSubmit() {
            this.comment.postId = this.$store.state.blogmodule.blog.id
            let response = await CommentApi.insertComment(this.comment)
            if(response.status == 201){
                this.$store.dispatch("commentmodule/insertComment", response.data)               
            }
      }
    }
}
</script>

