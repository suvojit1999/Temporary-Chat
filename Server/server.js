const io = require("socket.io")(3000, {
    cors: {
        origin: "temporary-chat-2hoe.vercel.app",
    }
});


io.on("connection", socket => {
    // console.log(socket.id)

    socket.on('join-room', (roomId , name) => {
        socket.join(roomId);
        socket.to(roomId).emit('notify', `${name} joined the room`)
    });

    socket.on('send-message', (msgData , room)=>{
        console.log(msgData)
        if(room != ''){
            socket.to(room).emit("receive-msg", msgData)
        }
    })
})

