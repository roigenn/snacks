const state = {
  fullAdresses: []
};

const getters = {
  getFullAdresses(state) {
    return state.fullAdresses;
  }
};

const mutations = {
  updateFullAdresses(state, fullAdresses) {
    state.fullAdresses.push(fullAdresses);
  }
};

const actions = {
  convertToAddressWithSetTimeOutAsync({ commit, dispatch }, data) {
    // to avoid service rate limited time
    setTimeout(() => {
      dispatch("convertToAddressAsync", data).then(res => {
        commit("updateFullAdresses", res);
      });
    }, data.order * 1000);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
