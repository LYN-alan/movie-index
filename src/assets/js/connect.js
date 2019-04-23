//网络请求
import axios from 'axios';
import store from '@/store/index';

const options = {
    id:store.state.userInfo.id,
    token:store.state.userInfo.token,
    username:store.state.userInfo.username
}
var host = 'http://localhost:3000';
//用户注册
export function register(param){
    let url = host + '/users/register'
    return axios.post(url,param)
}
//用户登录
export function login(param){
    let url = host + '/users/login'
    return axios.post(url,param)
}
//获取所有电影
export function getMovies(param){
    let url = host + '/admin/movie';
    return axios.post(url,param)
}
// 添加电影
export function movieAdd(param){
    let url = host + '/admin/movieAdd';
    return axios.post(url,assignOption(param))
}
// 根据id获取电影详情
export function getMovieDetail(movieId){
    let url = host + '/admin/movieDetail';
    return axios.post(url,assignOption(movieId))
}
//删除电影
export function movieDel(movieId){
    let url = host + '/admin/movieDel';
    return axios.post(url,assignOption(movieId))
}
//更新电影信息
export function movieUpdate(param){
    let url = host +'/admin/movieUpdate';
    return axios.post(url,assignOption(param))
}
//获取所有评论
export function getAllComment(param){
    let url = host +'/admin/commentsList';
    return axios.post(url,param)
}
//审核用户评论
export function checkComment(param){
    let url = host + '/admin/checkComment';
    return axios.post(url,assignOption(param))
}
//删除用户评论
export function delComment(param){
    let url = host + '/admin/delComment';
    return axios.post(url,assignOption(param))
}
//分页获取所有用户
export function getAllUser(param){
    let url = host + '/admin/showUser';
    return axios.post(url,assignOption(param));
}
// 改变用户的封停状态
export function changeUserStop(param){
    let url = host + '/admin/stopUser';
    return axios.post(url,assignOption(param))
}
function assignOption(data){
    return Object.assign(options,data)
}