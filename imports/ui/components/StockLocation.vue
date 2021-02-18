<template>
  <li>
    <button className="delete" @click="deleteThis">
      ×
    </button>
 
    <span class="text">
      {{ this.stockLocation.name }}
    </span>
    <p>
      <form class="info-link-add">
        <select v-model="selected">
          <option v-for="orderable in orderables" v-bind:value="orderable._id">
            {{ orderable.name }}
          </option>
        </select>
        <input type="text" v-model="amount" name="amount" placeholder="Amount" required>
        <input type="submit" name="submit" @click="submit($event)" value="Add item to stock location">
      </form>
    </p>
    <ul>
      <li v-for="item in this.stockLocation.items">
        <a>
          {{item.item.name}}
        </a>
        <input type="number" v-model="item.amount" name="text" placeholder="Amount">
      </li>
    </ul>
  </li>
</template>
 
<script>
import { Meteor } from "meteor/meteor";
import Orderables from "../../api/collections/Orderables.js";

export default {

  props: ["stockLocation"],
  data() {
    return {
      selected: "",
      amount: ""
    };
  },
  meteor: {
    $subscribe: {
      'orderables': [],
    },
    orderables () {
      return Orderables.find({})
    },
  },
  methods: {
    deleteThis() {
      Meteor.call("stockLocations.remove", this.stockLocation._id);
    },
    submit(event) {
      event.preventDefault()
      // console.log(this.stockLocation._id)
      Meteor.call('stockLocation.addItem', this.stockLocation._id, this.selected, "orderable", this.amount, (error, item) => {
        if (error) {
          alert(error)
        } else {
          //alert(item)
          this.selected = ''
          this.amount = ''
        }
      })
    }
  },
  computed: {

  },
};
</script>