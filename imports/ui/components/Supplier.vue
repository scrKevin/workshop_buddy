<template>
  <li>
    <button className="delete" @click="deleteThis">
      ×
    </button>
 
    <span class="text">
      {{ this.supplier.name }}
    </span>
  </li>
</template>
 
<script>
// import Skills from "../../api/collections/Skills";

export default {
  props: ["supplier"],
  data() {
    return {};
  },
  methods: {
    deleteThis() {
      Meteor.call("suppliers.remove", this.supplier._id);
    }
  }
};
</script>