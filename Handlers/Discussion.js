const { Descussion } = require('../Database/discussion')

const io = require('socket.io')(5000,{
  cors:{
      origin:["http://localhost:3002"],
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