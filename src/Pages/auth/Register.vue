<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <small>SIGN UP</small>
              </div>
              <form role="form" @submit.prevent="onSubmit">
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Name"
                  addon-left-icon="ni ni-hat-3"
                  v-model="user.name"
                >
                </base-input>
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Surname"
                  addon-left-icon="ni ni-hat-3"
                  v-model="user.surname"
                >
                </base-input>
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Username"
                  addon-left-icon="ni ni-circle-08"
                  v-model="user.username"
                >
                </base-input>
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                  v-model="user.email"
                >
                </base-input>
                <base-input
                  alternative
                  class="mb-3"
                  placeholder="Phone Number"
                  addon-left-icon="ni ni-mobile-button"
                  v-model="user.phonenumber"
                >
                </base-input>
                <base-select
                  :label="'Gender'"
                  :options="GenderType"
                  v-model="user.gender"
                >
                </base-select>

                <base-select
                  :label="'Class'"
                  :options="RegisterRoleType"
                  v-model="user.roletype"
                >
                </base-select>
                <fade-transition origin="center" mode="out-in" :duration="500">
                  <base-input
                    alternative
                    class="mb-3"
                    placeholder="Company Name"
                    addon-left-icon="ni ni-hat-3"
                    v-if="showCompany"
                    v-model="user.company"
                  >
                  </base-input>
                </fade-transition>
                <base-input
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="user.password"
                >
                </base-input>
                <base-input
                  alternative
                  type="password"
                  placeholder="Re Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="user.repassword"
                >
                </base-input>

                <div class="text-center">
                  <base-button
                    :tag="'button'"
                    :typeClass="'primary'"
                    type="submit"
                    class="my-4"
                  >
                    Create account
                  </base-button>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import BaseSelect from "../../components/BaseSelect";
import Tabs from "../../components/Tabs/Tabs";
import TabPane from "../../components/Tabs/TabPane";
import { GenderType, RegisterRoleType } from "../../models/Types";
import { FadeTransition } from "vue2-transitions";
import { mapGetters } from "vuex";
export default {
  components: {
    BaseSelect,
    Tabs,
    TabPane,
    FadeTransition
  },
  data() {
    return {
      user: {
        name: "",
        surname: "",
        username: "",
        email: "",
        phonenumber: "",
        gender: null,
        roletype: null,
        company: null,
        password: "123456",
        repassword: "123456"
      },
      GenderType,
      RegisterRoleType
    };
  },
  computed: {
    showCompany() {
      console.log("companyshow");
      return this.user.roletype == RegisterRoleType.Employer;
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("register", this.user);
    }
  }
};
</script>
<style></style>
