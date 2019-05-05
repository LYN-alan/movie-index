<template>
    <ul class="comment_list">
        <li v-for="(comment,index) in commentsList" :key="comment._id">
            <span>{{index + 1}}</span>
            <span>{{comment.username}}</span>
            <span>{{comment.context}}</span>
            <span>{{comment.check == false?'未审核':'已审核'}}</span>
            <span class="check_btn" @click="check(comment._id)">审核</span>
            <span class="delete_btn" @click="deleteComment(comment._id)">删除</span>
        </li>
    </ul>
</template>
<script>
export default {
    name:'commentsList',
    props: ['commentsList'],
    methods: {
        check(id){
            this.$emit('checkComment',id)
        },
        deleteComment(id){
            this.$emit('deleteComment',id)
        }
    },
}
</script>
<style scoped>
.comment_list>li{
    display: flex;
    align-items: center;
    margin: 10px 0;
}
.comment_list>li span{
    width: 10%;
    display: inline-block;
    text-align: center;
}
.comment_list>li span:nth-of-type(3){
    width: 50%;
}
.check_btn,
.delete_btn{
    cursor: pointer;
}
.check_btn:hover,
.delete_btn:hover{
    color: #409EFF;
}
</style>

