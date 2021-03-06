import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Orderables from '../collections/Orderables.js';

Meteor.methods({
  'orderables.new'(name) {
    check(name, String);

    // Make sure the user is logged in before inserting a task
    // if (!this.userId) {
    //     throw new Meteor.Error('not-authorized');
    // }

    return Orderables.insert({
      name: name,
      suppliers: [],
      createdAt: new Date()
    });
  },
  'orderables.remove'(orderableId) {
    check(orderableId, String);

    return Orderables.remove(orderableId);
  },
  'orderables.removeSupplier'(supplierId) {

    return Orderables.update({}, {$pull: {suppliers: {id: supplierId}}}, {multi:true})
  },
  'orderable.addSupplier'(orderableId, supplierId, product_url) {
    check(supplierId, String);
    check(product_url, String);

    return Orderables.update({_id: orderableId}, {$push: {suppliers: {id: supplierId, product_url: product_url}}})
  },
  'orderable.removeSupplier'(orderableId, supplierId){
    check(orderableId, String);
    check(supplierId, String);
    return Orderables.update({_id: orderableId}, {$pull: {suppliers: {id: supplierId}}})
  },
  'orderable.supplier.updateProductUrl'(orderableId, supplierId, new_product_url){
    return Orderables.update({_id: orderableId, "suppliers.id": supplierId}, {$set:{"suppliers.$.product_url":new_product_url}})
  }
});