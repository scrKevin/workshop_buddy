import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import StockLocations from '../collections/StockLocations.js';

Meteor.methods({
  'stockLocations.insert'(stockLocationName) {
    check(stockLocationName, String);

    // Make sure the user is logged in before inserting a task
    // if (!this.userId) {
    //     throw new Meteor.Error('not-authorized');
    // }

    return StockLocations.insert({
      name: stockLocationName,
      createdAt: new Date()
    });
  },
  'stockLocations.remove'(stockLocationId) {
    check(stockLocationId, String);

    return StockLocations.remove(stockLocationId);
  }
});