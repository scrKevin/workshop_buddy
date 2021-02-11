<template>
  <div>
    <h2>Permissions</h2>
    <form className="new-task" @submit.prevent="handleSubmit">
      <input
        type="text"
        placeholder="Type to add new permission"
        v-model="newPermission"
      />
    </form>
    <ul>
      <Permission
        v-for="permission in permissions"
        v-bind:key="permission._id"
        v-bind:permission="permission"
      />
    </ul>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Permission from "./Permission.vue";
import Permissions from "../../api/collections/Permissions.js";

export default {
  components: {
    Permission
  },
  data() {
    return {
      newPermission: "",
      hideCompleted: false
    };
  },
  meteor: {
    $subscribe: {
      'permissions':[]
    },
    permissions() {
      return Permissions.find({})
    }
  },
  methods: {
    handleSubmit(event){
      //event.preventDefault()
      Meteor.call("permissions.insert", this.newPermission);
      this.newPermission = ""
    }
  },
};
</script>

<style>

</style>