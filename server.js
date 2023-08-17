// Import express.js
const express = require('express');
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Import the notes router
const api = require('./routes/notes');

// Specify on which port the Express.js server will run
const PORT = process.env.PORT || 3001;

// Initialize an instance of Express.js
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));



// This view route is a GET route for the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// This view route is a GET route for the index/homepage page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
