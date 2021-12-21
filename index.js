//we will create an api which will search all related news articles from certain news sites regarding "Christmas" and "New Year" and then show the list of them all.

const PORT = process.env.PORT || 3000;

const express = require("express");

const app = express();

app.get("/testPath", (req, res) => {
  console.log(req);
  res.send("Welcome to the API");
});

app.listen(PORT, () => {
  console.log("Hello, server is running on port " + PORT);
});
