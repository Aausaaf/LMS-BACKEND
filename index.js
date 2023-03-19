const express = require('express')
const cors = require('cors')
const { listen } = require('./env')
const { connectMongoDb } = require('./Database')
const { singupRoute } = require('./Routes/User')
const http = require('http');
const app = express()
const socketio = require('socket.io');
const { Descussion } = require('./Database/discussion')
app.use(cors())
app.use(express.json())
app.use(singupRoute)




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