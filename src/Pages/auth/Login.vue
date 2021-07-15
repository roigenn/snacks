<template>
  <section class="section section-shaped section-lg my-0">
    <div class="loading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
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
              <div class="text-muted text-center mb-3">
                <small>SIGN IN</small>
              </div>
            </template>
            <template>
              <form role="form" @submit.prevent="onSubmit">
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
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="user.password"
                >
                </base-input>
                <base-checkbox>
                  Remember me
                </base-checkbox>
                <div class="text-center">
                  <base-button
                    :tag="'button'"
                    :typeClass="'primary'"
                    type="submit"
                    class="my-4 primary"
                  >
                    Sign In
                  </base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <router-link class="text-light" tag="a" to="/register">
                <small>Create new account</small>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import BaseSelect from "../../components/BaseSelect";
import { mapGetters } from "vuex";

export default {
  components: {
    BaseSelect
  },
  data() {
    return {
      user: {
        email: "emp@a.com",
        password: "123456"
      },
      loginButtonClicked: false
    };
  },
  methods: {
    onSubmit() {
      this.loginButtonClicked = true;
      this.$store.dispatch("login", this.user);
    }
  },
  computed: {
    isLoading() {
      if (this.loginButtonClicked) {
        return {
          display: "block"
        };
      } else {
        return {
          display: "none"
        };
      }
    }
  }
};
</script>
<style></style>
