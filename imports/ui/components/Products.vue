<template>
  <div>
    <h2>Products</h2>
    <input
        type="text"
        placeholder="filter"
        v-model="filter"
      />
    <form className="new-task" @submit.prevent="handleSubmit">
      <input
        type="text"
        placeholder="Type name (of product) to add new product"
        v-model="newProduct"
      />
    </form>
    <ul>
      <Product
        v-for="product in filteredList"
        v-bind:key="product._id"
        v-bind:product="product"
      />
    </ul>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Product from "./Product.vue";
import Products from "../../api/collections/Products.js";

export default {
  components: {
    Product
  },
  data() {
    return {
      newProduct: "",
      filter:""
    };
  },
  meteor: {
    $subscribe: {
      'products':[]
    },
    products() {
      return Products.find({})
    }
  },
  methods: {
    handleSubmit(event){
      //event.preventDefault()
      Meteor.call("products.new", this.newProduct);
      this.newProduct = ""
    }
  },
  computed: {
    filteredList() {
      return this.products.filter(product => {
        return product.name.toLowerCase().includes(this.filter.toLowerCase())
      })
    }
  }
};
</script>

<style>

</style>