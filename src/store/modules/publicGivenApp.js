import axios from "axios";
import { router } from "../../router";

const baseLink = "/api/GivenApplication";
let link = "";

const state = {
  publicGivenApps: [],
  givenAppDetail: {},
  givenAppDetailAddress: null
};

const getters = {
  getPublicGivenApps(state) {
    return state.publicGivenApps;
  },
  getPublicGivenAppsByFilter: state => filters => {
    console.log("state: " + state.publicGivenApps);

    return state.publicGivenApps.filter(element => {
      return (
        element.distanceBetweenApplicationAndMe <= filters.distance &&
        element.price >= filters.price &&
        new Date(element.startDate) >= new Date(filters.date.from) &&
        new Date(element.startDate) <= new Date(filters.date.to)
      );
    });
  },
  getPublicGivenAppDetail(state) {
    return state.givenAppDetail;
  },
  getPublicGivenAppDetailAddress(state) {
    return state.givenAppDetailAddress;
  },
};

const mutations = {
  updatePublicGivenAppsList(state, userGivenApp) {
    state.publicGivenApps = userGivenApp;
  },
  updatePublicGivenAppDetail(state, publicGivenAppDetail) {
    state.givenAppDetail = publicGivenAppDetail;
  },
  updatePublicGivenAppDetailAddress(state, address) {
    state.givenAppDetailAddress = address;
  }
};

const actions = {
  initPublicPublicGivenApps({ commit }, payload) {
    link = baseLink + "/GetApplicationsByDistance";
    axios.post(link, { ...payload }).then(response => {
      let data = response.data;
      commit("updatePublicGivenAppsList", data);
      console.log(data);
    });
  },
  publicGivenAppDetail({ commit,dispatch }, data) {
    const givenApplicationId = data.givenAppId;

    link = baseLink + "/GetPublicApplicationDetail/" + givenApplicationId;
    axios.get(link).then(response => {
      let data = response.data;
      commit("updatePublicGivenAppDetail", data);
      dispatch("convertToAddressAsync", { lat: data.user.location.lat, lon: data.user.location.lon }).then(loc => {
        commit("updatePublicGivenAppDetailAddress", loc.display_name);
      });
      console.log(data);
      
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
