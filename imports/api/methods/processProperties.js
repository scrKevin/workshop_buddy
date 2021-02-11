import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import ProcessProperties from '../collections/ProcessProperties.js';

Meteor.methods({
    'processProperties.insert'(label, type) {
        check(label, String);
        check(type, String);
 
        // Make sure the user is logged in before inserting a task
        // if (!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }
 
        return ProcessProperties.insert({
            label: label,
            type: type,
            createdAt: new Date()
        });
    },
    'processProperties.remove'(processPropertyId) {
        check(processPropertyId, String);
 
        return ProcessProperties.remove(processPropertyId);
    }
});