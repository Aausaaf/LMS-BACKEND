const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    created: { type: Date,
         default: Date.now() },
})

const Descussion = mongoose.model('Discussion',discussionSchema)

module.exports = {
  Descussion
}