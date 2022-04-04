const fs = require("fs");
const router = require("express").Router();
const notes = require("../db/db.json");
// UUID package for uniqued IDs on notes
const { v4: uuidv4 } = require("uuid");

// GET request for notes
router.get("/api/notes", (req, res) => {
  res.json(notes);
});

// POST request for notes
router.post("/api/notes", (req, res) => {
  req.body.id = uuidv4();
  notes.push(req.body);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

// DELETE request for notes parameter ID
router.delete("/api/notes/:id", (req, res) => {
  // Setting note ID
  const noteID = req.params.id;

  // Looping through notes. If note has ID, splice note
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === noteID) {
      notes.splice(i, 1);
    }
  }

  // Writing db.json to update with deleted notes
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));

  // Responding with deleted notes
  deletedNotes = notes;
  res.json(deletedNotes);
});

// Export
module.exports = router;
