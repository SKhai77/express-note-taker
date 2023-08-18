// Import "express" and create a new router instance
const notes = require('express').Router();

// Import the 'uuid' package and destructure the v4 function as 'uuidv4'.
// 'uuidv4' is a function that generates version 4 UUIDs (random UUIDs).
const { v4: uuidv4 } = require('uuid');

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils')

// This API route is a GET Route for retrieving all the notes
notes.get('/notes', (req, res)=> {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get('/notes', (req, res) => {
  const id = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === id);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// DELETE Route for a specific note
notes.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !==id);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${id} has been deleted 🗑️`);
    });
});

// POST Route for a new note
notes.post('/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});



module.exports =  notes;