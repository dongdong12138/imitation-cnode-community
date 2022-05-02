import Vue from 'vue'
import VueRouter from 'vue-router'

import TheArticle from '@/components/TheArticle'
import ThePostList from '@/components/ThePostList'

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
            path: '/article/:id',
            component: TheArticle
        },
    ]
})