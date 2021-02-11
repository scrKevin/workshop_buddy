import { Meteor } from 'meteor/meteor';
import ProcessProperties from '../collections/ProcessProperties.js';

Meteor.publish('processProperties', function () {
  return ProcessProperties.find();
});
