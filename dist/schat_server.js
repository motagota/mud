"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const SCLogonHandler_1 = require("./types/SCLogonHandler");
const PlayerManager_1 = __importDefault(require("./types/PlayerManager"));
const app = (0, express_1.default)();
const http = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(express_1.default.static('public'));
const players = {};
// Broadcast to all connected clients
function sendToAll(event, data) {
    io.emit(event, data); // Emits to all connected clients
}
io.on('connection', (socket) => {
    console.log('Player connected:', socket.id);
    PlayerManager_1.default.setPlayer(socket.id, new SCLogonHandler_1.SCLogonHandler(socket, io));
    PlayerManager_1.default.getPlayers()[socket.id].Enter();
    socket.on('command', (cmd) => {
        const command = cmd.toLowerCase().trim();
        PlayerManager_1.default.getPlayers()[socket.id].Handle(command);
    });
    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        PlayerManager_1.default.removePlayer(socket.id);
        console.log(players);
    });
});
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Chat Server running on port ${PORT}`);
});
