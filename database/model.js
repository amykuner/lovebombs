// SQL queries
const db = require('./connection');

function getFacMembers() {
  return db.query('SELECT * FROM fac_members').then((result) => result.rows);
}

module.exports = { getFacMembers };
