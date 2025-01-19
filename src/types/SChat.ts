import { Server, Socket } from 'socket.io';
import { userDatabase } from "./userDatabase"
import { Colors } from './colors';
import { IHandler } from './handler';
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

export class SChat implements IHandler{
    private m_connection: Socket;
    private m_io :Server;

    constructor(p_connection:Socket, p_io: Server){
        this.m_connection = p_connection;
        this.m_io = p_io;
    }
    Enter(){
        this.SendAll(`${colors.yellow} ${userDatabase.Find(this.m_connection)?.Name()} has entered the room`)
    }

    Leave(){
        userDatabase.DeleteUser(this.m_connection);
    }

    Handle(p_data: string | string[]){
        var name = userDatabase.Find(this.m_connection)?.Name();

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

    SendAll(p_message:string){
        this.m_io.emit('message', `${p_message}`)
    }

    CloseConnection(p_reason:string){
        this.SendAll(`bold red userDatabase.find(m_connection).name p_reason`)
    }

    SetHandler(handler: IHandler) {
        PlayerManager.setPlayer(this.m_connection.id, handler);
        handler.Enter();
    }
}