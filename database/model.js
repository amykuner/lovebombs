// SQL queries
const db = require("./connection");

function getFacMembers() {
  return db.query("SELECT * FROM fac_members").then((result) => result.rows);
}

function getFacMemberDetails(name) {
  return db
    .query(`SELECT * FROM fac_members WHERE full_name = '${name}'`)
    .then((result) => result.rows);
}

function getComments(name) {
  return db
    .query(
      `SELECT compliments.text_content, compliments.created_at, compliments.fac_member_id ,users.username FROM compliments INNER JOIN users ON users.id = compliments.user_id
      INNER JOIN (SELECT * FROM fac_members WHERE full_name='${name}') AS member_name ON compliments.fac_member_id = member_name.id;`
    )
    .then((result) => result.rows);
}

function addComments(values) {
    return db
        .query(
            `INSERT INTO compliments (user_id, fac_member_id, text_content, created_at)
            VALUES ($1, $2, $3, (SELECT CURRENT_TIMESTAMP))`, values);
}

// db.query("INSERT INTO fac_members (full_name, img_url, cohort_name, fac_role ) VALUES($1, $2, $3, $4)", [full_name,img_url, cohort_name, fac_role ]);

function createUser(request, response) {
  const data = request.body;
  console.log(data)
  const values = Object.values(data);
  db.query(
    "INSERT INTO fac_members (full_name, img_url, cohort_name, fac_role ) VALUES($1, $2, $3, $4)",
    values
  ).then(() => {
    response.redirect("/");
  });
}

module.exports = { getFacMembers, getFacMemberDetails, getComments, addComments, createUser};

