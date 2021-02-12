<template>
  <div>
    <h2>Orderables</h2>
    <input
        type="text"
        placeholder="filter"
        v-model="filter"
      />
    <form className="new-task" @submit.prevent="handleSubmit">
      <input
        type="text"
        placeholder="Type name (of orderable) to add new orderable"
        v-model="newOrderable"
      />
    </form>
    <ul>
      <Orderable
        v-for="orderable in filteredList"
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
      filter:""
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
  computed: {
    filteredList() {
      return this.orderables.filter(orderable => {
        return orderable.name.toLowerCase().includes(this.filter.toLowerCase())
      })
    }
  }
};
</script>

<style>

</style>