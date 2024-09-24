const express = require('express')
const axios = require('axios')
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



//to keep the render server awake
const siteUrl = "https://temporary-chat-w0nq.onrender.com";
const interval = 30000; // 30 seconds

function reloadWebsite() {
  axios.get(siteUrl)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

setInterval(reloadWebsite, interval);
