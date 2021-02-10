<template>
  <li>
    <button className="delete" @click="deleteThisSkill">
      ×
    </button>
 
    <span class="text">
      {{ this.skill.text }}
    </span>
  </li>
</template>
 
<script>
// import Skills from "../../api/collections/Skills";

export default {
  props: ["skill"],
  data() {
    return {};
  },
  methods: {
    deleteThisSkill() {
      Meteor.call("skills.remove", this.skill._id);
    }
  }
};
</script>