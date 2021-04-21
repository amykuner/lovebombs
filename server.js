const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;



server.get("/",(request, response)=>{
    response.send("<h1>Hello!</h1>")
})



server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
