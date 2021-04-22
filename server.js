const express = require("express");

const server = express();
const staticHandler = express.static("public");
const posts = require("./routes/posts.js");
const home = require("./routes/home.js");
const model = require("./database/model.js");
const { response } = require("express");

server.use(staticHandler);

// server.get("/:name",(request, response) => {

//     response.send("<h1>Hello!</h1>")
// })

const bodyParser = express.urlencoded({ extended: false });

server.get("/", home.home)
server.post("/", bodyParser, home.post);

server.get("/facmembers/:name", posts.get);
server.post("/facmembers/:name", bodyParser, posts.post);

const PORT = process.env.PORT || 3000;

process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
