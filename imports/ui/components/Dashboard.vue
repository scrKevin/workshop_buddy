<template>
  <div>
    <h2>Dashboard</h2>
    <p>
      Add production:
      <select v-model="selected">
        <option v-for="product in products" v-bind:value="product._id">
          {{ product.name }}
        </option>
      </select>
      <button @click="scheduleProduction($event)">Schedule Production</button>
    </p>
    <p>
      <ul>
        <li v-for="pqueueItem in productionqueue">
          {{ productsHash[pqueueItem.productId].name }} ({{ pqueueItem.state }})
          <button className="delete" @click="deleteProduction(pqueueItem._id)">
            ×
          </button>
        </li>
      </ul>
    </p>
    <p>
      <h2>To Produce:</h2>
      <ul>
        <li v-for="pqueueItem in producible" v-if="Object.keys(productsHash).length > 0 && Object.keys(stockHash).length > 0">
          {{ productsHash[pqueueItem.productId].name }}
        </li>
      </ul>
    </p>
    <p>
      <h2>To Order:</h2>
      <ul v-if="Object.keys(toOrder).length > 0">
        <li v-for="(amount, key) in toOrder" v-if="amount < 0 && Object.keys(orderablesHash).length > 0">
          {{-1*amount}}x {{orderablesHash[key].name}}
          <ul>
            <li v-for="supplier in orderablesHash[key].suppliers">
              <a :href="supplier.product_url" target="_blank">{{suppliersHash[supplier.id].name}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </p>
  </div>
</template>

<script>
import Products from "../../api/collections/Products.js";
import ProductionQueue from "../../api/collections/ProductionQueue.js";
import StockLocations from "../../api/collections/StockLocations.js";
import Orderables from "../../api/collections/Orderables.js";
import Suppliers from "../../api/collections/Suppliers.js";

export default {
  data() {
    return {
      selected: ""
    }
  },
  meteor: {
    $subscribe: {
      'products': [],
      'productionqueue': [],
      'stockLocations': [],
      'orderables': [],
      'suppliers': []
    },
    products () {
      return Products.find({})
    },
    productionqueue ()  {
      return ProductionQueue.find({})
    },
    stockLocations () {
      return StockLocations.find({})
    },
    orderables () {
      return Orderables.find({})
    },
    suppliers () {
      return Suppliers.find({})
    }
  },
  methods: {
    scheduleProduction(event){
      event.preventDefault()
      Meteor.call("productionqueue.insert", this.selected);
    },
    deleteProduction(productionId){
      Meteor.call("productionqueue.remove", productionId);
    }
  },
  computed: {
    toOrder(){
      tO = {}
      for (pqueueItem of this.productionqueue)
      {
        for (item of this.productsHash[pqueueItem.productId].items)
        {
          if (item.id in tO)
          {
            tO[item.id] += Number(item.amount)
          }
          else
          {
            tO[item.id] = Number(item.amount)
          }
        }
      }
      // console.log(this.stockHash)
      for (itemId in tO){
        if (itemId in this.stockHash['orderable'])
        {
          tO[itemId] = this.stockHash['orderable'][itemId] - tO[itemId]
        }
        else
        {
          tO[itemId] = 0 - tO[itemId]
        }
        
      }
      // console.log(tO)
      // if (Object.keys(tO).length > 0)
      // {
      return tO
      // }
      // else
      // {
      //   return {"x":0}
      // }
    },
    producible(){
      var p = []
      for (pqueueItem of this.productionqueue)
      {
        // console.log(pqueueItem)
        
        for (item of this.productsHash[pqueueItem.productId].items)
        {
          var allInStock = true
          // console.log(item)
          // console.log(this.stockHash[item.type][item.id])
          // console.log(this.stockHash)
          if (typeof(this.stockHash[item.type][item.id]) === 'undefined')
          {
            allInStock = false
          }
          else
          {
            if (this.stockHash[item.type][item.id] < Number(item.amount))
            {
              allInStock = false
            }
          }
        }
        if (allInStock)
        {
          p.push(pqueueItem)
        }
      }
      // console.log(p)
      return p
    },
    productsHash(){
      pHash = {}
      this.products.forEach(function(product){
        pHash[product._id] = product
      })
      return pHash
    },
    orderablesHash(){
      oHash = {}
      this.orderables.forEach(function(orderable){
        oHash[orderable._id] = orderable
      })
      return oHash
    },
    suppliersHash(){
      hash = {}
      this.suppliers.forEach(function(supplier){
        hash[supplier._id] = supplier
      })
      return hash
    },
    stockHash(){
      sHash = {'orderable':{}}
      for (stockLocation of this.stockLocations){
        for (item of stockLocation.items)
        {
          if (item.itemId in sHash[item.type])
          {
            sHash[item.type][item.itemId] += item.amount
          }
          else
          {
            sHash[item.type][item.itemId] = item.amount
          }
        }
      }
      return sHash
    }
  }
}
</script>

<style>

</style>