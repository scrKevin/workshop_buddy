<template>
  <div>
    <h2>Stock Locations</h2>
    <input
        type="text"
        placeholder="filter"
        v-model="filter"
      />
    <form className="new-task" @submit.prevent="handleSubmit">
      <input
        type="text"
        placeholder="Type to add new stock location"
        v-model="newStockLocation"
      />
    </form>
    <ul>
      <StockLocation
        v-for="stockLocation in filteredList"
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
import Orderables from "../../api/collections/Orderables.js"

export default {
  components: {
    StockLocation,
  },
  data() {
    return {
      newStockLocation: "",
      filter: ""
    };
  },
  meteor: {
    $subscribe: {
      'stockLocations': [],
      'orderables': []
    },
    stockLocations() {
      return StockLocations.find({})
    },
    orderables() {
      return Orderables.find({})
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
  computed: {
    filteredList() {
      var result = []
      var itemsHash = {}
      this.orderables.forEach(function(orderable){
        itemsHash[orderable._id] = orderable
      })
      // console.log(itemsHash)
      if (Object.keys(itemsHash).length > 0)
      {
        for (stockLocation of this.stockLocations)
        {
          newStockLocation = {_id: stockLocation._id, name: stockLocation.name, items: []}
          for (item of stockLocation.items)
          {
            // console.log(item.itemId)
            if (itemsHash[item['itemId']].name.toLowerCase().includes(this.filter.toLowerCase()))
            {
              newStockLocation.items.push({item: itemsHash[item['itemId']], amount: item.amount})
            }
          }
          if (this.filter !== ""){
            if (newStockLocation.items.length > 0)
            {
              result.push(newStockLocation)
            }
          } else {
            result.push(newStockLocation)
          }
        }
      }
      return result
    }
  }
};
</script>