//we will create an api which will search all related news articles from certain news sites regarding "Christmas" and "New Year" and then show the list of them all.

const PORT = process.env.PORT || 3000;

const express = require("express");
const axios = require("axios");
const app = express();

const newspapers = [
  {
    name: "The Telegraph India",
    address: "https://www.telegraphindia.com/search?keyword=christmas",
  },
  {
    name: "The Times Of India",
    address: "https://timesofindia.indiatimes.com/topic/Christmas",
  },
];

const articles = [];

newspapers.forEach((newspaper) => {
  axios
    .get(newspaper.address)
    .then((response) => {
      const data = response.data;
      articles.push(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.get("/testPath", (req, res) => {
  console.log(req);
  res.send("Welcome to the API");
});

app.get("/articles", (req, res) => {
  console.log(req);
  res.json(articles);
});

app.listen(PORT, () => {
  console.log("Hello, server is running on port " + PORT);
});
