import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import profile from "./modules/profile";
import address from "./modules/address";
import locationiq from "./modules/locationiq";
import employerGivenApp from "./modules/employerGivenApp";
import employersDoneAppHandle from "./modules/employer'sDoneAppHandle";
import voteDoneApplicationModal from "./modules/voteDoneApplicationModal";
import publicGivenApp from "./modules/publicGivenApp";
import sequentialRequestsLocationiq from "./modules/sequentialRequestsLocationiq";
import employeeDoneApp from "./modules/employeeDoneApp";
import publicUser from "./modules/publicUser";
import admin from "./modules/admin";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},

  modules: {
    auth,
    profile,
    address,
    locationiq,
    employerGivenApp,
    employersDoneAppHandle,
    voteDoneApplicationModal,
    publicGivenApp,
    sequentialRequestsLocationiq,
    employeeDoneApp,
    publicUser,
    admin
  }
});
