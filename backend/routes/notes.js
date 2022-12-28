const express = require("express");
const fetchuser = require("../middleware/FetchUser");
const { findOne } = require("../models/Notes");
const Notes = require("../models/Notes");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//ROUTE 1: fetch all the notes (GET)
// /api/notes/fetchAllNotes LOGIN REQUIRE
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  return res.json(notes);
});

//ROUTE 2: add a new note (POST)
// /api/notes/newnote LOGIN REQUIRED
router.post(
  "/newnote",
  fetchuser,
  [
    body("title", "title should not be empty").isLength({ min: 1 }),
    body("description", "description should not be empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      //check validationResults (express-validation code)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //create and save new node to DB in Notes model/schema
      const newNote = await Notes.create({
        user: req.user.id,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
      });
      const savedNote = await newNote.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: update a existing note
// /api/notes/update/id  LOGIN REQUIRED
router.put("/update/:id", fetchuser, async (req, res) => {
  try {
    //check if the user is updating the note related to his account(id)
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Note Not Found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("User not allowed to access this note");
    }

    //create a newNote json object
    const newNote = {};
    if (req.body.title) newNote.title = req.body.title;
    if (req.body.description) newNote.description = req.body.description;
    if (req.body.tag) newNote.tag = req.body.tag;

    //find the note and update it
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4: delete a note
// /api/notes/delete/id LOGIN REQUIRED
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    //check if the user is deleting the note related to his account(id)
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Note Not Found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("User not allowed to access this note");
    }

    //delete
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
