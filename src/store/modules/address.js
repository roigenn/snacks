import axios from "../../custom_axios_address";

const state = {
  cities: [],
  counties: [],
  neighborhoods: []
};
const getters = {
  getCities(state) {
    return state.cities;
  },
  getCounties(state) {
    return key =>
      state.counties.filter(element => {
        return element.ilce_sehirkey == key;
      });
  },
  getNeighborhoods(state) {
    return key =>
      state.neighborhoods.filter(element => {
        return element.mahalle_ilcekey == key;
      });
  }
};
const mutations = {
  setCities(state, cities) {
    state.cities = cities;
  },
  setCounties(state, counties) {
    state.counties = counties;
  },
  setNeighborhoods(state, neighborhoods) {
    state.neighborhoods = neighborhoods;
  }
};
const actions = {
  initCities({ commit }) {
    let citiesLink = "/4/data.json";
    axios
      .get(citiesLink)
      .then(result => {
        //console.log(result.data);
        commit("setCities", result.data);
      })
      .catch(err => {});
  },
  initCounties({ commit }) {
    let citiesLink = "/2/data.json";
    axios
      .get(citiesLink)
      .then(result => {
        //console.log(result.data);
        commit("setCounties", result.data);
      })
      .catch(err => {});
  },
  initNeighborhoods({ commit }) {
    let neighborhoodsLink = "/3/data.json";
    axios
      .get(neighborhoodsLink)
      .then(result => {
        //console.log(result.data);
        commit("setNeighborhoods", result.data);
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
