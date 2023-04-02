const mongoose = require('mongoose')


const SyllabusSchema  =  new mongoose.Schema({
    course:{
        type:String,
        required : true
    },
    syllabus : {
        type:Array,
        required : true
    }

}) 

const Syllabus  = mongoose.model('Syllabus', SyllabusSchema)

module.exports = {
    Syllabus
}