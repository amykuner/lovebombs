const express = require("express");

const staticHandler = express.static("public");
const posts = require("./routes/posts.js");
const model = require("./database/model.js");

const server = express();

server.use(staticHandler);

server.get("/facmembers/:name", posts.get);
server.post("/facmembers/:name", posts.post);

const PORT = process.env.PORT || 3000;

process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
