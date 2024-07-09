// notes-service/src/controllers/note.js
const mongoose = require("mongoose");
const getNoteModel = require("../models/Note");
const logger = require("../../../shared/logger");

const createNote = async (req, res) => {
  logger.info("Creating a Note");
  try {
    const { title, content } = req.body;
    const author = req.userId;

    const Note = getNoteModel(req.db);
    const newNote = new Note({
      title,
      content,
      author,
    });

    await newNote.save();

    res.status(201).send(newNote);
  } catch (error) {
    logger.error(`Error creating note: ${error.message}`);
    res.status(500).send({ error: "Failed to create note" });
  }
};

// Get a note by ID
const getNoteById = async (req, res) => {
  logger.info("Fetching Note by ID");
  try {
    const { id } = req.params;
    const Note = getNoteModel(req.db);
    const note = await Note.findById(id);

    if (!note || note.author !== req.userId) {
      return res.status(404).send({ error: "Note not found" });
    }

    res.send(note);
  } catch (error) {
    logger.error(`Error fetching note by ID: ${error.message}`);
    res.status(500).send({ error: "Failed to fetch note" });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  logger.info("Fetching All Notes");
  try {
    const Note = getNoteModel(req.db);
    const notes = await Note.find({ author: req.userId });

    res.send(notes);
  } catch (error) {
    logger.error(`Error fetching all notes: ${error.message}`);
    res.status(500).send({ error: "Failed to fetch notes" });
  }
};

// Update a note by ID
const updateNoteById = async (req, res) => {
  logger.info("Updating Note by ID");
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const Note = getNoteModel(req.db);
    const note = await Note.findById(id);

    if (!note || note.author !== req.userId) {
      return res.status(404).send({ error: "Note not found" });
    }

    note.title = title;
    note.content = content;
    await note.save();

    res.send(note);
  } catch (error) {
    logger.error(`Error updating note by ID: ${error.message}`);
    res.status(500).send({ error: "Failed to update note" });
  }
};

// Delete a note by ID
const deleteNoteById = async (req, res) => {
  logger.info("Deleting Note by ID");
  try {
    const { id } = req.params;

    const Note = getNoteModel(req.db);
    const note = await Note.findById(id);

    if (!note || note.author !== req.userId) {
      return res.status(404).send({ error: "Note not found" });
    }

    await Note.findByIdAndDelete(id)

    res.send({ message: "Note deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting note by ID: ${error.message}`);
    res.status(500).send({ error: "Failed to delete note" });
  }
};

// Delete all notes
const deleteAllNotes = async (req, res) => {
  logger.info("Deleting All Notes");
  try {
    const Note = getNoteModel(req.db);
    await Note.deleteMany({ author: req.userId });

    res.send({ message: "All notes deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting all notes: ${error.message}`);
    res.status(500).send({ error: "Failed to delete all notes" });
  }
};

module.exports = {
  createNote,
  getNoteById,
  getAllNotes,
  updateNoteById,
  deleteNoteById,
  deleteAllNotes
};
