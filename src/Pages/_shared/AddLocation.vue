<template>
  <modal
    :show.sync="showModal"
    body-classes="p-0"
    modal-classes="modal-dialog-centered modal-sm"
  >
    <card
      type="secondary"
      shadow
      header-classes="bg-white pb-5"
      body-classes="px-lg-5 py-lg-5"
      class="border-0"
    >
      <template>
        <div class="text-center text-muted mb-4">
          <h1>Add A Location</h1>
        </div>
        <form role="form" @submit.prevent="onSubmit">
          <model-list-select
            :list="getCities"
            v-model="location.city"
            option-value="sehir_key"
            option-text="sehir_title"
            placeholder="select city"
            class="mb-3"
            type="text"
          >
          </model-list-select>

          <model-list-select
            :list="filterCounties"
            v-model="location.county"
            option-value="ilce_key"
            option-text="ilce_title"
            placeholder="select county"
            class="mb-3"
            type="text"
          >
          </model-list-select>

          <model-list-select
            :list="filterNeighborhoods"
            v-model="location.neighborhood"
            option-value="mahalle_key"
            option-text="mahalle_title"
            placeholder="select neighborhood"
            class="mb-3"
            type="text"
          >
          </model-list-select>
          <div class="text-center">
            <base-button type="primary" class="my-4">Add</base-button>
          </div>
        </form>
      </template>
    </card>
  </modal>
</template>
<script>
import Modal from "../.././components/Modal";
import { ModelListSelect } from "vue-search-select";
import { mapGetters } from "vuex";
export default {
  components: { Modal, ModelListSelect },

  data() {
    return {
      location: {
        city: {},
        county: {},
        neighborhood: {}
      },
      showModal: this.modalShow
    };
  },
  computed: {
    ...mapGetters(["getCities"]),
    filterCounties() {
      return this.$store.getters.getCounties(this.location.city.sehir_key);
    },
    filterNeighborhoods() {
      return this.$store.getters.getNeighborhoods(
        this.location.county.ilce_key
      );
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("addLocationByAddress", {
        city: this.location.city.sehir_title,
        county: this.location.county.ilce_title,
        neighborhood: this.location.neighborhood.mahalle_title
      });
      this.showModal = false;
      //this.$store.dispatch("convertCoordinate");
    }
  },
  created() {
    this.$store.dispatch("initCities");
    this.cities = this.$store.getters.getCities;
  },
  watch: {
    "location.city.sehir_key": function(newVal, oldVal) {
      if (oldVal == null && newVal != null)
        this.$store.dispatch("initCounties");
    },
    "location.county.ilce_key": function(newVal, oldVal) {
      if (oldVal == null && newVal != null)
        this.$store.dispatch("initNeighborhoods");
    },
    //////////////////
    modalShow(value) {
      this.showModal = value;
    },
    showModal(value) {
      this.$emit("changeShowModal", value);
    }
  },
  props: {
    modalShow: {
      type: Boolean,
      default: false,
      description: "Show Modal"
    }
  }
};
</script>
