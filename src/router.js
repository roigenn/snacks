import Vue from "vue";
import VueRouter from "vue-router";

import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./Pages/auth/Login.vue";
import Register from "./Pages/auth/Register.vue";
import Profile from "./Pages/auth/Profile.vue";
import AddLocation from "./Pages/_shared/AddLocation.vue";
import Home from "./Pages/Home.vue";
import GivenAppList from "./Pages/employee/GivenAppList.vue";
import RegisterApp from "./Pages/employer/RegisterApp.vue";
import AppHeader from "./Pages/_shared/AppHeader.vue";
import AppHeaderDetail from "./Pages/_shared/AppHeaderDetail.vue";
import AppHeaderAdmin from "./Pages/_shared/AppHeaderAdmin.vue";
import MyGivenApps from "./Pages/employer/MyGivenApps.vue";
import GivenApplicationEdit from "./Pages/employer/GivenApplicationEdit.vue";
import DoneApplicationsToGivenApplication from "./Pages/employer/DoneApplicationsToGivenApplication.vue";
import GivenAppDetail from "./Pages/employee/GivenAppDetail.vue";
import MyDoneApps from "./Pages/employee/MyDoneApps.vue";
import PublicUser from "./Pages/PublicUser.vue";
import Panel from "./Pages/admin/Panel.vue";
import Users from "./Pages/admin/Users.vue";
import AppFooter from "./Pages/_shared/AppFooter";
Vue.use(VueRouter);

export const router = new VueRouter({
  linkExactActiveClass: "active",
  mode: "history",
  routes: [
    {
      path: "*",
      name: "catchAll",
      component: Home,
    },
    {
      path: "/index.html",
      redirect: "/",
    },
    {
      path: "/",
      name: "home",
      components: {
        header: AppHeader,
        default: Home,
        footer: AppFooter,
      },
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter,
      },
    },
    {
      path: "/panel",
      name: "panel",
      components: {
        header: null,
        default: Panel,
        footer: null,
      },
      children: [
        {
          path: "graphs",
          component: null,
          name: "panelgraphs",
        }, // /user/12
        {
          path: "users",
          component: Users,
          name: "panelusers",
        }, // user/12/edit
      ],
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter,
      },
    },
    {
      path: "/register",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter,
      },
    },
    {
      path: "/givenapps/:searchTerm?",
      name: "givenapps",
      components: {
        header: AppHeaderDetail,
        default: GivenAppList,
        footer: AppFooter,
      },
    },
    {
      path: "/givenapps/detail/:id",
      name: "GivenAppDetail",
      components: {
        header: AppHeaderDetail,
        default: GivenAppDetail,
        footer: AppFooter,
      },
    },
    {
      path: "/user/:id",
      name: "PublicUser",
      components: {
        header: AppHeader,
        default: PublicUser,
        footer: AppFooter,
      },
    },
    {
      path: "/mydoneapps",
      name: "MyDoneApps",
      components: {
        header: AppHeaderDetail,
        default: MyDoneApps,
        footer: AppFooter,
      },
    },
    {
      path: "/registerapp",
      name: "registerapp",
      components: {
        header: AppHeaderDetail,
        default: RegisterApp,
        footer: AppFooter,
      },
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter,
      },
    },
    {
      path: "/addlocation",
      name: "addlocation",
      components: {
        header: AppHeaderDetail,
        default: AddLocation,
        footer: AppFooter,
      },
    },
    {
      path: "/mygivenapps",
      name: "mygivenapps",
      components: {
        header: AppHeaderDetail,
        default: MyGivenApps,
        footer: AppFooter,
      },
      children: [
        {
          path: "DoneApplications/:id",
          component: DoneApplicationsToGivenApplication,
          name: "DoneApplicationsToGivenApplication",
        }, // /user/12
        {
          path: "edit/:id",
          component: GivenApplicationEdit,
          name: "GivenApplicationEdit",
        }, // user/12/edit
      ],
    },
  ],

  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
