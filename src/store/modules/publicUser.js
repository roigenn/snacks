import axios from "axios";
import { DoneApplicationType } from "../../models/Types";
const state = {
  publicUser: {},
  publicUserAddress: null
};
const getters = {
  getPublicUser(state) {
    return state.publicUser;
  },
  getPublicUserAddress(state) {
    if (!state.publicUserAddress) return;
    let splittedAddress = state.publicUserAddress.split(",");
    let country = splittedAddress[splittedAddress.length - 1];
    let postcode = splittedAddress[splittedAddress.length - 2];
    let region = splittedAddress[splittedAddress.length - 3];
    let city = splittedAddress[splittedAddress.length - 4];
    let county = splittedAddress[splittedAddress.length - 5];
    let neighborhood = splittedAddress[splittedAddress.length - 6];
    const sep = ", ";
    return (
      neighborhood +
      sep +
      county +
      sep +
      city +
      sep +
      region +
      sep +
      postcode +
      sep +
      country
    );
  },
  getPublicUserCompletedDoneApplications(state) {
    var doneApps = state.publicUser.doneApplications.filter(element => {
      return element.doneApplicationType == DoneApplicationType.Completed;
    });
    return doneApps;
  },
  getPublicUserCompletedDoneApplicationCount(state, getters) {
    return getters.getPublicUserCompletedDoneApplications.length;
  },
  getPublicUserGivenApplicationCount(state) {
    return state.publicUser.givenApplications.length;
  },
  getPublicUserPopularity(state) {
    var completedDoneApps = state.publicUser.doneApplications.filter(
      element => {
        return element.doneApplicationType == DoneApplicationType.Completed;
      }
    );
    var completedDoneAppsLength = completedDoneApps.length;
    var total = 0;
    completedDoneApps.forEach(element => {
      console.log("populart doneee " + element.vote);
      total += element.vote;
    });
    return 20 * (total / completedDoneAppsLength);
  },
  getPublicUserGain(state) {
    var completedDoneApps = state.publicUser.doneApplications.filter(
      element => {
        return element.doneApplicationType == DoneApplicationType.Completed;
      }
    );
    var total = 0;
    completedDoneApps.forEach(element => {
      console.log("populart doneee " + element.givenApplication.price);
      total += element.givenApplication.price;
    });
    return total;
  }
};
const mutations = {
  setPublicUser(state, publicUser) {
    state.publicUser = publicUser;
  },
  clearPublicUser(state) {
    state.publicUser = {};
  },
  setPublicUserAddress(state, address) {
    state.publicUserAddress = address;
  }
};
const actions = {
  initPublicUser({ commit, dispatch }, data) {
    let publicUserLink = "/api/User/GetPublicProfile/" + data.userId;

    axios
      .get(publicUserLink)
      .then(result => {
        commit("setPublicUser", result.data);
        if (result.data.location != null) {
          dispatch("convertToAddressAsync", {
            lat: result.data.location.lat,
            lon: result.data.location.lon
          }).then(res => {
            commit("setPublicUserAddress", res.display_name);
          });
        }
      })
      .catch(err => {});
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
