/* eslint-disable no-dupe-keys */
const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: false,
    type: String,

  },
  assignees: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    type: String,
  }],
  reporter: [{
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    type: String,
  }],
  progress: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['assigned', 'to-do', 'in-progress', 'in-review', 'completed'],
    default: 'initiated',
  },
  dueDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = model('Task', TaskSchema);
