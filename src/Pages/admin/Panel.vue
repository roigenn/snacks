<template>
  <div class="wrapper d-flex align-items-stretch">
    <div class="custom-menu">
      <button
        type="button"
        id="sidebarCollapse"
        class="btn btn-primary "
        @click="sidebarChangeFunction"
        v-if="!sidebarChange"
      >
        <i class="fa fa-bars"></i>
        <span class="sr-only">Toggle Menu</span>
      </button>
    </div>
    <nav id="sidebar" v-if="sidebarChange">
      <div class="custom-menu">
        <button
          type="button"
          id="sidebarCollapse"
          class="btn btn-primary"
          @click="sidebarChangeFunction"
        >
          <i class="fa fa-bars"></i>
          <span class="sr-only">Toggle Menu</span>
        </button>
      </div>
      <div class="p-4 pt-5 text-center">
        <router-link
          tag="a"
          class="navbar-brand"
          :to="'/'"
          :key="'homeFromPanel'"
        >
          <img
            v-lazy="'/img/brand/logo.png'"
            class="d-inline-block align-top"
            alt=""
          />
        </router-link>
        <ul class="list-unstyled components mb-5">
          <router-link
            tag="li"
            :to="{
              name: 'panelusers'
            }"
          >
            <a>Users</a>
          </router-link>
        </ul>
      </div>
    </nav>
    <!-- Page Content  -->
    <div id="content" class="p-4 p-md-5">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sidebarChange: true
    };
  },
  methods: {
    sidebarChangeFunction() {
      this.sidebarChange = !this.sidebarChange;
    }
  }
};
</script>
<style scoped src="./style.css"></style>
