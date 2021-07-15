<template>
  <section class="section section-sm">
    <div class="container-fluid">
      <header class="mb-5">
        <h2 class="display-3 text-center">
          My Given Applications
          <span class="text-success"></span>
        </h2>
      </header>
      <div class="row">
        <div class="text-center m-0" :class="parentPageColSize">
          <header>
            <h2 class="display-6">
              <span class="text-primary">List</span>
            </h2>
          </header>
          <hr />
          <div class="row" v-for="(item, index) in getGivenApps" :key="index">
            <div
              class="col-6 text-center mb-4"
              v-for="innerItem in item"
              :key="innerItem.id"
            >
              <card class="border-0" shadow body-classes="py-4">
                <template #header>
                  <header>
                    <h2 class="display-6">
                      <span class="text-success">{{ innerItem.name }}</span>
                    </h2>
                  </header>
                </template>
                <h4 class="text-warning text-uppercase">
                  {{ innerItem.title }}
                </h4>

                <p class="description mt-3">
                  {{ innerItem.description }}
                </p>
                <div class="border-danger border-danger-red">
                  <span>Total Employee = {{ innerItem.totalEmployee }}</span>
                  <br />
                  <span
                    >Accepted Employee =
                    {{
                      getCountOfAcceptedEmployee(innerItem.doneApplications)
                    }}</span
                  >
                  <br />

                  <span
                    >Total Application =
                    {{ innerItem.doneApplications.length }}</span
                  >
                  <br />
                </div>
                <router-link
                  tag="a"
                  class="btn btn-primary mt-4"
                  :to="{
                    name: 'GivenApplicationEdit',
                    params: { id: innerItem.id }
                  }"
                  >Edit
                </router-link>
                <router-link
                  tag="a"
                  class="btn btn-warning mt-4"
                  :to="{
                    name: 'DoneApplicationsToGivenApplication',
                    params: { id: innerItem.id }
                  }"
                  >Detail
                </router-link>
                <template #footer>
                  <div>
                    <badge type="primary" rounded
                      >{{ innerItem.price }} ₺</badge
                    >
                    <badge type="info" rounded>{{
                      new Date(innerItem.startDate) | dateFormat("YYYY.MM.DD")
                    }}</badge>
                    <badge type="default" rounded>{{
                      new Date(innerItem.creationDate)
                        | dateFormat("YYYY.MM.DD")
                    }}</badge>
                  </div>
                </template>
              </card>
            </div>
          </div>
        </div>
        <div class="col-6 text-center m-0">
          <header>
            <h2 class="display-6">
              <span class="text-primary">Content</span>
            </h2>
          </header>
          <hr />
          <router-view />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Card from "../../components/Card";
import { DoneApplicationType } from "../../models/Types";
import { mapGetters } from "vuex";
export default {
  components: { Card },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getGivenApps"]),
    parentPageColSize() {
      return {
        "col-6": this.$route.params.id != null,
        "col-12": this.$route.params.id == null
      };
    }
  },
  methods: {
    getCountOfAcceptedEmployee(doneApplications) {
      //console.log("dome" + doneApplications.UserId);
      let count = 0;
      doneApplications.filter(x => {
        //console.log("x:" + x.doneApplicationType);
        if (x.doneApplicationType === DoneApplicationType.Accepted) count++;
      });
      return count;
    }
  },
  created() {
    this.$store.dispatch("initEmployerGivenApps");
  }
};
</script>
<style scoped>
.border-danger {
  border-style: dashed !important;
  border-width: 1px;
}
.back-danger-red {
  background-color: red;
}
</style>
