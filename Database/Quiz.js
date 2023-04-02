const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    course:{
        type:String,
        required:true,
    },
    user:{
        type:String
    },
    title:{
        type:String
    },
    content:{
       type:Array,
       required:true,
    },
    startDate:{
        type:String,
        required:true,
    },
    endDate:{
        type:String,
    },
    uniquekey:{
        type:String,
        required:true
    },
    points:{
        type:String,
    }
    
})

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = {
    Quiz
}