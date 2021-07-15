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
          <h1>Vote</h1>
        </div>
        <form role="form" @submit.prevent="onSubmit">
          <div class="form-group input-group">
            <div class="input-group p-3">
              <star-rating
                v-model="vote"
                v-bind:increment="0.25"
                v-bind:max-rating="5"
              ></star-rating>
            </div>
          </div>
          <div class="form-group input-group">
            <div class="input-group">
              <textarea
                class="form-control placeHolderBold"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Comment"
                v-model="comment"
              ></textarea>
            </div>
          </div>

          <base-button
            :tag="'button'"
            :typeClass="'primary'"
            type="submit"
            class="my-4"
          >
            Vote
          </base-button>
        </form>
      </template>
    </card>
  </modal>
</template>
<script>
import Modal from "../.././components/Modal";
import StarRating from "vue-star-rating";

export default {
  components: { Modal, StarRating },

  data() {
    return {
      showModal: this.modalShow,
      vote: 0,
      comment: null
    };
  },
  methods: {
    onSubmit() {
      var selectedDoneApplication = this.$store.getters
        .getVoteDoneApplicationModal;
      this.$store
        .dispatch("completeApplication", {
          ...selectedDoneApplication,
          vote: this.vote,
          comment: this.comment
        })
        .then(res => {
          this.$store.commit("setVoteDoneApplicationModal", res);
          this.showModal = false;
        });
    }
  },
  watch: {
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
