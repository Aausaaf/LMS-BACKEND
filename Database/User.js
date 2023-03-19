const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        required:true,
    },
    courses:{
         type:Array
         },
    githubLinks:{
        type:String,
    },
    linkdin:{
        type:String,
    },
    image:{
        type:String,
    },
    name:{
        type:String,
    },
    gender:{
        type:String,
    }


})


UserSchema.pre('save', async function(next) {
   
  
    this.password= await bcrypt.hash(this.password,12);
    

next()
})


const User = mongoose.model('User',UserSchema)

module.exports = {
    User
}
