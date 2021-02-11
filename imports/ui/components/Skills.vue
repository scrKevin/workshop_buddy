<template>
  <div>
    <h2>Skills</h2>
    <form className="new-task" @submit.prevent="handleSubmit">
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
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
// import Vue from "vue";
import Skill from "./Skill.vue";
import Skills from "../../api/collections/Skills.js";

export default {
  components: {
    Skill,
  },
  data() {
    return {
      newSkill: "",
      hideCompleted: false
    };
  },
  meteor: {
    $subscribe: {
      'skills': [],
    },
    skills() {
      return Skills.find({})
    }
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()
      Meteor.call("skills.insert", this.newSkill);
 
      // Clear form
      this.newSkill = "";
    },
  },
};
</script>