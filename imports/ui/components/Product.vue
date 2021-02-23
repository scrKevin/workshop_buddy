<template>
  <li>
    <button className="delete" @click="deleteThis">
      ×
    </button>
 
    <span class="text">
      {{ this.product.name }}
    </span>
    <p>
      <form class="info-link-add">
        <select v-model="selected">
          <option v-for="orderable in orderables" v-bind:value="orderable._id">
            {{ orderable.name }}
          </option>
        </select>
        <input type="number" v-model="new_amount" name="amount" placeholder="Amount" required>
        <input type="submit" name="submit" @click="submit($event, 'orderable')" value="Add new orderable">
      </form>
      <form class="info-link-add">
        <select v-model="selected">
          <option v-for="product in products" v-bind:value="product._id">
            {{ product.name }}
          </option>
        </select>
        <input type="number" v-model="new_amount" name="amount" placeholder="Amount" required>
        <input type="submit" name="submit" @click="submit($event, 'sub-product')" value="Add new sub-product">
      </form>
    </p>
    <ul>
      <li v-for="item in this.product.items" v-if="Object.keys(itemHash).length > 0">
        <button className="delete" @click="deleteItem(item.id)">
          ×
        </button>
        <a>
          ({{item.amount}}x) {{itemHash[item.type][item.id].name}} {{item.type}}
        </a>
<!--         <input type="url" v-model="supplier.product_url" name="url" placeholder="Url">
        <button className="delete" @click="saveUrl(supplier.id, supplier.product_url)">
          Save
        </button> -->
      </li>
    </ul>
  </li>
</template>
 
<script>
import { Meteor } from "meteor/meteor";
import Orderables from "../../api/collections/Orderables.js";
import Products from "../../api/collections/Products.js";

export default {
  props: ["product"],
  data() {
    return {
      selected: "",
      new_amount: ""
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
    getItemName(id){
      for (orderable of this.orderables){
        if (orderable._id == id){
          return orderable.name;
          break;
        }
      }
    },
    deleteThis() {
      Meteor.call("products.remove", this.product._id);
    },
    submit(event, type) {
      event.preventDefault()
      Meteor.call('product.addItem', this.product._id, this.selected, this.new_amount, type, (error) => {
        if (error) {
          alert(error.error)
        } else {
          this.selected = ''
          this.new_amount = ''
        }
      })
    },
    deleteItem(itemId){
      Meteor.call('product.removeItem', this.product._id, itemId);
    },
    // saveUrl(supplierId, product_url){
    //   // alert(supplierName)
    //   Meteor.call('orderable.supplier.updateProductUrl', this.orderable._id, supplierId, product_url);
    // }
  },
  computed: {
    itemHash (){
      var hash = {'orderable':{}, 'sub-product':{}}
      for (orderable of this.orderables)
      {
        hash['orderable'][orderable._id] = orderable
      }
      for (product of this.products)
      {
        hash['sub-product'][product._id] = product
      }
      console.log(hash)
      return hash
    }
  }
};
</script>