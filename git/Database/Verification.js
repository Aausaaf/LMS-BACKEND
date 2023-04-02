const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }

})

const Verification  = mongoose.model('Verification',verificationSchema)

module.exports = {
    Verification
}