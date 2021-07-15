import axios from "axios";

const instance = axios.create({
  baseURL: "https://eu1.locationiq.com/v1"
});

// instance.defaults.headers.common[""]

export default instance;
