<template>
  <div>
    <h2>Stock Locations</h2>
    <form className="new-task" @submit.prevent="handleSubmit">
      <input
        type="text"
        placeholder="Type to add new stock location"
        v-model="newStockLocation"
      />
    </form>
    <ul>
      <StockLocation
        v-for="stockLocation in stockLocations"
        v-bind:key="stockLocation._id"
        v-bind:stockLocation="stockLocation"
      />
    </ul>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
// import Vue from "vue";
import StockLocation from "./StockLocation.vue";
import StockLocations from "../../api/collections/StockLocations.js";

export default {
  components: {
    StockLocation,
  },
  data() {
    return {
      newStockLocation: "",
    };
  },
  meteor: {
    $subscribe: {
      'stockLocations': [],
    },
    stockLocations() {
      return StockLocations.find({})
    }
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()
      Meteor.call("stockLocations.insert", this.newStockLocation);
 
      // Clear form
      this.newStockLocation = "";
    },
  },
};
</script>