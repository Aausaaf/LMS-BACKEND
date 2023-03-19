const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const connectMongoDb = async() => {
    try {
        
      await mongoose.connect("mongodb+srv://aausafrelish:Aausafalam@cluster0.wfusnwz.mongodb.net/LMS?retryWrites=true&w=majority")   

      
    } catch (error) {
       console.log(error); 
    }
}

module.exports = {
    connectMongoDb
}