import axios from "axios";

const baseLink = "/api/User";
let link = "";

const state = {
  adminUsers: []
};
const getters = {
  getAdminUsers(state) {
    return state.adminUsers;
  }
};

const mutations = {
  updateAdminUsers(state, adminUsers) {
    state.adminUsers = adminUsers;
  },
  deleteAdminUser(state, userId) {
    state.adminUsers = state.adminUsers.filter(x => x.id !== userId);
  },
};

const actions = {
  initAdminUsers({ commit }) {
    link = baseLink + "/GetAllUsers";
    axios.get(link).then(response => {
      let data = response.data;
      commit("updateAdminUsers", data);
      console.log(data);
    });
  },
  adminDeleteUser({ commit }, data) {
    link = baseLink + "/DeleteUser/" + data.userId;
    axios.delete(link).then(response => {
      let data = response.data;
      commit("deleteAdminUser", data.id);
      console.log('from delete action '+data);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
