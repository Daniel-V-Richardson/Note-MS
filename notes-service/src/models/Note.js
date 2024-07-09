const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const getNoteModel = (db) => db.model('Note', noteSchema);

module.exports = getNoteModel;
