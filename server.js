const express = require("express");

const server = express();
const staticHandler = express.static("public");
const posts = require("./routes/posts.js");
const home = require("./routes/home.js");
const model = require("./database/model.js");

server.use(staticHandler);
const bodyParser = express.urlencoded({ extended: false });

server.get("/", home.home)
server.post("/", bodyParser, home.post);

server.post("/createUser", bodyParser, model.createUser)
server.get("/facmembers/:name", posts.get);
//server.post('/', posts.post);
server.post("/facmembers/:name", bodyParser, posts.post);

const PORT = process.env.PORT || 3000;

process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
