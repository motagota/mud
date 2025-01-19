import { Server, Socket } from 'socket.io';
import { userDatabase,User} from "./userDatabase"
import { Colors } from './colors';
import { IHandler } from './handler';
import { SChat } from './SChat';
import PlayerManager from './PlayerManager';

const colors: Colors  = {
    system: '\x1b[35m',    // Magenta
    error: '\x1b[31m',     // Red
    chat: '\x1b[32m',      // Green
    combat: '\x1b[31m',    // Red
    info: '\x1b[36m',      // Cyan
    yellow: '\x1b[33m',    // yellow
    reset: '\x1b[0m'       // Reset
};
export class SCLogonHandler implements IHandler {

    private m_connection: Socket;
        private m_io :Server;

        constructor(p_connection:Socket, p_io: Server){
            this.m_connection = p_connection;
            this.m_io = p_io;
        }

    Enter(){
        this.m_connection.emit("message",`${colors.chat}Please Enter you user name: `)
    }

    Handle(p_data:string){
        console.log(`handle ${p_data}`)

        // doesn't contain invalid characters
        if( !userDatabase.IsValidUserName(p_data)) {
            this.m_connection.emit("message", `${colors.error}Sorry, that is an invalid username`)
            this.m_connection.emit("message", `${colors.chat}Please enter another username: `)

        }

        // username doesn't already exist
        
        if(userDatabase.HasUser(p_data)){
            this.m_connection.emit("message", `${colors.error}Sorry, that is username is already in use`)
            this.m_connection.emit("message", `${colors.chat}Please enter another username: `)
        }

        // user name passed the checks so create a new user
        userDatabase.AddUser(new User(p_data, this.m_connection));
        this.m_connection.emit("message", `${colors.system}Thank you for joining us. ${p_data}`)

        // add handler scchat
        this.SetHandler(new SChat(this.m_connection,this.m_io));
    }

    SetHandler(handler: IHandler) {
        PlayerManager.setPlayer(this.m_connection.id, handler);
        handler.Enter();
    }
}