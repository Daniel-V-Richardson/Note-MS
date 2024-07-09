// notes-service/src/routes/note.js
const express = require("express");
const note = require("../controllers/note");
const authMiddleware = require("../../../shared/middleware/auth");
const selectUserDb = require("../middleware/selectUserDb");

const router = express.Router();

// Create Note Route
router.post("/note", authMiddleware, selectUserDb, note.createNote);
router.get("/note/:id", authMiddleware, selectUserDb, note.getNoteById);
router.get("/notes", authMiddleware, selectUserDb, note.getAllNotes);
router.put("/note/:id", authMiddleware, selectUserDb, note.updateNoteById);
router.delete("/note/:id", authMiddleware, selectUserDb, note.deleteNoteById);
router.delete("/notes", authMiddleware, selectUserDb, note.deleteAllNotes);

module.exports = router;
