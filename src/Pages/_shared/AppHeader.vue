<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <a class="navbar-brand" href="#">
          <img
            v-lazy="'/img/brand/logo.png'"
            class="d-inline-block align-top"
            alt=""
          />
        </a>
      </router-link>

      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <a
            href="https://demos.creative-tim.com/vue-argon-design-system/documentation/"
          >
            <img src="img/brand/blue.png" />
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <template v-if="getRole === getKeyByRoleType(RoleType.Employee)">
          <router-link
            class="nav-item"
            tag="li"
            :key="'MyDoneApps'"
            :to="{ name: 'MyDoneApps' }"
          >
            <a class="nav-link"> My Applications </a>
          </router-link>
          <router-link
            class="nav-item"
            tag="li"
            :key="'givenapps'"
            :to="{ name: 'givenapps', params: { searchTerm: null } }"
          >
            <a class="nav-link"> Find the nearest work </a>
          </router-link>
        </template>
        <template v-if="getRole === getKeyByRoleType(RoleType.Employer)">
          <router-link
            class="nav-item"
            tag="li"
            :key="'mygivenapps'"
            :to="{ name: 'mygivenapps' }"
          >
            <a class="nav-link"> My Jobs </a>
          </router-link>

          <router-link
            class="nav-item"
            tag="li"
            :key="'registerapp'"
            :to="{ name: 'registerapp' }"
          >
            <a class="nav-link"> Register Application </a>
          </router-link>
        </template>
        <router-link
          v-if="getRole === getKeyByRoleType(RoleType.Admin)"
          class="nav-item"
          tag="li"
          :key="'panel'"
          :to="{ name: 'panel' }"
        >
          <a class="nav-link"> Panel </a>
        </router-link>
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <template v-if="!isAuthenticated">
          <router-link
            class="nav-item d-none d-lg-block ml-lg-4"
            tag="li"
            :to="{ name: 'register' }"
            :key="'register'"
          >
            <a class="btn btn-sm p-2 btn-neutral btn-icon">
              <span class="btn-inner--icon">
                <i class="fa fa-user-plus mr-2"></i>
              </span>
              <span class="nav-link-inner--text">Register</span>
            </a>
          </router-link>

          <router-link
            class="nav-item d-none d-lg-block ml-lg-4"
            tag="li"
            :to="{ name: 'login' }"
            :key="'login'"
          >
            <a class="btn btn-sm p-2 btn-neutral btn-icon">
              <span class="btn-inner--icon">
                <i class="fa fa-sign-in mr-2"></i>
              </span>
              <span class="nav-link-inner--text">Log In</span>
            </a>
          </router-link>
        </template>
        <template v-else>
          <router-link
            v-if="getRole != getKeyByRoleType(RoleType.Admin)"
            class="nav-item d-none d-lg-block ml-lg-4"
            tag="li"
            :key="'profile'"
            :to="{ name: 'profile' }"
          >
            <a class="btn btn-sm p-2 btn-neutral btn-icon">
              <span class="btn-inner--icon">
                <i class="ni ni-bell-55 mr-2"></i>
              </span>
              <span class="nav-link-inner--text">Profile</span>
            </a>
          </router-link>

          <li class="nav-item d-none d-lg-block ml-lg-4" :key="'logout'">
            <a
              @click.prevent="logout"
              class="btn btn-sm p-2 btn-neutral btn-icon"
            >
              <span class="btn-inner--icon">
                <i class="fa fa-sign-in mr-2"></i>
              </span>
              <span class="nav-link-inner--text">Log Out</span>
            </a>
          </li>
        </template>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "../../../src/components/BaseNav";
import BaseDropdown from "../../../src/components/BaseDropdown";
import CloseButton from "../../../src/components/CloseButton";
import { mapGetters } from "vuex";
import { RoleType, getKeyByVal } from "../../models/Types";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  data() {
    return {
      role: null,
      RoleType
    };
  },
  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch("logout");
      this.$store.commit("clearRole");
    },
    getKeyByRoleType(value) {
      return getKeyByVal(value, RoleType);
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    getRole() {
      var role = this.$store.getters.getRole;
      console.log("role from computed :" + role);
      return role;
    }
  }
};
</script>
<style></style>
