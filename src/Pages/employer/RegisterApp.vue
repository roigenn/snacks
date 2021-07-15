<template>
  <section class="section section-sm">
    <div class="container">
      <header class="mb-5">
        <h2 class="display-3 text-center">
          Register An Application
          <span class="text-success"></span>
        </h2>
      </header>
      <div class="row row-grid justify-content-center">
        <div class="col-lg-6 text-center bg-secondary">
          <card shadow>
            <template #header>
              <header>
                <h2 class="display-6">
                  <span class="text-success">Form</span>
                </h2>
              </header>
            </template>
            <form role="form" @submit.prevent="onSubmit">
              <base-input
                placeholder="Name"
                addon-left-icon="ni ni-hat-3"
                :inputClasses="'placeHolderBold'"
                v-model="givenApp.name"
              ></base-input>
              <base-input
                placeholder="Title"
                addon-left-icon="ni ni-hat-3"
                :inputClasses="'placeHolderBold'"
                v-model="givenApp.title"
              ></base-input>
              <base-input
                placeholder="Price"
                addon-left-icon="ni ni-money-coins"
                :inputClasses="'placeHolderBold'"
                v-model="givenApp.price"
              ></base-input>
              <base-input
                placeholder="Total Employee"
                addon-left-icon="ni ni-satisfied"
                :inputClasses="'placeHolderBold'"
                v-model="givenApp.totalEmployee"
              ></base-input>
              <base-input
                addon-left-icon="ni ni-calendar-grid-58"
                :inputClasses="'placeHolderBold'"
                v-model="givenApp.startDate"
              >
                <flat-picker
                  slot-scope="{ focus, blur }"
                  @on-open="focus"
                  @on-close="blur"
                  placeholder="Starting Date"
                  :config="{ allowInput: true }"
                  class="form-control datepicker placeHolderBold"
                  v-model="givenApp.startDate"
                >
                </flat-picker>
              </base-input>
              <div class="form-group input-group">
                <div class="input-group ">
                  <textarea
                    class="form-control placeHolderBold"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Description"
                    v-model="givenApp.description"
                  >
                  </textarea>
                </div>
              </div>
              <base-button
                :tag="'button'"
                :typeClass="'primary'"
                type="submit"
                class="my-4"
              >
                Create Application
              </base-button>
            </form>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Card from "../../components/Card";
import FlatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  components: { Card, FlatPicker },
  data() {
    return {
      givenApp: {
        name: null,
        title: null,
        price: null,
        totalEmployee: null,
        startDate: null,
        description: null
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("saveEmployerGivenApp", this.givenApp);
    }
  }
};
</script>
<style>
.placeHolderBold::-webkit-input-placeholder {
  color: blue;
  font-weight: bold;
}
.placeHolderBold::-moz-placeholder {
  color: blue;
  font-weight: bold;
}
.placeHolderBold:-ms-input-placeholder {
  color: blue;
  font-weight: bold;
}
.placeHolderBold:-o-input-placeholder {
  color: blue;
  font-weight: bold;
}
</style>
