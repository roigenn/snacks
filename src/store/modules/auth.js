import axios from "axios";
import { router } from "../../router";

const state = {
  token: "",
  responseData: {
    msg: "",
    code: 0,
    success: false
  }
};
const mutations = {
  setToken(state, token) {
    state.token = token;
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  },
  clearToken(state) {
    state.token = "";
  }
};

const actions = {
  initAuth({ commit, dispatch }) {
    let token = localStorage.getItem("token");
    if (token) {
      let expirationDate = localStorage.getItem("expirationDate");
      let time = new Date().getTime();

      if (time >= +expirationDate) {
        console.log("token süresi geçmiş...");
        dispatch("logout");
      } else {
        commit("setToken", token);
        let timerSecond = +expirationDate - time;
        console.log(timerSecond);
        dispatch("setTimeoutTimer", timerSecond); // Sayfayı yenilemeden kullanırsa
        dispatch("initRole"); // header için
      }
    } else {
      //router.replace("/")
      return false;
    }
  },
  login({ commit, dispatch, state }, authData) {
    let authLink = "/api/Account/AccessToken";
    axios
      .post(authLink, { email: authData.email, password: authData.password })
      .then(response => {
        commit("setToken", response.data.extra.token);
        localStorage.setItem("token", response.data.extra.token);
        localStorage.setItem(
          "expirationDate",
          new Date().getTime() +
            +response.data.extra.accessTokenExpiration * 1000
        );

        dispatch(
          "setTimeoutTimer",
          +response.data.extra.accessTokenExpiration * 1000
        );
        dispatch("initRole"); // header için
      })
      .then(res => {
        router.push("/");
      })
      .catch(error => {});
  },
  register({ commit, dispatch }, authData) {
    let authLink = "/api/Account/Register";
    axios
      .post(authLink, {
        email: authData.email,
        phoneNumber: authData.phonenumber,
        username: authData.username,
        name: authData.name,
        surname: authData.surname,
        genderType: authData.gender,
        companyName: authData.company,
        password: authData.password,
        confirmPassword: authData.repassword,
        role: authData.roletype
      })
      .then(res => {
        router.push("/login");
      })
      .catch(error => {});
  },
  logout({ commit }) {
    commit("clearToken");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    console.log(router.currentRoute.path);
    if (router.currentRoute.path !== "/") router.push("/");
  },
  setTimeoutTimer({ dispatch }, expiresIn) {
    setTimeout(() => {
      dispatch("logout");
    }, expiresIn);
  }
};

const getters = {
  isAuthenticated(state) {
    return state.token !== "";
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
