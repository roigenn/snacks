<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>

    <section class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--300" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img v-lazy="'img/avatar.png'" class="rounded-circle" />
                  </a>
                </div>
              </div>
              <div
                class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
              >
                <div class="card-profile-actions py-4 mt-lg-0">
                  <base-button type="default" size="sm" class="float-right"
                    >Edit</base-button
                  >
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-actions py-4 mt-lg-0">
                  <base-button
                    type="info"
                    size="sm"
                    class=""
                    title="Add A Location"
                    @click="changeAddLocationModal(true)"
                    >Add Loc.</base-button
                  >
                  <add-location
                    :modalShow="showAddLocationModal"
                    @changeShowModal="changeAddLocationModal"
                  ></add-location>

                  <base-button
                    type="info"
                    size="sm"
                    class=""
                    title="Use Current Location"
                    @click="changeUseCurrentLocationModal(true)"
                    >Use Current Loc.</base-button
                  >
                  <use-current-location
                    :modalShow="showUseCurrentLocationModal"
                    @changeShowModal="changeUseCurrentLocationModal"
                  ></use-current-location>
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <h3>
                {{ getProfile.name + " " + getProfile.surname }}
                <span class="font-weight-light">, {{ getRole }}</span>
              </h3>
              <div class="h6 font-weight-300">
                <i class="ni location_pin mr-2"></i>Address: {{ getAddress }}
              </div>
              <div class="h6 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i
                >{{ getProfile.email }} /
                {{ getProfile.phoneNumber }}
              </div>
              <div>
                <i class="ni education_hat mr-2"></i
                >{{ getProfile.companyName }}
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { RoleType, getKeyByVal } from "../../models/Types";
import AddLocation from ".././_shared/AddLocation";
import UseCurrentLocation from ".././_shared/UseCurrentLocation";
export default {
  components: { AddLocation, UseCurrentLocation },
  data() {
    return {
      showAddLocationModal: false,
      showUseCurrentLocationModal: false
    };
  },
  computed: {
    ...mapGetters(["getProfile", "getRole", "getAddress"])
  },
  created() {
    this.$store.dispatch("initProfile");
  },
  methods: {
    changeAddLocationModal(value) {
      this.showAddLocationModal = value;
    },
    changeUseCurrentLocationModal(value) {
      this.showUseCurrentLocationModal = value;
    }
  }
};
</script>
<style scoped></style>
