const express = require("express");
const server = express();
const staticHandler = express.static("public");
const home = require("./routes/home.js")

server.use(staticHandler);

// server.get("/:name",(request, response) => {

//     response.send("<h1>Hello!</h1>")
// })

server.get("/", home.home)


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
