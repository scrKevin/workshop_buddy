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
        <input type="submit" name="submit" @click="submit($event)" value="Add new orderable">
      </form>
    </p>
    <ul>
      <li v-for="item in this.product.items">
        <button className="delete" @click="deleteItem(item.id)">
          ×
        </button>
        <a>
          ({{item.amount}}x) {{getItemName(item.id)}}
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
    },
    orderables () {
      return Orderables.find({})
    },
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
    submit(event) {
      event.preventDefault()
      Meteor.call('product.addOrderable', this.product._id, this.selected, this.new_amount, (error) => {
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
  }
};
</script>