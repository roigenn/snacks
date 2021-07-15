import axios from "axios";
import { router } from "../../router";

const baseLink = "/api/DoneApplication";
let link = "";

const state = {
  doneApp: {},
  doneApps:[]
};
const getters = {
  getDoneApps(state) {
    return state.doneApps;
  },
  getDoneAppsByFilter: state => filters => {
    return state.doneApps.filter(element => {
      return (
        element.givenApplication.name.includes(filters.search) &&
        (element.doneApplicationType == filters.dap || filters.dap == null || filters.dap==1000)
      );
    });
  },
};

const mutations = {
  updateDoneApps(state, doneApps) {
    state.doneApps = doneApps;
  }
};

const actions = {
  makeApplication({ }, payload) {
    link = baseLink + "/MakeApplication";
    return axios
      .post(link, {
        ...payload
      })
      .then(response => {
        let data = response.data;
        return data;
      })
      .then(response => {
        router.push("/");
      })
      .catch(ex => {
        console.log('ex ' + ex);
      });
  },

  initDoneApps({ commit }) {
    link = baseLink + "/GetEmployeeApplications";
    axios.get(link).then(response => {
      let data = response.data;
      commit("updateDoneApps", data);
      console.log(data);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};
