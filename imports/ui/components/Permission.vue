<template>
  <li>
    <button className="delete" @click="deleteThisPermission">
      ×
    </button>
 
    <span class="text">
      {{ this.permission.text }}
    </span>
  </li>
</template>
 
<script>
// import Permissions from "../../api/collections/Permissions";

export default {
  props: ["permission"],
  data() {
    return {};
  },
  methods: {
    deleteThisPermission() {
      Meteor.call("permissions.remove", this.permission._id);
    }
  }
};
</script>