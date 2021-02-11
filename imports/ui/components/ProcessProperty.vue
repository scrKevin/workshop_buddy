<template>
  <li>
    <button className="delete" @click="deleteThis">
      ×
    </button>
 
    <span class="text">
      {{ this.processProperty.label }} = {{ this.processProperty.type }}
    </span>
  </li>
</template>
 
<script>


export default {
  props: ["processProperty"],
  data() {
    return {};
  },
  methods: {
    deleteThis() {
      Meteor.call("processProperties.remove", this.processProperty._id);
    }
  }
};
</script>