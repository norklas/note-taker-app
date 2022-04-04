const fs = require("fs");
const router = require("express").Router();
const notesData = require("../db/db.json");
// UUID package for unique IDs
const { v4: uuidv4 } = require("uuid");

// GET request for notes
router.get("/notes", (req, res) => {
  res.json(notesData);
});

// POST request for notes
router.post("/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  notesData.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notesData, null, 2));
  res.json(notesData);
});

// DELETE request for notes parameter ID
router.delete("/notes/:id", (req, res) => {
  // Looping through notes then splicing note to delete it
  for (let i = 0; i < notesData.length; i++) {
    if (notesData[i].id == req.params.id) {
      notesData.splice(i, 1);
    }
  }

  // Writing new db.json to match deleted notes
  fs.writeFileSync("./db/db.json", JSON.stringify(notesData, null, 2));

  // Respond with new json data
  res.json(notesData);
});

// Export
module.exports = router;
