import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Match } from 'meteor/check';
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
      items: [],
      createdAt: new Date()
    });
  },
  'stockLocations.remove'(stockLocationId) {
    check(stockLocationId, String);

    return StockLocations.remove(stockLocationId);
  },
  'stockLocation.addItem'(stockLocationId, itemId, type, amount){
    //console.log(stockLocationId)
    nAmount = parseInt(amount);
    check(nAmount, Match.Integer);
    // console.log(nAmount)
    sl = StockLocations.findOne({_id: stockLocationId});//.fetch();
    // console.log(sl.items)
    const found = sl.items.find(item => item.itemId === itemId);

    // console.log(found)

    if (found){
      return StockLocations.update({_id: stockLocationId, 'items.itemId': itemId}, {$set:{'items.$.amount': (found.amount + nAmount)}})
    } else {
      return StockLocations.update({_id: stockLocationId}, {$push: {items: {itemId: itemId, type: type, amount: nAmount}}})
    }
  }
});