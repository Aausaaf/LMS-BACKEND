const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    file:{
        type : String
    }
})

const Media = mongoose.model('Media', MediaSchema)

module.exports = Media