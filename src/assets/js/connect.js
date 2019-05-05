//网络请求
import axios from 'axios';
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
    return axios.post(url,param)
}
// 根据id获取电影详情
export function getMovieDetail(param){
    let url = host + '/admin/movieDetail';
    return axios.post(url,param)
}
//删除电影
export function movieDel(param){
    let url = host + '/admin/movieDel';
    return axios.post(url,param)
}
//更新电影信息
export function movieUpdate(param){
    let url = host +'/admin/movieUpdate';
    return axios.post(url,param)
}
//获取所有评论
export function getAllComment(param){
    let url = host +'/admin/commentsList';
    return axios.post(url,param)
}
//审核用户评论
export function checkComment(param){
    let url = host + '/admin/checkComment';
    return axios.post(url,param)
}
//删除用户评论
export function delComment(param){
    let url = host + '/admin/delComment';
    return axios.post(url,param)
}
//分页获取所有用户
export function getAllUser(param){
    let url = host + '/admin/showUser';
    return axios.post(url,param);
}
// 改变用户的封停状态
export function changeUserStop(param){
    let url = host + '/admin/stopUser';
    return axios.post(url,param)
}

//添加或删除用户管理员角色
export function changeUserAdmin(param){
    let url =host + '/admin/powerUpdate';
    return axios.post(url,param)

}
// 后台更新用户登录密码
export function resetPsw (param) {
  let url = host + '/admin/changeUser'
  return axios.post(url, param)
}
// 获取上传图片到七牛云的token
export function getUploadToken (param) {
  let url = host + '/admin/getUploadToken'
  return axios.post(url, param)
}
// 保存文章
export function addArticle (param) {
  let url = host + '/admin/addArticle'
  return axios.post(url, param)
}
// 分页获取所有文章
export function getArticle (param) {
  let url = host + '/admin/getArticle'
  return axios.post(url, param)
}
// 文章列表删除
export function articleDelete (param) {
  let url = host + '/admin/articleDelete'
  return axios.post(url, param)
}
// 根据文章id获取文章
export function getArticleDetail (param) {
  let url = host + '/admin/getArticleById'
  return axios.post(url, param)
}
// 文章重新编辑发布
export function articleUpdate (param) {
  let url = host + '/admin/articleUpdate'
  return axios.post(url, param)
}
export function assignOption (options, data) {
  return Object.assign(options, data)
}
