// All clusters-related publications
import { Meteor } from 'meteor/meteor';
import { Clusters } from '../clusters.js';

Meteor.publish('clusters', () => Clusters.find({}));
