const GlobalFilters = {
  install(Vue) {
    Vue.filter("toSub2", value => {
      if (value.length > 200) return value.substring(0, 200);
      else return value;
    });
  }
};

export default GlobalFilters;
