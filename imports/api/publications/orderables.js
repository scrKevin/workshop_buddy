import { Meteor } from 'meteor/meteor';
import Orderables from '../collections/Orderables.js';

Meteor.publish('orderables', function () {
  return Orderables.find();
});
