var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema for the todo API
var TodoSchema = new Schema({
  todo: String,
  completed: {type: Boolean, default: false},
  created_by: {type: Date, default: Date.now}
});

// Pre process the model values for validation
TodoSchema.pre('save', true, function(next, done) {
  if(!this.todo) {
    next(new Error('Todo cannot be null'));
  }
  next();
})

// Export the model
var TodoModel = mongoose.model('Todo', TodoSchema);
module.exports = TodoModel;
