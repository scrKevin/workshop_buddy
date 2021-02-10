import { Meteor } from 'meteor/meteor';
import Permissions from '../collections/Permissions.js';

Meteor.publish('permissions', function () {
  return Permissions.find();
});
