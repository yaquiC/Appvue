import {createRouter , RouteRecordRaw, createWebHistory} from "vue-router";
import { IsAuth } from "../utils/persists";
import Auth from "../views/auth.vue";
import Dashboard from "../views/dashboard.vue";
import RolVue from "../views/Rol.vue";
import UserVue from "../views/User.vue";

const routes: RouteRecordRaw[] =[
    {
       name: "Auth",
       path:"/auth",
       component: Auth
    },
    {
        name:"Dashboard",
        path:"/dashboard",
        component:Dashboard
    },
    {
        name:"Rol",
        path:"/rol",
        component:RolVue
    },
    {
        name:"User",
        path:"/user",
        component:UserVue
    }
    
  
];

const router = createRouter({
    routes,
    history:createWebHistory(),
})

router.beforeEach((to, _, next) => {
    const publicPages = ["/auth"];
    const authRequired = !publicPages.includes(to.path);

    if (!IsAuth()&& to.path !== '/auth'){
        return next("/auth");
    }
    if(authRequired && !IsAuth()){
        return next("/auth");
    }

    next();
});

export {router};
