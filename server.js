const express = require("express");
const server = express();
const staticHandler = express.static("public");
server.use(staticHandler);


const model = require("./database/model.js");

server.get("/",(request, response) => {
  model.getFacMembers().then((results) => {
    console.log(results);
    })
    response.send("<h1>Hello!</h1>")
})


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
