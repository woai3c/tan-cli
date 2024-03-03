import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        redirect: '/home/view',
        component: () => import('@/views/home/index.vue'),
        children: [
            {
                path: 'view',
                name: 'view',
                component: () => import('@/views/home/view/index.vue'),
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('@/views/home/about/index.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
