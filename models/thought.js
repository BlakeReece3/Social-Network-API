const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
    },
    username: {
      type: String,
      required: true
    },
    reactions: [ReactionSchema] // Use the ReactionSchema for the reactions array
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema);
const Reaction = mongoose.model('Reaction', ReactionSchema); 

module.exports = Thought;
