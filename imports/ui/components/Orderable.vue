<template>
  <li>
    <button className="delete" @click="deleteThis">
      ×
    </button>
 
    <span class="text">
      {{ this.orderable.name }}
    </span>
    <p>NEW:</p>
    <ul>
      <SuppliersListItem
        v-for="supplier in suppliersList"
        v-bind:key="supplier._id"
        v-bind:supplier="supplier"
      />
    </ul>
  </li>
</template>
 
<script>
import { Meteor } from "meteor/meteor";
import SuppliersListItem from "./SuppliersListItem.vue";
// import Orderables from "../../api/collections/Orderables.js";

export default {
  components: {
    SuppliersListItem
  },
  props: ["orderable"],
  data() {
    return {};
  },
  methods: {
    deleteThis() {
      Meteor.call("orderables.remove", this.orderable._id);
    }
  }
};
</script>