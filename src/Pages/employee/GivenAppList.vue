<template>
  <section class="section section-sm">
    <div class="container-fluid">
      <header class="mb-5">
        <h2 class="display-3 text-center">
          Given Applications
          <span class="text-success"></span>
        </h2>
      </header>
      <div class="row row-grid justify-content-center">
        <div class="col-lg-3 text-center">
          <card shadow>
            <template #header>
              <header>
                <h2 class="display-6">
                  <span class="text-success">Filters</span>
                </h2>
              </header>
            </template>
            <form>
              <div class="form-group row align-items-center">
                <label for="slider" class="col-sm-12 col-form-label "
                  >Distance={{ distanceSlider }} km
                </label>
                <label for="slider" class="col-sm-3 col-form-label">Max:</label>
                <div class="col-sm-9">
                  <base-slider
                    v-model="distanceSlider"
                    :range="{ min: 0, max: 1000 }"
                    id="slider"
                    class="form-control"
                  >
                  </base-slider>
                </div>
              </div>
              <hr />
              <div class="form-group row align-items-center">
                <label for="slider" class="col-sm-12 col-form-label"
                  >Price={{ priceSlider }} ₺</label
                >
                <label for="slider" class="col-sm-3 col-form-label">Min:</label>
                <div class="col-sm-9">
                  <base-slider
                    v-model="priceSlider"
                    :range="{ min: 0, max: 1000 }"
                    id="slider"
                    class="form-control"
                  >
                  </base-slider>
                </div>
              </div>
              <hr />
              <div class="form-group row align-items-center">
                <label for="slider" class="col-sm-12 col-form-label">{{
                  dates.range
                }}</label>
                <label for="slider" class="col-sm-3 col-form-label p-0"
                  >Range:</label
                >
                <div class="col-sm-9">
                  <base-input addon-left-icon="ni ni-calendar-grid-58">
                    <flat-picker
                      slot-scope="{ focus, blur }"
                      @on-open="focus"
                      @on-close="blur"
                      :config="{ allowInput: true, mode: 'range' }"
                      class="form-control datepicker"
                      v-model="dates.range"
                    >
                    </flat-picker>
                  </base-input>
                </div>
              </div>
            </form>
          </card>
        </div>
        <div class="col-lg-9 text-center bg-secondary">
          <card shadow>
            <template #header>
              <header>
                <h2 class="display-6">
                  <span class="text-success">List</span>
                </h2>
              </header>
            </template>
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item  shadow"
                v-for="(item, index) in publicGivenApps"
                :key="item.id"
              >
                <div class="single-job-items ">
                  <div class="job-items">
                    <div class="company-img">
                      <a href="job_details.html"><img src="" alt=""/></a>
                    </div>
                    <div class="job-tittle">
                      <router-link
                        tag="a"
                        class="job-tittle"
                        :to="{
                          name: 'GivenAppDetail',
                          params: { id: item.id }
                        }"
                      >
                        <h4 class="text-left">
                          {{ item.name }}
                        </h4>
                      </router-link>
                      <ul class="p-0">
                        <li>{{ item.title }}</li>
                        <li>
                          <i class="fas fa-map-marker-alt"></i
                          >{{
                            getLocationAddress({
                              lat: item.user.location.lat,
                              lon: item.user.location.lon,
                              order: index
                            })
                          }}
                        </li>
                        <li>
                          <!--{{ "sequentialRequestsLocationiq </br> dan adres  gelecek" }}-->
                        </li>
                        <li>
                          <b>
                            {{
                              new Date(item.startDate)
                                | dateFormat("YYYY.MM.DD")
                            }}
                          </b>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="items-link ">
                    <badge :type="'success'" class="p-3">
                      <b class="lead">{{ item.price }} ₺</b></badge
                    >
                    <badge :type="'primary'" class="p-3">
                      <b class="lead"
                        >{{
                          item.distanceBetweenApplicationAndMe.toFixed(2)
                        }}
                        km</b
                      ></badge
                    >
                  </div>
                </div>
              </li>
            </ul>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Card from "../../components/Card";
import BaseSlider from "../../components/BaseSlider";
import FlatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { mapGetters } from "vuex";
export default {
  components: { Card, BaseSlider, FlatPicker },
  data() {
    return {
      distanceSlider: 50,
      priceSlider: 0.01,
      dates: {
        range: "2020-01-01 to 2021-01-01"
      }
    };
  },
  computed: {
    publicGivenApps() {
      var what = this.$store.getters.getPublicGivenAppsByFilter({
        distance: this.distanceSlider,
        price: this.priceSlider,
        date: {
          from: this.dates.range.split("to")[0],
          to: this.dates.range.split("to")[1]
        }
      });
      console.log("what" + what);
      return what;
    }
  },
  methods: {
    getLocationAddress(data) {
      //this.$store.dispatch("convertToAddressWithSetTimeOutAsync", data);
    }
  },
  created() {
    var searchTerm = "";
    if (this.$route.params.searchTerm)
      searchTerm = this.$route.params.searchTerm;

    this.$store.dispatch("initPublicPublicGivenApps", {
      lat: 0,
      lon: 0,
      maxDistance: 1000,
      searchTerm: searchTerm
    });
    //console.log("route:" + this.$route.params.searchTerm);
  }
};
</script>
<style scoped>
body {
  background-color: linear-gradient(150deg, #281483 15%, #8f6ed5 70%);
}
.brd {
  border-bottom: 1px gray solid;
}
.single-job-items {
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  -webkit-transition: 0.4s;
  -moz-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
}

.company-img img {
  overflow: hidden;
  float: left;
  margin-right: 32px;
  z-index: 999;
}
.job-tittle {
  padding-top: 25px;
}
.single-job-items .job-tittle a h4 {
  color: #28395a;
  font-size: 24px;
  -webkit-transition: 0.4s;
  -moz-transition: 0.4s;
  -o-transition: 0.4s;
  transition: 0.4s;
}
.single-job-items .job-tittle a h4:hover {
  color: rebeccapurple;
}
.single-job-items .job-tittle ul li {
  display: inline-block;
  margin-right: 48px;
  font-size: 15px;
  color: #808080;
  line-height: 1.8;
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .single-job-items .job-tittle ul li {
    margin-right: 18px;
  }
}
@media (max-width: 767px) {
  .single-job-items .job-tittle ul li {
    margin-right: 0px;
    margin-bottom: 7px;
  }
}
@media only screen and (min-width: 576px) and (max-width: 767px) {
  .single-job-items .job-tittle ul li {
    margin-right: 8px;
  }
}
.single-job-items .job-tittle ul li:last-child {
  margin-right: 0px;
}
.single-job-items .job-tittle ul li i {
  font-size: 14px;
  color: #bbbbbb;
  margin-right: 10px;
}
.items-link {
  padding-top: 35px;
  text-align: center;
}
@media (max-width: 767px) {
  .items-link {
    padding-top: 35px;
    text-align: center;
  }
}

.items-link a {
  color: #8b92dd;
  display: block;
  border: 1px solid #8b92dd;
  border-radius: 30px;
  padding: 4px 33px;
  text-align: center;
  margin-bottom: 25px;
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .items-link a {
    padding: 4px 19px;
  }
}
.items-link a:hover {
  color: #fff;
  background: #8b92dd;
  border: 1px solid transparent;
}
.items-link span {
  color: #454d72;
}
@media only screen and (min-width: 992px) and (max-width: 1199px) {
  .items-link2 {
    padding-top: 35px;
    text-align: center;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .items-link2 {
    padding-top: 35px;
    text-align: center;
  }
}
</style>
