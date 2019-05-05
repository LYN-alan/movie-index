<template>
    <div class="header">
        <p>Mongo-Vue 电影实例</p>
        <p class="user_info_wrapper">
            <span class="user_name">{{userInfo.username}}</span>
            <span class="go_front" @click="goFront">前往主页</span>
            <span class="log_out" @click="logOut">退出系统</span>
        </p>
    </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
    props:["userInfo"],
    mounted () {
        console.log(this.userInfo)
    },
    methods: {
        goFront(){
            this.$router.push({path:`/index/${this.$route.params.id}`})
        },
        logOut(){
            sessionStorage.removeItem('loginStatus');
            this.commitUserInfo({});
            this.$router.push({path:'/login'})
        },
        ...mapActions([
            'commitUserInfo'
        ])
    }
}
</script>
<style scoped>
.header{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    box-sizing: border-box;
    padding: 0 20px;
}
.user_info_wrapper span{
    display: inline-block;
    padding: 0 10px;
    color: #fff;
    cursor: pointer;
}
</style>

