import Vue from 'vue'
import VueRouter from 'vue-router'

import TheArticle from '@/components/TheArticle'
import ThePostList from '@/components/ThePostList'
import TheUserInfo from '@/components/TheUserInfo'
import TheSlideBar from '@/components/TheSlideBar'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            name: 'postList',
            path: '/',
            component: ThePostList
        },
        {
            name: 'article',
            path: '/article/:id/:name',
            components: {
                default: TheArticle,
                slideBar: TheSlideBar
            }
        },
        {
            name: 'userInfo',
            path: '/userInfo/:name',
            component: TheUserInfo
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})