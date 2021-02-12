import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Suppliers from '../collections/Suppliers.js';

Meteor.methods({
  'suppliers.insert'(supplierName) {
    check(supplierName, String);

    // Make sure the user is logged in before inserting a task
    // if (!this.userId) {
    //     throw new Meteor.Error('not-authorized');
    // }

    return Suppliers.insert({
      name: supplierName,
      createdAt: new Date()
    });
  },
  'suppliers.remove'(supplierId) {
    check(supplierId, String);

    Meteor.call('orderables.removeSupplier', supplierId)

    return Suppliers.remove(supplierId);
  }
});