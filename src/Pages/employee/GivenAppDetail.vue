<template>
  <section class="section section-sm">
    <div class="container">
      <header class="mb-5">
        <h2 class="display-6 text-center">
          Given App Detail
          <span class="text-success"></span>
        </h2>
      </header>
      <div class="row">
        <div class="col-md-8  m-0">
          <header>
            <h2 class="display-6 text-center">
              <span class="text-primary text-capitalize text-lowercase ">
                {{ getPublicGivenAppDetail.title }}</span
              >
            </h2>
          </header>
          <hr />
          <header>
            <h4 class="display-5 text-center">
              <span class="text-success">
                {{ getPublicGivenAppDetail.name }}</span
              >
            </h4>
          </header>
          <div class="elements mt-5">
            <div>
              <h5 class="display-5  text-warning">Description</h5>
              <p>{{ getPublicGivenAppDetail.description }}</p>
            </div>
            <div>
              <h5 class="display-5  text-warning">Address</h5>
              <p>
                <i>{{ getPublicGivenAppDetailAddress }}</i>
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 m-0" id="overview">
          <header>
            <h2 class="display-6 text-center">
              <span class="text-primary ">Summary</span>
            </h2>
          </header>
          <hr />
          <card class="border-0" shadow body-classes="py-4">
            <template #header>
              <header>
                <h2 class="display-6 text-center">
                  <span class="text-success">Job Overview</span>
                </h2>
              </header>
            </template>
            <ul class="list-group">
              <li class="list-group-item">
                Posted Date:
                <span>
                  {{
                    new Date(getPublicGivenAppDetail.creationDate)
                      | dateFormat("YYYY.MM.DD")
                  }}
                </span>
              </li>
              <li class="list-group-item">
                Starting Date:
                <span>
                  {{
                    new Date(getPublicGivenAppDetail.startDate)
                      | dateFormat("YYYY.MM.DD")
                  }}
                </span>
              </li>
              <li class="list-group-item">
                Price: <span>{{ getPublicGivenAppDetail.price }} ₺</span>
              </li>

              <li class="list-group-item">
                Total Employee:
                <span>{{ getPublicGivenAppDetail.totalEmployee }}</span>
              </li>
              <router-link
                tag="li"
                class="list-group-item"
                :to="{
                  name: 'PublicUser',
                  params: { id: getPublicGivenAppDetail.user.id }
                }"
              >
                Employer:
                <a
                  ><span>{{
                    getPublicGivenAppDetail.user.name +
                      " " +
                      getPublicGivenAppDetail.user.surname
                  }}</span></a
                >
              </router-link>
            </ul>
            <div class="text-center">
              <a
                class="btn btn-primary mt-4 text-white"
                @click="MakeApply(getPublicGivenAppDetail.id)"
                >Apply</a
              >
            </div>
            <template #footer>
              <div class="text-center">
                <badge type="primary" rounded
                  >{{ getPublicGivenAppDetail.price }} ₺</badge
                >
                <badge type="info" rounded>
                  {{
                    new Date(getPublicGivenAppDetail.startDate)
                      | dateFormat("YYYY.MM.DD")
                  }}
                </badge>
                <badge type="default" rounded>
                  {{
                    new Date(getPublicGivenAppDetail.creationDate)
                      | dateFormat("YYYY.MM.DD")
                  }}
                </badge>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from "../../components/Card";
import { mapGetters } from "vuex";
export default {
  components: { Card },
  data() {
    return { fullAdres: null };
  },
  computed: {
    ...mapGetters(["getPublicGivenAppDetail", "getPublicGivenAppDetailAddress"])
  },
  methods: {
    MakeApply(givenApplicationId) {
      this.$store.dispatch("makeApplication", { givenApplicationId });
    }
  },
  created() {
    this.$store.dispatch("publicGivenAppDetail", {
      givenAppId: this.$route.params.id
    });
  }
};
</script>

<style scoped>
#overview li {
  float: left !important;
}
#overview li span {
  float: right !important;
}
</style>
