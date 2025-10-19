// index.js
const express = require("express");
const fetch = require("node-fetch"); // fetch external pages
const app = express();

app.use(express.json());
app.use(express.static("public")); // this is where your HTML will go

// Proxy endpoint
app.post("/proxy", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send("No URL provided");
  try {
    const response = await fetch(url);
    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).send("Error fetching URL");
  }
});

// Start server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
