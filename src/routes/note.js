const express = require('express')
const router = express.Router()
const { validateNote } = require('../utils/validators')

/* ------------------------ TODO-4 - Create New Note ------------------------ */
router.post('/', (req, res) => {
  console.log(`[POST] http://localhost:${global.port}/note - Storing a new note`)

  /*
  	TODO-4:
  		Given node content
  		Create a new node and store the node to the database,
  		Return the newly created note object

  		Note content is stored in variable newText

  		Your return object should be something similar to this:
      	{ id, text, dateCreated, lastModified }
  */
  // const newText = req.body.text

    const newNote = {
      text: req.body.text,
      dateCreated: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    }

    // Upon succ, run the following lines to validate the response object and respond to client

    // --- begin of succ flow ---
    if (!validateNote(newNote, true)) {
      res.status(500).send('Invalid data type')
    }

    dbCon.query( `INSERT INTO Notes SET ?`, newNote,
      function(error, result, fields) {
        if(error) {
          // --- begin of fail flow ---
          res.status(500).send('Fail to insert')
          // --- end of fail flow ---
        }
        newNote.id = result.insertId;
        res.status(201).send({ newNote })
      }
    )
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-5 - Update A Note ------------------------- */
router.put('/', (req, res) => {
  console.log(`[PUT] http://localhost:${global.port}/note - Updating note`)

  /*
		TODO-5:
			Given note id and content
			Update the note's content with the given id in the database
			Return the updated note object

			Note id is stored in variable noteId
			Note content is stored in variable newText

			Your return object should be something similar to this:
        { id, text, dateCreated, lastModified }
	*/
	const noteId = req.body.id
	const newText = req.body.text
  dbCon.query( `SELECT * FROM Notes Where id = ?`, noteId, function(selectError, selectResult) {

    if(selectError) {
      return res.status(500).send("failed to find note");
    }

    const updatedNote = {
      ...selectResult[0],
      text: newText
    }

    if (!validateNote(updatedNote)) {
      return res.status(500).send('Invalid data type')
    }
    
    dbCon.query( `UPDATE Notes SET text = ? WHERE id = ?`, [newText, noteId],
      function(error) {
        if(error) {
          return res.status(500).send('Fail to update')
        }
        res.status(200).send({ updatedNote })
      }
    )

  } )
})
/* -------------------------------------------------------------------------- */

/* ------------------------- TODO-6 - Delete A Note ------------------------- */
router.delete('/', (req, res) => {
  console.log(`[DELETE] http://localhost:${global.port}/note - Deleting note`)

  /*
	  TODO-6:
      Given a note id
		  Delete note with the given id from the database

		  Note id is stored in variable noteId 
	*/
	const noteId = req.body.id

  /*

    // Your code here...



    // Upon succ, run the following lines to validate the response object and respond to client

    // --- begin of succ flow ---
    res.send()
    // --- end of succ flow ---



    // Upon fail, run the following lines to respond with an error

    // --- begin of fail flow ---
    res.status(500).send('Fail to delete')
    // --- end of fail flow ---

  */



  // TODO-6.1: Remove this section once you start working on TODO-6
  // --- Remove section begins ---
  res.send()
  // --- Remove section ends ---
})
/* -------------------------------------------------------------------------- */

module.exports = router
