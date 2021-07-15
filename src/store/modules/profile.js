import axios from "axios";
import vue from "vue";

const state = {
  profile: {},
  role: null,
  address: null
};
const getters = {
  getProfile(state) {
    return state.profile;
  },
  getRole(state) {
    return state.role;
  },
  getAddressWithStreet(state) {
    return state.address;
  },
  getAddress(state) {
    if (!state.address) return;
    let splittedAddress = state.address.split(",");
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
  }
};
const mutations = {
  setProfile(state, profile) {
    state.profile = profile;
  },
  clearProfile(state) {
    state.profile = {};
  },
  setRole(state, role) {
    state.role = role;
  },
  clearRole(state, role) {
    state.role = {};
  },
  setAddress(state, address) {
    state.address = address;
  }
};
const actions = {
  initProfile({ commit, dispatch }) {
    let profileLink = "/api/User/GetUserDetail";
    axios
      .get(profileLink)
      .then(result => {
        console.log(result.data);
        commit("setProfile", result.data);
        if (result.data.location != null) {
          dispatch("convertToAddressAsync", {
            lat: result.data.location.lat,
            lon: result.data.location.lon
          }).then(res => {
            commit("setAddress", res.display_name);
            console.log("Coordinate Converted =" + res);
          });
        }
      })
      .catch(err => {});
  },
  initRole({ commit }) {
    if (axios.defaults.headers.common["Authorization"] === undefined) return;

    let profileLink = "/api/User/GetUserRole";
    return axios
      .get(profileLink)
      .then(result => {
        console.log(result.data);
        commit("setRole", result.data);
      })
      .catch(err => {});
  },
  addLocationByAddress({ commit, dispatch }, data) {
    let addressLink = "/api/Location/Create";

    dispatch("convertToCoordinateAsync", data).then(res => {
      console.log("res from profile" + res.lat + "," + res.lon);
      console.log("token=" + axios.defaults.headers.common["Authorization"]);
      axios
        .put(addressLink, {
          title: "sdf",
          lat: res.lat,
          lon: res.lon
        })
        .then(result => {
          console.log(result.data);
          commit(
            "setAddress",
            data.neighborhood +
              "," +
              data.county +
              "," +
              data.city +
              "," +
              "," +
              ","
          );
        });
    });
  },
  addLocationByCoordinate({ commit }, data) {
    let addressLink = "/api/Location/Create";

    axios
      .put(addressLink, {
        title: "sdf",
        lat: data.lat,
        lon: data.lon
      })
      .then(result => {
        commit("setAddress", data.display_name);
      });
  },
  initPublicUser({ commit, dispatch }, data) {
    let publicUserLink = "/api/User/GetPublicProfile/" + data.userId;
    axios
      .get(publicUserLink)
      .then(result => {
        console.log(result.data);
        commit("setProfile", result.data);
        if (result.data.location != null) {
          dispatch("convertToAddressAsync", {
            lat: result.data.location.lat,
            lon: result.data.location.lon
          }).then(res => {
            commit("setAddress", res.display_name);
            console.log("Coordinate Converted =" + res);
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
