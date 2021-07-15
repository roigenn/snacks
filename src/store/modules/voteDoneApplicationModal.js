const state = {
  voteDoneApplication: {}
};

const mutations = {
  setVoteDoneApplicationModal(state, data) {
    state.voteDoneApplication = data;
  }
};
const getters = {
  getVoteDoneApplicationModal(state) {
    return state.voteDoneApplication;
  }
};
export default {
  state,
  getters,
  mutations
};
