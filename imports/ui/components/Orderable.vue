<template>
  <li>
    <button className="delete" @click="deleteThis">
      ×
    </button>
 
    <span class="text">
      {{ this.orderable.name }}
    </span>
    <p>
      <form class="info-link-add">
        <select v-model="selected">
          <option v-for="supplier in suppliers" v-bind:value="supplier._id">
            {{ supplier.name }}
          </option>
        </select>
        <input type="url" v-model="new_product_url" name="url" placeholder="Url" required>
        <input type="submit" name="submit" @click="submit($event)" value="Add new supplier">
      </form>
    </p>
    <ul>
      <li v-for="supplier in this.orderable.suppliers">
        <button className="delete" @click="deleteSupplier(supplier.id)">
          ×
        </button>
        <a :href="supplier.product_url" target="_blank">
          {{getSupplierName(supplier.id)}}
        </a>
        <input type="url" v-model="supplier.product_url" name="url" placeholder="Url">
        <button className="delete" @click="saveUrl(supplier.id, supplier.product_url)">
          Save
        </button>
      </li>
    </ul>
  </li>
</template>
 
<script>
import { Meteor } from "meteor/meteor";
import Suppliers from "../../api/collections/Suppliers.js";

export default {
  props: ["orderable"],
  data() {
    return {
      selected: "",
      new_product_url: ""
    };
  },
  meteor: {
    $subscribe: {
      'suppliers': [],
    },
    suppliers () {
      return Suppliers.find({})
    },
  },
  methods: {
    getSupplierName(id){
      for (supplier of this.suppliers){
        if (supplier._id == id){
          return supplier.name;
          break;
        }
      }
    },
    deleteThis() {
      Meteor.call("orderables.remove", this.orderable._id);
    },
    submit(event) {
      event.preventDefault()
      Meteor.call('orderable.addSupplier', this.orderable._id, this.selected, this.new_product_url, (error) => {
        if (error) {
          alert(error.error)
        } else {
          this.selected = ''
          this.new_product_url = ''
        }
      })
    },
    deleteSupplier(supplierId){
      Meteor.call('orderable.removeSupplier', this.orderable._id, supplierId);
    },
    saveUrl(supplierId, product_url){
      // alert(supplierName)
      Meteor.call('orderable.supplier.updateProductUrl', this.orderable._id, supplierId, product_url);
    }
  }
};
</script>