const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    course:{
        type:String,
        required:true,
    },
    user:{
        type:String
    },
   grade:{
    type:Array
   }
   
})

const Grade = mongoose.model('Grade', gradeSchema)

module.exports = {
    Grade
}