<template>
  <li>
    <button className="delete" @click="deleteThis">
      ×
    </button>
 
    <span class="text">
      {{ this.stockLocation.name }}
    </span>
  </li>
</template>
 
<script>
// import Skills from "../../api/collections/Skills";

export default {
  props: ["stockLocation"],
  data() {
    return {};
  },
  methods: {
    deleteThis() {
      Meteor.call("stockLocations.remove", this.stockLocation._id);
    }
  }
};
</script>