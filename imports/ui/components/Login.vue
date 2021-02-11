<template>
  <div id="login" v-if='user'>
    <button type="button" v-on:click="logout()">Logout</button>
  </div>
  <div id="login" v-else>
    <h1>Login</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
export default {
  name: 'Login',
  data() {
    return {
      user:null,
      input: {
        username: "",
        password: ""
      }
    }
  },
  created(){
    Tracker.autorun(() => {
      this.user = Meteor.user()
    });
  },
  methods: {
    login() {
      if(this.input.username != "" && this.input.password != "") {
        Meteor.loginWithPassword(this.input.username, this.input.password)
      } else {
        console.log("A username and password must be present");
      }
    },
    logout() {
      Meteor.logout()
    }
  }
}
</script>

<style scoped>
/*#login {
  width: 500px;
  border: 1px solid #CCCCCC;
  background-color: #FFFFFF;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}*/
</style>