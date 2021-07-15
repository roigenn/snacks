<template>
  <div class="container">
    <container-header>Users</container-header>
    <div class="row">
      <div class="col-12 text-center mb-4">
        <div class="table-responsive">
          <div>
            <table class="table table-striped ">
              <thead>
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in getAdminUsers" :key="index">
                  <td>{{ item.name + " " + item.surname }}</td>
                  <td>
                    {{ item.roleName }}
                  </td>
                  <td>{{ item.email }}</td>
                  <td>
                    {{ item.phoneNumber }}
                  </td>
                  <td>
                    <div class="row">
                      <div class="col-12">
                        <base-button
                          :tag="'a'"
                          class="text-white text-center p-0"
                          :typeClass="'danger'"
                          :size="'md'"
                          :icon="'ni ni-fat-remove'"
                          :iconOnly="true"
                          @click="deleteUser(item.id)"
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
</template>
<script>
import ContainerHeader from "../_shared/ContainerHeader";
import { mapGetters } from "vuex";
export default {
  components: { ContainerHeader },
  computed: {
    ...mapGetters(["getAdminUsers"])
  },
  methods: {
    deleteUser(userId) {
      this.$store.dispatch("adminDeleteUser", { userId: userId });
    }
  },
  created() {
    this.$store.dispatch("initAdminUsers");
  }
};
</script>
