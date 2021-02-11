<template>
  <div>
    <Login />
    <router-view v-if="user"/>
  </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import Login from './components/Login.vue';

export default {
  components: {
    Login
  },
  data(){
    return {
      user: null,
    }
  },
  created(){
    Tracker.autorun(() => {
      this.user = Meteor.user()
    });
  }
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
</style>
