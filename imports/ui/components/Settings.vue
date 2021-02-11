<template>
  <div className="container">
    <header>
      <h1>Settings</h1>
    </header>
    <Skills />
    <Permissions />
    <Suppliers />
    <!-- <ProcessProperties /> -->
  </div>
</template>
 
<script>
import { Meteor } from "meteor/meteor";
import Permissions from "./Permissions.vue";
import Skills from "./Skills.vue";
import ProcessProperties from "./ProcessProperties.vue";
import Suppliers from "./Suppliers.vue"
 
export default {
  components: {
    Skills,
    Permissions,
    ProcessProperties,
    Suppliers
  },
  data() {
    return {};
  },
  meteor: {},
  methods: {},
};
</script>