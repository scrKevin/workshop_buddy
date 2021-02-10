<template>
  <div className="container">
    <header>
      <h1>Settings</h1>

<!--       <blaze-template template="loginButtons" tag="span"></blaze-template> -->
      <!-- <template v-if="currentUser"> -->

      <!-- </template> -->
    </header>
    <h2>Skills</h2>
    <form className="new-task" @submit.prevent="handleSubmitNewSkill">
      <input
        type="text"
        placeholder="Type to add new skill"
        v-model="newSkill"
      />
    </form>
    <ul>
      <Skill
        v-for="skill in skills"
        v-bind:key="skill._id"
        v-bind:skill="skill"
      />
    </ul>
    <h2>Permissions</h2>
    <form className="new-task" @submit.prevent="handleSubmitNewPermission">
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
// import Vue from "vue";
import Skill from "./Skill.vue";
import Skills from "../../api/collections/Skills.js";
import Permission from "./Permission.vue";
import Permissions from "../../api/collections/Permissions.js";
 
export default {
  components: {
    Skill,
    Permission
  },
  data() {
    return {
      newSkill: "",
      newPermission: "",
      hideCompleted: false
    };
  },
  meteor: {
    $subscribe: {
      'skills': [],
      'permissions':[]
    },
    skills() {
      return Skills.find({})
    },
    permissions() {
      return Permissions.find({})
    }
  },
  methods: {
    handleSubmitNewSkill(event) {
      event.preventDefault()
      Meteor.call("skills.insert", this.newSkill);
 
      // Clear form
      this.newSkill = "";
    },
    handleSubmitNewPermission(event){
      event.preventDefault()
      Meteor.call("permissions.insert", this.newPermission);
      this.newPermission = ""
    }
  },
};
</script>