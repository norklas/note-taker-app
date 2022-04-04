// Importing requirements
const express = require("express");
const fs = require("fs");
const path = require("path");
// UUID to create unique ID
const { v4: uuidv4 } = require("uuid");

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
  req.body.id = uuidv4();
  notes.push(req.body);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  const noteID = req.params.id;

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === noteID) {
      notes.splice(i, 1);
    }
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(notes));

  deletedNotes = notes;
  res.json(deletedNotes);
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
