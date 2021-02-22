import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import ProductionQueue from '../collections/ProductionQueue.js';

Meteor.methods({
  'productionqueue.insert'(productId) {
    check(productId, String);

    // Make sure the user is logged in before inserting a task
    // if (!this.userId) {
    //     throw new Meteor.Error('not-authorized');
    // }

    return ProductionQueue.insert({
      productId,
      state: 'init',
      createdAt: new Date()
    });
  },
  'productionqueue.remove'(productId) {
    check(productId, String);

    return ProductionQueue.remove(productId);
  }
});