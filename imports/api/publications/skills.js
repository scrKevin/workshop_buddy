import { Meteor } from 'meteor/meteor';
import Skills from '../collections/Skills.js';

Meteor.publish('skills', function () {
  return Skills.find();
});
