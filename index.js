const express=require('express');
const port=3000;
const app=express();
const bodyParser = require('body-parser');
require('./db');
require('./modles/User');
require('./modles/Message');
const authroutes=require('./routs/authRoutes');
const uploadMedia =require('./routs/uploadMedia');
const meessageRoutes=require('./routs/messageRoutes');


const {createServer}=require('http');
const {Server}=require('socket.io');

const httpServer=createServer();

const io=new Server(httpServer,{/*option*/})

app.use(bodyParser.json());
app.use(authroutes);
app.use(uploadMedia);
app.use(meessageRoutes);
 
app.get('/',(req,res)=>{
    res.send("hello world");
})

io.on("connection", (socket) => {

    console.log("USER CONNECTED - ", socket.id);

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED - ", socket.id);
    });

    socket.on("join_room", (data) => {
        console.log("USER WITH ID - ",socket.id,"JOIN ROOM - ", data.roomid);
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        console.log("MESSAGE RECEIVED - ", data);
        io.emit("receive_message", data);
    });
});


httpServer.listen(3001,()=>{
    console.log(" socket io Server is running on port 3001");
});

app.listen(port,()=>{
    console.log("Server is running on port"+port);
})