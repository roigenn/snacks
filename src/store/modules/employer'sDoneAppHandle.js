import axios from "axios";

const baseLink = "/api/DoneApplication";
let link = "";

const state = {
  doneApp: {}
};

const actions = {
  acceptApplication({}, payload) {
    link = baseLink + "/AcceptApplication";
    return axios
      .patch(link, {
        ...payload
      })
      .then(response => {
        let data = response.data;
        return data;
      });
  },
  denyApplication({}, payload) {
    link = baseLink + "/DenyApplication";
    return axios
      .patch(link, {
        ...payload
      })
      .then(response => {
        let data = response.data;
        return data;
      });
  },
  completeApplication({}, payload) {
    link = baseLink + "/CompleteApplication";
    return axios
      .patch(link, {
        ...payload
      })
      .then(response => {
        let data = response.data;
        return data;
      });
  }
};

export default {
  state,
  actions
};
