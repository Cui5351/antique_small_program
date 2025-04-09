import {createRouter, createWebHashHistory} from "vue-router"
import storage from "@/storage/storage"

const routes = [{
    path:"/",
    name:'root',
    redirect:"/homePage",
    component:() => import("../view/list/list.vue"),
    children:[
        {
            path:'homePage',
            component: () => import("../view/home/home.vue")
        },
        {
        path:'home',
        component: () => import("../view/StoreManage/StoreManage.vue")
    },{
        path:'Delivery',
        component: () => import("../view/delivery/Delivery.vue")
    },{
        
        path:'GoodsManage',
        component: () => import("../view/GoodsManage/GoodsManage.vue")
    },
    // museum
    {
        path:'museum',
        component: () => import("../view/museum/museum.vue")
    },
    // myMuseum
    {
        path:'myMuseum',
        component: () => import("../view/myMuseum/myMuseum.vue")
    },{
        // MuseumBaseInfo
        path:'MuseumBaseInfo',
        component: () => import("../view/MuseumBaseInfo/MuseumBaseInfo.vue")
    },{
        path:'myStoreInfo',
        component: () => import("../view/myStoreInfo/myStoreInfo.vue")
    },{
        path:'resource',
        component: () => import("../view/resource/resource.vue")
    },{
        path:'communityManage',
        component: () => import("../view/communityManage/communityManage.vue")
    },{
        path:'finance',
        component: () => import("../view/finance/finance.vue")
    }
    ]}
    ,{
        path:'/login',
        component: () => import("../view/login/login.vue")
    }
]

const AutoLogin = async() => {
    const user = Storage.ls.get("userId")
    console.log(user);
    return
    
    try{
        if(user.username.trim().length <= 0)
            throw "账号长度小于0"
        if(user.password.trim().length <= 0)
            throw "密码长度小于0"
        const {code} = await request.post("/admin/user/login",{...user})
        if(code == 0)
            throw "账户/密码错误"
        Storage.ls.set("userId",{...user})
    }catch(e){
        ElMessage.warning(e)
        return
    }
}
// 间隔一段时间会自动登录一次
// setInterval(() => {

// },)

const router = createRouter({
    history:new createWebHashHistory('/'),
    routes
})


// router.beforeEach((to,from,next) => {
//     // 查看登录状态，如果没有登录，则返回登录页面
//     if(storage.ls.get("userId") == null && to.fullPath != '/login')
//         router.replace({
//             path:"/login"   
//         })
//     console.log(storage.ls.get("userId"));
//     next()
// })

export default router