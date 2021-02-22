import { Meteor } from 'meteor/meteor';
import ProductionQueue from '../collections/ProductionQueue.js';

Meteor.publish('productionqueue', function () {
  return ProductionQueue.find();
});
