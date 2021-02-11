import { Meteor } from 'meteor/meteor';
import Suppliers from '../collections/Suppliers.js';

Meteor.publish('suppliers', function () {
  return Suppliers.find();
});
