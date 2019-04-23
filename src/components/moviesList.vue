<template>
    <ul class="movies_list">
        <li v-for="(movie,index) in moviesList" :key="movie._id">
            <span>{{index+1}}</span>
            <span :title="movie.movieName">{{movie.movieName}}</span>
            <span><img v-lazy="movie.movieImg" alt=""></span>
            <span :title="timeFormat(movie.movieTime)">{{timeFormat(movie.movieTime)}}</span>
            <span>{{movie.movieNumSuppose}}</span>
            <span>{{movie.movieNumDownload}}</span>
            <span>{{movie.movieMainPage?'是':'否'}}</span>
            <span class="update" @click="updateMovie(movie._id)">更新</span>
            <span class="delete" @click="removeMovie(movie._id)">删除</span>
        </li>
    </ul>
</template>
<script>
export default {
    name:'movieList',
    props: ['moviesList'],
    methods: {
        updateMovie(id){
            this.$emit('updateMovie',id)
        },
        removeMovie(id){
            this.$emit('removeMovie',id)
        },
        timeFormat(str){
            var oDate = new Date(Number(str)),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth() + 1,
            oDay = oDate.getDate();
            return `${oYear}-${this.getZf(oMonth)}-${this.getZf(oDay)}`
        },
        getZf(num){
            return num<10?'0'+num:num
        }
    }
}
</script>
<style scoped>
.movies_list>li{
    display: flex;
    align-items: center;
    margin: 10px 0;
}
.movies_list>li>span{
    width: 10%;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.movies_list>li>span:nth-of-type(2){
    width: 15%;
}
.movies_list>li>span:nth-of-type(3){
    width: 15%;
}
.movies_list>li>span img{
    width: 80px;
    height: 80px;
    vertical-align: middle;
}
.update,.delete{
    cursor: pointer;
}
.update:hover,.delete:hover{
    color: #409EFF;
}
</style>



