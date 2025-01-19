
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { SChat } from './types/SChat';
import { SCLogonHandler} from './types/SCLogonHandler'
import { IHandler } from './types/handler';
import PlayerManager from './types/PlayerManager';

const app = express();
const http = createServer(app);
const io = new Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.static('public'));


const players : {[key:string]: IHandler} = {};

// Broadcast to all connected clients
function sendToAll(event: string, data: any) {
    io.emit(event, data); // Emits to all connected clients
}

io.on('connection', (socket: Socket) => {

    console.log('Player connected:', socket.id);

    PlayerManager.setPlayer(socket.id, new SCLogonHandler(socket, io));
    PlayerManager.getPlayers()[socket.id].Enter();

    socket.on('command', (cmd: string) => {     
        const command = cmd.toLowerCase().trim();
        PlayerManager.getPlayers()[socket.id].Handle(command);
        
    });

    socket.on('disconnect', ()=>{
        console.log('Player disconnected:', socket.id)
        PlayerManager.removePlayer(socket.id);
        console.log(players);
    })

});



const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Chat Server running on port ${PORT}`);
});