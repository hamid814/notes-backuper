const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Please Enter a body text'],
    unique: false,
    sparse: true,
    index: {
      unique: false,
    },
  },
  tag: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tag',
    required: [true, 'please add a tag to your note'],
  },
  otherTags: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Tag',
    },
  ],
  byGuest: {
    type: Boolean,
    default: true,
  },
  isPersonal: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

NoteSchema.index({ body: 1 }, { unique: false });

module.exports = mongoose.model('Note', NoteSchema);
