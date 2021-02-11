<template>
  <div>
    <h2>Orderables</h2>
    <form className="new-task" @submit.prevent="handleSubmit">
      <input
        type="text"
        placeholder="Type name (of orderable) to add new orderable"
        v-model="newOrderable"
      />
    </form>
    <ul>
      <Orderable
        v-for="orderable in orderables"
        v-bind:key="orderable._id"
        v-bind:orderable="orderable"
      />
    </ul>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Orderable from "./Orderable.vue";
import Orderables from "../../api/collections/Orderables.js";

export default {
  components: {
    Orderable
  },
  data() {
    return {
      newOrderable: "",
    };
  },
  meteor: {
    $subscribe: {
      'orderables':[]
    },
    orderables() {
      return Orderables.find({})
    }
  },
  methods: {
    handleSubmit(event){
      //event.preventDefault()
      Meteor.call("orderables.new", this.newOrderable);
      this.newOrderable = ""
    }
  },
};
</script>

<style>

</style>