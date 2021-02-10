import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Skills from '../collections/Skills.js';

Meteor.methods({
    'skills.insert'(text) {
        check(text, String);
 
        // Make sure the user is logged in before inserting a task
        // if (!this.userId) {
        //     throw new Meteor.Error('not-authorized');
        // }
 
        return Skills.insert({
            text,
            createdAt: new Date()
        });
    },
    'skills.remove'(skillId) {
        check(skillId, String);
 
        return Skills.remove(skillId);
    }
});