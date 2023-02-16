// Dependencies/Configs
const fs = require('fs');

const express = require("express");

const path = require("path");

const notes = require('./db/db.json');

const app = express();

const PORT = process.env.PORT || 3001;

// Sets up the Express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

//Create New Note
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
  };  

//Routes


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });

  app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

app.post('/api/notes', (req, res) => {
  // req.body.id = generateUniqueId();
  const note = createNewNote(req.body, notes);
  res.json(note);
});

//Listener
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });

  
