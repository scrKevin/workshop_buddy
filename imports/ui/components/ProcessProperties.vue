<template>
  <div>
    <h2>Process Properties</h2>
    <!-- <form className="new-task"> -->
      <input
        type="text"
        placeholder="New Label"
        v-model="newLabel"
      />
      <input
        type="text"
        placeholder="New Type"
        v-model="newType"
      />
      <button @click="handleSubmit">
        Submit
      </button>
    <!-- </form> -->
    <ul>
      <ProcessProperty
        v-for="processProperty in processProperties"
        v-bind:key="processProperty._id"
        v-bind:processProperty="processProperty"
      />
    </ul>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import ProcessProperty from "./ProcessProperty.vue";
import ProcessProperties from "../../api/collections/ProcessProperties.js";

export default {
  components: {
    ProcessProperty
  },
  data() {
    return {
      newLabel: "",
      newType: ""
    };
  },
  meteor: {
    $subscribe: {
      'processProperties':[]
    },
    processProperties() {
      return ProcessProperties.find({})
    }
  },
  methods: {
    handleSubmit(event){
      //event.preventDefault()
      Meteor.call("processProperties.insert", this.newLabel, this.newType);
      this.newLabel = "";
      this.newType = "";
    }
  },
};
</script>

<style>

</style>