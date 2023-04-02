const express = require('express')
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { connectMongoDb } = require('./Database')
const cors = require('cors')
const { listen } = require('./env')
const { singupRoute } = require('./Routes/User')
const socketio = require('socket.io');
const http = require('http');
const { Descussion } = require('./Database/discussion')
const { courseRoute } = require('./Routes/Course');
const { lectureRoutes } = require('./Routes/lecture');
const { assignmentRoutes } = require('./Routes/assignment');
const { quizRoutes } = require('./Routes/quiz');
const { gradeRoutes } = require('./Routes/Grade');
const { syllabusRoutes } = require('./Routes/Syllabus');
const { modulesRoutes } = require('./Routes/modules');


const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");
 app.use(fileUpload())
app.use(singupRoute)
app.use(courseRoute)
app.use(lectureRoutes)
app.use(assignmentRoutes)
app.use(quizRoutes)
app.use(gradeRoutes)
app.use(syllabusRoutes)
app.use(modulesRoutes)



const io = require('socket.io')(3005,{
  cors:{
      origin:["http://localhost:3000"],
  }
})

io.on('connection', socket=>{
  console.log(socket.id)
  socket.on('data',async (data,room)=>{
      console.log(data)
      let newMessage = await Descussion({
        text: data.content,
        sender:data.sender
      })
       await newMessage.save()
       let allData = await Descussion.find()
      if(room === "")
      {
      socket.broadcast.emit('receive-data', allData)
      }
      else
      {
          socket.to(room).emit('receive-data',allData)
      }
  })
  socket.on('join-room',room=>{
      socket.join(room)
  })
})

connectMongoDb().then((response)=>{
    console.log('connection...')
}).catch((error)=>{
    console.log(error)
})



app.listen(listen,()=>{

    console.log('listening at ',listen)

})