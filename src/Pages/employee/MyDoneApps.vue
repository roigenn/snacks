<template>
  <section class="section section-sm">
    <div class="container">
      <container-header>My Done Applications</container-header>
      <div class="row">
        <div class="col-12 text-center mb-4">
          <div class="row">
            <div class="col-8">
              <base-input
                placeholder="Search By Name"
                addon-left-icon="ni ni-zoom-split-in"
                v-model="filter.search"
              ></base-input>
            </div>
            <div class="col-4">
              <model-list-select
                :list="filter.dapList"
                v-model="filter.dap"
                option-value="value"
                option-text="key"
                placeholder="select status"
                class="p-3 "
                type="text"
              >
              </model-list-select>
            </div>
          </div>
          <div class="table-responsive">
            <div>
              <table class="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">Application Name</th>
                    <th scope="col">Job Starting Date</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Comment</th>
                    <th scope="col">Vote</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in doneApps" :key="index">
                    <td>{{ item.givenApplication.name }}</td>
                    <td>
                      {{
                        new Date(item.givenApplication.startDate)
                          | dateFormat("YYYY.MM.DD")
                      }}
                    </td>
                    <td>{{ item.givenApplication.price }} ₺</td>
                    <td>
                      <badge
                        :type="
                          getBadgeClassByDoneApplicationType(
                            item.doneApplicationType
                          )
                        "
                      >
                        {{
                          getKeyByDoneApplicationType(item.doneApplicationType)
                        }}
                      </badge>
                    </td>
                    <td>
                      {{
                        item.doneApplicationType != 3
                          ? "NOT COMPLETED"
                          : item.comment
                      }}
                    </td>
                    <td>
                      {{
                        item.doneApplicationType != 3
                          ? "NOT COMPLETED"
                          : item.vote
                      }}
                    </td>
                    <td>
                      <div class="row ">
                        <div class="col-6 p-0">
                          <router-link
                            tag="a"
                            class="btn rounded-circle btn-icon-only btn-icon btn-primary btn-md"
                            :to="{
                              name: 'GivenAppDetail',
                              params: { id: item.givenApplication.id }
                            }"
                          >
                            <i class="ni ni-curved-next"></i>
                          </router-link>
                        </div>

                        <div class="col-6 p-0">
                          <base-button
                            :tag="'a'"
                            class="text-white"
                            :typeClass="'danger'"
                            :size="'md'"
                            :icon="'ni ni-fat-remove'"
                            :iconOnly="true"
                            :rounded="true"
                          >
                          </base-button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  DoneApplicationType,
  getKeyByVal,
  DoneApplicationTypePair
} from "../../models/Types";
import { mapGetters } from "vuex";
import { ModelListSelect } from "vue-search-select";
import ContainerHeader from "../_shared/ContainerHeader";
export default {
  components: { ModelListSelect, ContainerHeader },
  data() {
    return {
      filter: {
        search: "",
        dap: null,
        dapList: DoneApplicationTypePair
      }
    };
  },
  computed: {
    ...mapGetters(["getDoneApps"]),
    doneApps() {
      var what = this.$store.getters.getDoneAppsByFilter({
        search: this.filter.search,
        dap: this.filter.dap
      });
      console.log("what" + what);
      return what;
    }
  },
  methods: {
    getKeyByDoneApplicationType(value) {
      return getKeyByVal(value, DoneApplicationType);
    },
    getBadgeClassByDoneApplicationType(val) {
      if (val == DoneApplicationType.Pending) return "warning";
      else if (val == DoneApplicationType.Denied) return "danger";
      else if (val == DoneApplicationType.Accepted) return "success";
      else if (val == DoneApplicationType.Completed) return "info";
    }
  },
  created() {
    DoneApplicationTypePair.push({ key: "All", value: 1000 });
    this.$store.dispatch("initDoneApps");
    console.log(Object.entries(DoneApplicationType));
  }
};
</script>
