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
          <!-- <option v-for="orderable in orderables" v-bind:value="orderable._id">
            {{ orderable.name }}
          </option> -->
          <option v-for="stockable in stockables" v-bind:value="stockable">
            {{ stockable.name }}
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
    <p>
      <h3>Debug:</h3>
      <p>{{selected}}</p>
    </p>
  </li>

</template>
 
<script>
import { Meteor } from "meteor/meteor";
import Orderables from "../../api/collections/Orderables.js";
import Products from "../../api/collections/Products.js";

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
      'products': []
    },
    orderables () {
      return Orderables.find({})
    },
    products () {
      return Products.find({})
    }
  },
  methods: {
    deleteThis() {
      Meteor.call("stockLocations.remove", this.stockLocation._id);
    },
    getType(itemId){
      for (orderable of this.orderables)
      {
        if (orderable._id == itemId)
        {
          return 'orderable'
        }
      }
      for (product of this.products)
      {
        // console.log(product)
        // console.log(itemId)
        if (product._id == itemId)
        {
          return 'sub-product'
        }
      }
    },
    submit(event) {
      event.preventDefault()
      // console.log(this.selected)
      // console.log(this.getType(this.selected._id))
      Meteor.call('stockLocation.addItem', this.stockLocation._id, this.selected._id, this.getType(this.selected._id), this.amount, (error, item) => {
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
    stockables (){
      return this.products.concat(this.orderables)

    }
  },
};
</script>