<template>
    <div class="aside">
        <router-link class="nav" tag="div" to="/admin/movie">电影</router-link>
        <router-link class="nav" tag="div" to="/admin/comment">评论</router-link>
        <router-link class="nav" tag="div" to="/admin/article">文章</router-link>
        <router-link class="nav" tag="div" to="/admin/userManagement">用户管理</router-link>
        <router-link class="nav" tag="div" to="/admin/indexConfig">主页配置</router-link>
    </div>
</template>
<script>
export default {
    name:"adminAsize"
}
</script>
<style scoped>
.aside{
    width: 100%;
    max-width: 200px;
    text-align: center;
}
.router-link-active{
    color: #409EFF;
}
.nav{
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
}
</style>

