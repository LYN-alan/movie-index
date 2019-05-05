import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import Index from '@/pages/Index';
import adminIndex from '@/admin/index';
import RobotTest from '@/components/RobotTest';
import Login from '@/pages/login';
import Register from '@/pages/register';
import movieManagement from '@/pages/movieManagement'
import commentManagement from '@/pages/commentManagement'
import articleManagement from '@/pages/articleManagement'
import userManagement from '@/pages/userManagement'
import indexConfig from '@/pages/indexConfig'
import articleList from '@/components/articleList'
import articleEditor from '@/components/articleEditor'
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        title: 'home'
      }
    },
    {
      path:'/',
      name:'Login',
      component:Login
    },
    //后台主页
    {
      path: '/adminIndex',
      name: 'adminIndex',
      redirect:'/admin/movie',
      component: adminIndex,
      children: [
        //后台电影管理
        {
          path: '/admin/movie',
          name: 'movieManagement',
          component: movieManagement
        },
        //后台评论管理
        {
          path: '/admin/comment',
          name: 'commentManagement',
          component: commentManagement
        },
        //后台文章管理
        {
          path: '/admin/article',
          name: 'articleManagement',
          component: articleManagement,
          redirect:'/admin/article/articleList',
          children:[
            {
              path:'articleList',
              name:'articleList',
              component:articleList
            },
            {
              path:'articleEditor',
              name:'articleEditor',
              component:articleEditor
            }
          ]
        },
        //后台用户管理
        {
          path: '/admin/userManagement',
          name: 'userManagement',
          component: userManagement
        },
        //主页配置
        {
          path:'/admin/indexConfig',
          name:'indexConfig',
          component:indexConfig
        }
      ]
    },
    {
      path: '/robotTest',
      name: 'RobotTest',
      component: RobotTest
    },
    //登录
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // 注册
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
