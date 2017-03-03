// Register your apis here

// Publications go here
import '/imports/api/localities/server/publications.js';
import '/imports/api/crops/server/publications.js';
import '/imports/api/records/server/publications.js';
import '/imports/api/users/server/publications.js'; // It's needed to know app where the publication to find it on subscribe
import '/imports/api/clusters/server/publications.js';

// Methods go here
import '/imports/api/localities/methods.js';
import '/imports/api/users/methods.js';
import '/imports/api/records/methods.js';

// import '/imports/api/users/mailgun.js';
import '/imports/api/users/email.js';

// ?????????
