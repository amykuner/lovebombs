// `on` is used to hook into various events Cypress emit config` is the resolved Cypress config

// Cypress provides a way to execute code in your Node environment: “tasks”.
// These are special functions you can create and then call from inside tests
//  import build in our Cypress task and use it to reset the database.

const build = require('../../database/build.js');

module.exports = (on, config) => {
  on('task', {
    resetDb: () => {
      return build();
    },
  });
};
