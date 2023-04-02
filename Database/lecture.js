const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  
    course:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    videoLink : {
        type: String,
    },
     content: {
        type: String,
     }

})

const Lecture = mongoose.model('Lecture',lectureSchema)

module.exports = {
    Lecture
}