import { Meteor } from 'meteor/meteor';
import Products from '../collections/Products.js';

Meteor.publish('products', function () {
  return Products.find();
});
