const db = require("../database/connection.js");

function home(request, response) {
  db.query("SELECT * FROM fac_members").then((result) => {
    // console.log(result);
    const users = result.rows;
    const userFullName = users.map((user) => user.full_name);
    const userList = users.map((user) => `<option value='${user.full_name}'>${user.full_name}</option>`).join("");
    
    response.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel='stylesheet' src='styles.css'>
      <title>Document</title>
    </head>
    <body>
      <h1>Hello</h1>

      <form action="/facmembers/:" method="GET">

      <label for="fac-members">Choose a name:</label>
        <select name="fac-members" id="fac-members">
          ${userList}
        </select>
        <input type="submit">
      </form>
${users}
    </body>
    </html>`
  );
});
}
  
module.exports = { home }; 