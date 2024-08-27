const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require("./controllers");
const connection = require("./config/connection");

app.use(express.static("public"));
app.use(express.json());
app.use(routes);

connection.once("connected", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
