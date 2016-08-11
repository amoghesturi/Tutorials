var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema for the todo API
var TodoSchema = Schema({
  todo: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  created_by: {
    type: Date,
    default: Date.now
  }
});

// Export the model
var TodoModel = mongoose.model('Todo', TodoSchema);
module.exports = TodoModel;
