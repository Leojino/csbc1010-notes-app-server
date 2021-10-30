const express = require('express')
const router = express.Router()
const { validateNoteArray } = require('../utils/validators')

/* ------------------------ TODO-3 - Fetch All Notes ------------------------ */
router.get('/', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes - Fetching all notes`)

  /* 
    TODO-3:
      Fetch all notes from the database
      Return an array of note objects

      Your return object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */

    dbCon.query("SELECT * FROM Notes", function(error, results){

      if(error) {
        // Upon fail, run the following line to respond with an error

        // --- begin of fail flow ---
        return res.status(500).send('Fail to query')
        // --- end of fail flow ---
      }
      // const notes = results // this is the response object, make sure to replace with actual value

      // Upon succ, run the following lines to validate the response object and respond to client

      // --- begin of succ flow ---
      if (!validateNoteArray(results)) {
        return res.status(500).send('Invalid data type')
      }
      return res.send({ notes: results })
      // --- end of succ flow ---
    
  })
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-7 - Search Notes -------------------------- */
router.get('/search/:searchKey', (req, res) => {
  console.log(`[GET] http://localhost:${global.port}/notes/search - Searching notes`)

  /*
    TODO-7:
      Given a search key
      Fetch all notes from the database that contains the search key in the note content
      Return an array of matching note objects

      Search key is sotred in variable searchKey

      Your notes object should be something similar to this:
        [{ id, text, dateCreated, lastModified }]
  */
  const searchKey = req.params.searchKey
  // console.log(searchKey)
 

    // Your code here...

    // const notes = [] 

      dbCon.query(`SELECT * FROM Notes WHERE text LIKE "%${searchKey}%"`, function(error, results){

        if(error) {
          // --- begin of fail flow ---
          return res.status(500).send('Fail to query')
          // --- end of fail flow ---
        }

        // --- begin of succ flow ---
        if (!validateNoteArray(results)) {
          res.status(500).send('Invalid data type')
        }
        return res.send({ notes: results })
        // --- end of succ flow ---
      
    })
    
})
/* -------------------------------------------------------------------------- */

/* ----------------------- TODO-8 - Delete All Notes ------------------------ */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/notes - Deleting all notes`)

  /*
    TODO-8:
      Delete all notes from the database
  */
    // Your code here...

    dbCon.query("TRUNCATE Notes" , function(error, result) {
      if(error) {
        // --- begin of fail flow ---
        console.log(error)
        return res.status(500).send('Fail to delete')
        // --- end of fail flow ---
      }
      // --- begin of succ flow ---
      res.send()
      // --- end of succ flow ---
    })
})
/* -------------------------------------------------------------------------- */

module.exports = router