// Express routing, and path dependencies
const path = require("path");
const router = require("express").Router();

// GET for /notes, responds with notes.html
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// GET for /, responds with index.html
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// GET for any other than / or /notes
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Export
module.exports = router;
