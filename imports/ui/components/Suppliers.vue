<template>
  <div>
    <h2>Suppliers</h2>
    <form className="new-task" @submit.prevent="handleSubmit">
      <input
        type="text"
        placeholder="Type to add new supplier"
        v-model="newSupplier"
      />
    </form>
    <ul>
      <Supplier
        v-for="supplier in suppliers"
        v-bind:key="supplier._id"
        v-bind:supplier="supplier"
      />
    </ul>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
// import Vue from "vue";
import Supplier from "./Supplier.vue";
import Suppliers from "../../api/collections/Suppliers.js";

export default {
  components: {
    Supplier,
  },
  data() {
    return {
      newSupplier: "",
    };
  },
  meteor: {
    $subscribe: {
      'suppliers': [],
    },
    suppliers() {
      return Suppliers.find({})
    }
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()
      Meteor.call("suppliers.insert", this.newSupplier);
 
      // Clear form
      this.newSupplier = "";
    },
  },
};
</script>