const mongoose = require('mongoose')


const  modulesSchema  =  new mongoose.Schema({
    course:{
        type:String,
        required : true
    },
    modules : {
        type:Array,
        required : true
    }

}) 

const Modules  = mongoose.model('Module', modulesSchema)

module.exports = {
    Modules
}