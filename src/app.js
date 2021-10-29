const config = require('dotenv').config()
const cors = require('cors')
const express = require('express');
const mysql = require('mysql');

const healthRouter = require("./routes/health")
const notesRouter = require("./routes/notes")
const noteRouter = require("./routes/note")

if (config.error) {
  throw config.error
}

const port = process.env.PORT // || 3001
global.port = port

const corsOptions ={
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200,
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
  TODO-1: Setup Database connection
*/
  const databaseConnection = mysql.createConnection ({
    host: 'localhost',
    user: 'notesserver',
    password: 'mynotesserver',
    database: 'notes'
  });

  databaseConnection.connect((err) => {
    if (err) {
      console.log(err);
        throw err;
    }
    console.log('Connected to database');
  });

  global.dbCon = databaseConnection;

/* 
  TODO-1: Database setup done
*/

/*
TODO-2: Upon database connection success, create the relavent table(s) if it does not exist.
*/

databaseConnection.query( 
  `CREATE TABLE IF NOT EXISTS Notes (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(200),
    dateModified DATE NOT NULL,
    lastModified DATE NOT NULL
  )`,
    function (error, result) {
      if(error) {
        console.log(error);
      }
      console.log(result);
    }
  )

/* 
TODO-2: Relevent table creation done
*/

app.get('/', (req, res) => {
  res.send('CSBC1010 Assignment 3 - My Notes')
})

app.use("/health", healthRouter)
app.use("/notes", notesRouter)
app.use("/note", noteRouter)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
