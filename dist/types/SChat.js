"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SChat = void 0;
const userDatabase_1 = require("./userDatabase");
const PlayerManager_1 = __importDefault(require("./PlayerManager"));
const colors = {
    system: '\x1b[35m', // Magenta
    error: '\x1b[31m', // Red
    chat: '\x1b[32m', // Green
    combat: '\x1b[31m', // Red
    info: '\x1b[36m', // Cyan
    yellow: '\x1b[33m', // yellow
    reset: '\x1b[0m' // Reset
};
class SChat {
    constructor(p_connection, p_io) {
        this.m_connection = p_connection;
        this.m_io = p_io;
    }
    async Enter() {
        const user = await userDatabase_1.userDatabase.Find(this.m_connection.id);
        console.log(`user ${user}`);
        // this.SendAll(`${colors.yellow} ${user?.Name()} has entered the room`)
    }
    async Leave() {
        await userDatabase_1.userDatabase.DeleteUser(this.name);
    }
    async Handle(p_data) {
        //  this.name = (await userDatabase.Find(this.m_connection))?.Name();
        // if(p_data[0] == '/'){
        //   const command = p_data.toLowerCase().trim();
        //   const message = p_data.substring(4);
        // if (command == "/who"){
        var who = `magenta + bold + Who is in the room: `;
        //    this.m_connection.SendString(this.m_connection, who);
        //  }//else if (command == "/quit"){
        //   this.m_connection.Close();
        // }
        // }
    }
    SendAll(p_message) {
        this.m_io.emit('message', `${p_message}`);
    }
    CloseConnection(p_reason) {
        this.SendAll(`bold red userDatabase.find(m_connection).name p_reason`);
    }
    SetHandler(handler) {
        PlayerManager_1.default.setPlayer(this.m_connection.id, handler);
        handler.Enter();
    }
}
exports.SChat = SChat;
