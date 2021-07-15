import axios from "axios";
import { router } from "../../router";

const baseLink = "/api/GivenApplication";
let link = "";

const state = {
  userGivenApps: [],
  userGivenAppDoneApps: []
};

const getters = {
  getGivenApps(state) {
    return state.userGivenApps;
  },

  getuserGivenApp(state) {
    return key =>
      state.products.filter(element => {
        return element.key == key;
      });
  },
  getGivenAppDoneApps(state) {
    return state.userGivenAppDoneApps;
  }
};

const mutations = {
  updateUserGivenAppsList(state, userGivenApp) {
    state.userGivenApps.push(userGivenApp);
  },
  updateUserGivenAppDoneAppsList(state, userGivenAppDoneApp) {
    state.userGivenAppDoneApps.push(userGivenAppDoneApp);
  },
  clearUserGivenAppDoneAppsList(state) {
    state.userGivenAppDoneApps = [];
  }
};

const actions = {
  initEmployerGivenApps({ commit }) {
    link = baseLink + "/GetApplications";
    axios.get(link).then(response => {
      let data = response.data;
      commit("updateUserGivenAppsList", data);
      console.log(data);
    });
  },

  saveEmployerGivenApp({ commit }, payload) {
    link = baseLink + "/RegisterApplication";
    console.log(...payload);
    axios
      .post(link, {
        ...payload
      })
      .then(response => {
        commit("updateUserGivenAppsList", response.data.extra);
        //console.log(response.data);
      })
      .then(res => {
        router.push("/");
      })
      .catch(error => {});
  },
  employerGivenAppDoneAppsDetail({ commit }, data) {
    const givenApplicationId = data.givenAppId;

    link = baseLink + "/GetApplicationDetail/" + givenApplicationId;
    return axios.get(link).then(response => {
      let data = response.data;
      commit("updateUserGivenAppDoneAppsList", data);
      console.log(data);
      return data;
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
