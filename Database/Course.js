const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    
        name: {
        type: String,
        required: true
        },
        price: {
        type: String,
        required: true}
        ,
        description: {
            type: String,
            // required: true
        },
        image: {
            type: String,
            // required: true
        },
        category: {
            type: String,
            required: true
        },
        duration:{
            type: String,
            required: true
        },
        video:{
            type: String,
        },
        syllabus:{
            type: String,

        },
        user:{
            type:Array
        },
        level:{
            type: String,
        },
        language:{
            type: String,
        },
        shortDescription:{
            type: String,
        },
        assignment:{
            type: String,
        },
        quiz:{
            type: Array,
        },
        instructor:{
            type:String
        },
        certificate:{
            type:Array
        },
        published:{
            type:Boolean,
            required:true
        }

})
const Course  = mongoose.model('Courses',CourseSchema)
module.exports = {
    Course
}

//https://codesandbox.io/s/dannguyennhattruongreact-editor-upload-image-local-l6ozy?file=/src/App.js