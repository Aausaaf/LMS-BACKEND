const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
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
        type:String
    },
    startDate:{
        type:String,
        required:true,
    },
    endDate:{
        type:String,
    },
    answer:{
        type:String
    },
    uniquekey:{
        type:String,
        required:true
    },
    points:{
        type:String
    }
    
})

const Assignment = mongoose.model('Assignment', assignmentSchema)

module.exports = {
    Assignment
}