<template>
  <footer class="footer has-cards">
    <div class="container">
      <div class="row row-grid align-items-center my-md">
        <div class="col-lg-6">
          <h3 class="text-primary font-weight-light mb-2">
            Dear, my lecturers
          </h3>
          <h4 class="mb-0 font-weight-light">
            Thank you for your efforts during my education life.
          </h4>
        </div>
      </div>
      <hr />
      <div class="row align-items-center justify-content-md-between">
        <div class="col-md-6">
          <div class="copyright">
            &copy; {{ year }}
            <a
              href="https://www.creative-tim.com"
              target="_blank"
              rel="noopener"
              >Mustafa Alperen Polat</a
            >
            &
            <a href="https://www.binarcode.com" target="_blank" rel="noopener"
              >171501583</a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "app-footer",
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
