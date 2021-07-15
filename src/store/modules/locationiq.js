import locationAxios from "../../custom_axios_locationiq";
const actions = {
  convertToCoordinateAsync({ commit, dispatch }, data) {
    let key = "e28676994a2f68";
    let q = data.neighborhood + ", " + data.county + "/" + data.city;
    let link = "/search.php?key=" + key + "&q=" + q + "&format=json";

    return locationAxios
      .get(link)
      .then(result => {
        console.log("convertToCoordinate works");
        return result.data[0];
      })
      .catch(err => {});
  },
  convertToAddressAsync({ commit }, data) {
    let key = "e28676994a2f68";
    let link =
      "/reverse.php?key=" +
      key +"&lat=" +data.lat +"&lon=" +data.lon +"&format=json";
    return locationAxios
      .get(link)
      .then(result => {
        console.log(result.data.display_name);
        return result.data;
      })
      .catch(err => {});
  },
};
export default {
  actions
};
