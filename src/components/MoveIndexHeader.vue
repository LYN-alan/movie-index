<template>
    <div class="header">
        <router-link to='/' tag='div' class='header_menu'>主页</router-link>
        <router-link to='/movieList' tag='div' class='header_menu'>电影</router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.header{
    width: 100%;
    height: 60px;
    position: fixed;
    left: 0;
    top: 0;
    color: #000;
    background-color: #a5a5a5;
    border-bottom: 2px solid #000;
}
.header_menu{
    padding-left: 60px;
    padding-top: 20px;
    float: left;
    color: #fff;
}
</style>
