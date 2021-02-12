import { Meteor } from 'meteor/meteor';
import StockLocations from '../collections/StockLocations.js';

Meteor.publish('stockLocations', function () {
  return StockLocations.find();
});
