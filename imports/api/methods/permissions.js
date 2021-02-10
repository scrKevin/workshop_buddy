import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Permissions from '../collections/Permissions.js';

Meteor.methods({
    'permissions.insert'(text) {
        check(text, String);
 
        // Make sure the user is logged in before inserting a task
        // if (!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }
 
        return Permissions.insert({
            text,
            createdAt: new Date()
        });
    },
    'permissions.remove'(permissionId) {
        check(permissionId, String);
 
        return Permissions.remove(permissionId);
    }
});