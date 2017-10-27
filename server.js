const express = require("express");
const googleImages=  require("google-images");

const app = express();

const client = new googleImages('014650101167941682675:ywg1grtu0va', 'AIzaSyA-7eTrKjOhX2kdscA2MRxNFDbOh1Pyc6o');

let requests = [];

app.get("/find/:term", async (req, res) => {
  const images = await client.search(req.params.term, {page: req.query.offset, size: "large"});
  let convertedImages = [];
  
  images.forEach((image) => {
    convertedImages.push({
      url: image.url,
      snippet: image.description,
      thumbnail: image.thumbnail.url,
      contenx: image.parentPage
    });
  });
  
  requests.push({
    term: req.params.term,
    when: new Date()
  });
  
  res.json(convertedImages);
});

app.get("/lastRequests", (req, res) => {
  res.json(requests);
});

app.listen(3000, function () {
  console.log("Example app listenning on port 3000!")
});