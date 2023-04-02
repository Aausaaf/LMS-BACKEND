const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    course:{
        type:String,
        required:true,
    },
    user:{
        type:String
    },
    heading:{
        type:String
    },
    content:{
        type:[{
           title:String,
           image:String,
           upload:String,
            video:String,
            description:String,
            points:String,
            getPoints:String,
            answerOption:[{
                ans:String

            }],
            answer:String
        }]
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
    }
    
})

const Quiz = mongoose.model('Assignment', quizSchema)

module.exports = {
    Quiz
}