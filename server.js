// Importing requirements
const express = require("express");
const fs = require("fs");
const path = require("path");

// Setting port
const PORT = process.env.PORT || 3001;

// Initializing Express
const app = express();

// Making client data readable for Express server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Making public folder accessible to the client
app.use(express.static("public"));

// Data request
const notes = require("./db/db.json");

// HTML Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET request for notes
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  notes.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err;
  });
  res.json(notes);
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
