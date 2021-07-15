<template>
  <div class="table-responsive">
    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <router-link
              tag="td"
              :to="{
                name: 'PublicUser',
                params: { id: item.user.id },
              }"
            >
              <a>{{ item.user.name + " " + item.user.surname }}</a>
            </router-link>
            <td>{{ item.user.email }}</td>
            <td>{{ item.user.phoneNumber }}</td>
            <td>
              <badge
                :type="
                  getBadgeClassByDoneApplicationType(item.doneApplicationType)
                "
              >
                {{ getKeyByDoneApplicationType(item.doneApplicationType) }}
              </badge>
            </td>
            <td>
              <div class="row">
                <div class="col-4 p-0">
                  <base-button
                    :tag="'a'"
                    :typeClass="'success'"
                    :size="'sm'"
                    :icon="'ni ni-check-bold'"
                    :iconOnly="true"
                    :rounded="true"
                    @click="
                      acceptApplication({
                        givenApplicationId: item.givenApplicationId,
                        userId: item.userId,
                      })
                    "
                  >
                  </base-button>
                </div>

                <div class="col-4 p-0">
                  <base-button
                    :tag="'a'"
                    :typeClass="'danger'"
                    :size="'sm'"
                    :icon="'ni ni-fat-remove'"
                    :iconOnly="true"
                    :rounded="true"
                    @click="
                      denyApplication({
                        givenApplicationId: item.givenApplicationId,
                        userId: item.userId,
                      })
                    "
                  >
                  </base-button>
                </div>
                <div class="col-4 p-0">
                  <base-button
                    :typeClass="'primary'"
                    :size="'sm'"
                    :icon="'ni ni-favourite-28'"
                    :iconOnly="true"
                    :rounded="true"
                    :disabled="item.doneApplicationType != dap.Accepted"
                    @click="
                      changeModalAndSendItData(true, {
                        givenApplicationId: item.givenApplicationId,
                        userId: item.userId,
                      })
                    "
                  >
                  </base-button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <vote-done-application
        :modalShow="showVoteDoneApplicationModal"
        @changeShowModal="changeVoteDoneApplicationModal"
      ></vote-done-application>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { DoneApplicationType, getKeyByVal } from "../../models/Types";
import VoteDoneApplication from "./VoteDoneApplication";
export default {
  components: { VoteDoneApplication },
  data() {
    return {
      data: [],
      dap: DoneApplicationType,
      showVoteDoneApplicationModal: false,
    };
  },
  computed: {
    ...mapGetters(["getGivenAppDoneApps"]),
  },
  created() {
    this.fetchData();
  },
  watch: {
    //sadece route değişdiğinden component tekrar render edilmez
    $route: "fetchData",
    "$store.getters.getVoteDoneApplicationModal": function (value) {
      this.updateAfterVoting(value);
    },
  },
  methods: {
    fetchData() {
      this.$store.commit("clearUserGivenAppDoneAppsList");
      this.$store
        .dispatch("employerGivenAppDoneAppsDetail", {
          givenAppId: this.$route.params.id,
        })
        .then((res) => {
          this.data = res;
        });
    },
    getKeyByDoneApplicationType(value) {
      return getKeyByVal(value, DoneApplicationType);
    },
    getBadgeClassByDoneApplicationType(val) {
      if (val == DoneApplicationType.Pending) return "warning";
      else if (val == DoneApplicationType.Denied) return "danger";
      else if (val == DoneApplicationType.Accepted) return "success";
      else if (val == DoneApplicationType.Completed) return "info";
    },
    acceptApplication(data) {
      this.$store.dispatch("acceptApplication", data).then((res) => {
        this.data.forEach((x) => {
          if (x.userId == res.userId) {
            x.doneApplicationType = res.doneApplicationType;
          }
        });
      });
    },
    denyApplication(data) {
      this.$store.dispatch("denyApplication", data).then((res) => {
        this.data.forEach((x) => {
          if (x.userId == res.userId) {
            x.doneApplicationType = res.doneApplicationType;
          }
        });
      });
    },
    changeVoteDoneApplicationModal(value) {
      this.showVoteDoneApplicationModal = value;
    },
    changeModalAndSendItData(value, data) {
      //send data to modal and show it
      this.$store.commit("setVoteDoneApplicationModal", data);
      this.changeVoteDoneApplicationModal(value);
    },
    updateAfterVoting(value) {
      if (value.doneApplicationType != undefined) {
        this.data.forEach((x) => {
          if (x.userId == value.userId) {
            x.doneApplicationType = value.doneApplicationType;
          }
        });
      }
    },
  },
};
</script>
