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
                    <img v-lazy="'../img/avatar.png'" class="rounded-circle" />
                  </a>
                </div>
              </div>
              <div
                class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
              >
                <div class="card-profile-actions py-4 mt-lg-0"></div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <template v-if="getPublicUser.roleName === 'Employee'">
                    <div>
                      <span class="heading">
                        {{ getPublicUserCompletedDoneApplicationCount }}</span
                      >
                      <span class="description">Completed Works</span>
                    </div>
                    <div>
                      <span class="heading">
                        {{ getPublicUserPopularity }} / 100</span
                      >
                      <span class="description">Popularity</span>
                    </div>
                    <div>
                      <span class="heading"> {{ getPublicUserGain }} ₺</span>
                      <span class="description">Total Gain</span>
                    </div>
                  </template>
                  <div v-if="getPublicUser.roleName === 'Employer'">
                    <span class="heading">
                      {{ getPublicUserGivenApplicationCount }}</span
                    >
                    <span class="description">Given Applications</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <h3>
                {{ getPublicUser.name + " " + getPublicUser.surname }}
                <span class="font-weight-light"
                  >, {{ getPublicUser.roleName }}</span
                >
              </h3>
              <div class="h6 font-weight-300">
                <i class="ni location_pin mr-2"></i>Address:
                {{ getPublicUserAddress }}
              </div>
              <div class="h6 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i
                >{{ getPublicUser.email }} /
                {{ getPublicUser.phoneNumber }}
              </div>
              <div>
                <i class="ni education_hat mr-2"></i
                >{{ getPublicUser.companyName }}
              </div>
            </div>
            <div class="row justify-content-center mt-5 mb-5">
              <div class="col-lg-12">
                <div class="row row-grid">
                  <template v-if="getPublicUser.roleName === 'Employee'">
                    <div
                      class="col-lg-4"
                      v-for="(item,
                      index) in getPublicUserCompletedDoneApplications"
                      :key="item.id"
                    >
                      <card class="border-0" hover shadow body-classes="py-5">
                        <h6
                          class="text-uppercase text-center display-6"
                          :class="'text-' + cardPrimaryOrSuccess(index)"
                        >
                          {{ item.givenApplication.name }}
                        </h6>
                        <p class="description mt-3 text-center display-6">
                          {{ item.givenApplication.title }}
                        </p>
                        <p class="description mt-3">
                          <b>Comment: </b><i> {{ item.comment }}</i>
                        </p>
                        <p class="description mt-3">
                          <b>Vote: </b><i> {{ item.vote }}</i>
                        </p>
                        <div>
                          <badge type="primary" rounded
                            >{{ item.givenApplication.price }} ₺</badge
                          >
                        </div>

                        <router-link
                          tag="a"
                          class="btn mt-4  btn-default"
                          :type="cardPrimaryOrSuccess(index)"
                          :to="{
                            name: 'GivenAppDetail',
                            params: { id: item.givenApplicationId }
                          }"
                        >
                          Detail
                        </router-link>
                      </card>
                    </div>
                  </template>
                </div>
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
import { RoleType, getKeyByVal } from ".././models/Types";
export default {
  computed: {
    ...mapGetters([
      "getPublicUser",
      "getPublicUserAddress",
      "getPublicUserCompletedDoneApplicationCount",
      "getPublicUserGivenApplicationCount",
      "getPublicUserPopularity",
      "getPublicUserGain",
      "getPublicUserCompletedDoneApplications"
    ])
  },
  created() {
    this.$store.dispatch("initPublicUser", { userId: this.$route.params.id });
  },
  methods: {
    cardPrimaryOrSuccess(index) {
      return index % 2 == 0 ? "primary" : "success";
    }
  }
};
</script>
<style scoped></style>
