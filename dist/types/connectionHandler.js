"use strict";
//import { userDatabsae } from "./userDatabase"
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnetionHandler = void 0;
class ConnetionHandler {
    /*
    Handle(p_connetion,  p_data ){
        if(!UserDatabsae.IsValidName(p_data)){
            this.m_connection.sendString(`Sorry, that is an invalud user name`)
            this.m_connection.sendString(`Please enter another username: `)
            return
        }
            

        if(userDatabsae.HasUser(p_data)){
            this.m_connection.sendString(`Sorry, that user name is alreadyu in use`)
            this.m_connection.sendString(`Please enter another username: `)
            return;
        }

        userDatabsae.AddUser(conn, p_data){
        //    conn.SendString(`thanks you for joining us, ${p_data}`)
         //   conn.addHandler(new SChat(conn));
        }

    }

    Enter(){
        this.m_connection.sendString(`Welcome to MUD`)
        this.m_connection.sendString(`Please enter your username`)
    }
*/
    Leave() { }
    Hungup() { }
    Flooded() { }
}
exports.ConnetionHandler = ConnetionHandler;
