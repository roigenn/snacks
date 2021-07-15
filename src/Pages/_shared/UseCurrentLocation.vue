<template>
  <modal :show.sync="showModal">
    <h6 slot="header" class="modal-title" id="modal-title-default">
      Your current location
    </h6>

    <p class="text-center">
      {{ coordinate.displayAddress }}
    </p>

    <template slot="footer">
      <base-button type="primary" class="mx-auto" @click="saveLocation"
        >Use this location</base-button
      >
    </template>
  </modal>
</template>
<script>
import Modal from "../.././components/Modal";
export default {
  components: { Modal },

  data() {
    return {
      showModal: this.modalShow,
      coordinate: {
        displayAddress: null,
        lat: null,
        lon: null
      } 
    };
  },
  watch: {
    modalShow(value) {
      this.showModal = value;
    },
    showModal(value) {
      this.$emit("changeShowModal", value);
      /*GET USER LOCATIONNNNNN*/
      if (value) {
        if (window.navigator.geolocation) {
          var position = window.navigator.geolocation.getCurrentPosition(
            res => {
              console.log(res.coords);
              this.$store
                .dispatch("convertToAddressAsync", {
                  lat: res.coords.latitude,
                  lon: res.coords.longitude
                })
                .then(res => {
                  console.log("res from current location" + res.display_name);
                  this.coordinate.lat = res.lat;
                  this.coordinate.lon = res.lon;
                  this.coordinate.displayAddress = res.display_name;
                });
            }
          );
        }
      }
    }
  },
  methods: {
    saveLocation() {
      this.$store.dispatch("addLocationByCoordinate", {
        lat: this.coordinate.lat,
        lon: this.coordinate.lon,
        display_name: this.coordinate.displayAddress
      });
      this.showModal = false;
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
