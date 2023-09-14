import express from "express";
import http from 'http'
import {Server} from 'socket.io'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
var server = http.createServer(app);
app.use(express.static('public'))

var port  = 5000;
server.listen(port,()=>{
    console.log(`server listening on port ${port}`);
})
app.get('/',(req, res)=>{
    res.sendFile(join(__dirname, 'index.html'))
})


const io = new Server(server)

io.on('connection',(socket)=>{
    console.log('new user connected');

    socket.on('message',(msg)=>{
        console.log(msg);
        io.emit('message', msg)
    })
})
