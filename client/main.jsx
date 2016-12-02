// Client entry point, imports all client code

import '/imports/startup/client';
import '/imports/startup/both';

// React entry point

import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import MainLayout from '/imports/ui/MainLayout.jsx';
