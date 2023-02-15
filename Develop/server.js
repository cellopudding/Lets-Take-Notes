// Dependencies/Configs
const fs = require('fs');

const express = require("express");

const path = require("path");

const util = require('util');

const db = require('./db/db.json');


// const uuid = require('uuid');

const app = express();

const PORT = process.env.PORT || 3001;

// Sets up the Express app for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.set('view engine', 'ejs');




//Routes
// app.get('/', (req, res) => res.send('Visit http://localhost:3001/api'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
  
  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });
  
app.get('/api/notes', async(req, res) => {
   const notesPath = path.join(__dirname, 'db/db.json')
    const readFile = fs.readFileSync(notesPath);
    const notes = JSON.parse(readFile);
      res.render('notes', {notes});  
    console.log(notes);
    
  });

//   // POST Route for submitting feedback
// app.post('/api/notes', (req, res) => {
//     // Log that a POST request was received
//     console.info(`${req.method} request received to submit note`);
  
//     // Destructuring assignment for the items in req.body
//     const { title, text } = req.body;
  
//     // If all the required properties are present
//     if (title && text) {
//       // Variable for the object we will save
//       const newNote = {
//         title,
//         text,
//         //text_id: uuid(),
//       };
  
//       readAndAppend(newNote, './db/db.json');
  
//       const response = {
//         status: 'success',
//         body: newNote,
//       };
  
//       res.json(response);
//     } else {
//       res.json('Error in posting note');
//     }
//   });


//Listener
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });

  