//we will create an api which will search all related news articles from certain news sites regarding "Christmas" and "New Year" and then show the list of them all.

const PORT = process.env.PORT || 3000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

const newspapers = [
  {
    name: "The Telegraph India",
    address: "https://www.telegraphindia.com/search?keyword=christmas",
    base: "https://www.telegraphindia.com",
  },
  {
    name: "The Times Of India",
    address: "https://timesofindia.indiatimes.com/topic/Christmas",
    base: "https://timesofindia.indiatimes.com",
  },
  {
    name: "The Hindu",
    address:
      "https://www.thehindu.com/search/?q=christmas&order=DESC&sort=publishdate",
    base: "https://www.thehindu.com",
  },
  {
    name: "Hindustan Times",
    address: "https://www.hindustantimes.com/search?q=christmas",
    base: "https://www.hindustantimes.com",
  },
  {
    name: "The Deccan Herald",
    address: "https://www.deccanherald.com/search?term=christmas",
    base: "https://www.deccanherald.com",
  },
  {
    name: "The Economic Times",
    address: "https://economictimes.indiatimes.com/topic/christmas",
    base: "https://economictimes.indiatimes.com",
  },
];

const articles = [];

newspapers.forEach((newspaper) => {
  axios
    .get(newspaper.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("Christmas")', html).each(function () {
        var title = $(this).text();
        let url = $(this).attr("href");

        if (!url.startsWith("http")) url = newspaper.base + url;

        const obj = {
          title,
          url,
          source: newspaper.name,
        };
        articles.push(obj);
      });
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
