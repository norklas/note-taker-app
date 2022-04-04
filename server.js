// Importing requirements
const express = require("express");

// Initializing Express
const app = express();

// Setting port
const PORT = process.env.PORT || 3001;

// Making public folder accessible to the client
app.use(express.static("public"));

// Making client data readable for Express server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Router
const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);

// HTML Router
const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

// Opening port for listening
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
