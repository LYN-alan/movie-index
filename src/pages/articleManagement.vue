<template>
    <div>
        <ul class="article_management_nav">
            <router-link tag="li" to="articleList">文章列表</router-link>
            <router-link tag="li" to="articleEditor">新建文章</router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:'articleManagement'
}
</script>
<style scoped>
.router-link-active{
    color: blue;
    text-decoration: underline;
}
.article_management_nav{
    display:flex;
    border-bottom: 1px solid #ddd;
    padding: 5px 0;
}
.article_management_nav>li{
    margin:0 10px;
    cursor: pointer;
}
</style>
