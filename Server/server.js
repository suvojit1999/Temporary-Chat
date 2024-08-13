const express = require('express')
const path = require('path')

const app = express();

//--------Deployment-----------
const __dirname1 = path.resolve()

app.use(express.static(path.join(__dirname1, '../Client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, '../Client/dist', 'index.html'));
});
//--------Deployment-----------


const server = app.listen(3000)
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET","POST"]
    }
});
// const io = require("socket.io")({
//     cors: {
//         origin: "temporary-chat-2hoe.vercel.app",
//         methods: ["GET","POST"]
//     }
// });


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


