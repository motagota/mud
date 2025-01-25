"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCLogonHandler = void 0;
const userDatabase_1 = require("./userDatabase");
const SChat_1 = require("./SChat");
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
class SCLogonHandler {
    constructor(p_connection, p_io) {
        this.m_connection = p_connection;
        this.m_io = p_io;
    }
    Enter() {
        this.m_connection.emit("message", `${colors.chat}Please Enter you user name: `);
    }
    async Handle(p_data) {
        console.log(`handle ${p_data}`);
        // doesn't contain invalid characters
        if (!userDatabase_1.userDatabase.IsValidUserName(p_data)) {
            this.m_connection.emit("message", `${colors.error}Sorry, that is an invalid username`);
            this.m_connection.emit("message", `${colors.chat}Please enter another username: `);
            return;
        }
        // username doesn't already exist
        const user = await userDatabase_1.userDatabase.HasUser(p_data);
        console.log(`user ${user}`);
        if (user) {
            this.m_connection.emit("message", `${colors.error}Sorry, that is username is already in use`);
            this.m_connection.emit("message", `${colors.chat}Please enter another username: `);
            return;
        }
        // user name passed the checks so create a new user
        userDatabase_1.userDatabase.AddUser(new userDatabase_1.User(p_data, this.m_connection));
        this.m_connection.emit("message", `${colors.system}Thank you for joining us. ${p_data}`);
        // add handler scchat
        this.SetHandler(new SChat_1.SChat(this.m_connection, this.m_io));
    }
    SetHandler(handler) {
        PlayerManager_1.default.setPlayer(this.m_connection.id, handler);
        handler.Enter();
    }
}
exports.SCLogonHandler = SCLogonHandler;
