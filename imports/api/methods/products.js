import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Products from '../collections/Products.js';

Meteor.methods({
  'products.new'(productName) {
    check(productName, String);

    return Products.insert({
      name: productName,
      items: [],
      createdAt: new Date()
    });
  },
  'products.remove'(productId) {
    check(productId, String);

    return Products.remove(productId);
  },
  'product.addOrderable'(productId, orderableId, amount) {
    return Products.update({_id: productId}, {$push:{items: {id:orderableId, type: 'orderable', amount:amount}}})
  },
  'product.removeItem'(productId, itemId){
    return Products.update({_id: productId}, {$pull:{items: {id: itemId}}})
  }
});