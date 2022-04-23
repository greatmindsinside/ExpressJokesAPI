import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import { each } from "cheerio/lib/api/traversing";
import express from "express";

const PORT = 8000;
const app = express();

const JokeLinks = [
  { links: "https://unmario.fandom.com/wiki/Your_Mom_Jokes" },
  {
    links:
      "https://blog.lacolombe.com/2017/05/12/our-favorite-jokes-about-your-mom/",
  },
  { links: "https://ponly.com/yo-mama-jokes/" },
];

app.get("/", async (_req, res) => {
  const jokes = [];
  for await (const link of JokeLinks) {
    let html = await (await axios.get(link.links)).data;
    let $ = cheerio.load(html);

    $("p:contains('yo mama so dumb')", html).each(function () {
      let joke = $(this).text().trim();
      if (joke.length < 255) jokes.push({ joke });
    });

    $("p:contains('yo mama so dumb')", html).each(function () {
      let joke = $(this).text().trim();
      if (joke.length < 255) jokes.push({ joke });
    });

    $("p:contains('yo mama so old')", html).each(function () {
      let joke = $(this).text().trim();
      jokes.push({ joke });
    });

    console.log("Found: ", jokes);
  }

  res.json(jokes);
});

app.listen(PORT, () => {
  console.log("Server is now listening...");
});
