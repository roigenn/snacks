<template>
      <div class="form-group">
        <select class="form-control" aria-placeholder="label" @change="updateValue">
        <option selected disabled>{{label}}</option>
        <option v-for="(value, name) in options" :key="value"  :value="value">{{name}}</option>
      
        </select>
    </div>
</template>

<script>
export default {
    props:["options","label"],
    methods: {
    updateValue(evt) {
      
      let value = evt.target.value;
      console.log(value);
      this.$emit("input", value);
    },
   }
}
</script>