import axios from "axios";

const instance = axios.create({
  baseURL: "https://turkey-adress-8b449.firebaseio.com/"
});
// instance.defaults.headers.common[""]

export default instance;
