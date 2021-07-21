import Vue from 'vue'
import Router from "vue-router"
Vue.use(Router)

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export const contstantRoutes = [
    {
        path: '/404',
        component: () => import("../components/views/404.vue"),
        hidden: true
    },
    {
        path: '/',
        component:()=> import ("../components/views/LayoutPage.vue"),
        children:[
            {
                path:'/xbsjTest',
                component:()=> import ("../components/views/pages/Xbsj/xbsjTestPage.vue"),
            }
        ]
    },
    
    
];
const createRouter = () => new Router({
    mode: 'hash',
    linkActiveClass: '.router-link-active',
    scrollBehavior: () => ({ y: 0 }),
    routes: contstantRoutes
}),
    router = createRouter();
// 0624设置路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.matched.length == 0) {
        next('/404') //匹配不到跳转到404
    } else {
        next()//匹配到路由正常跳转
    }
})
export default router;

