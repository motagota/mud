import { Player,PlayerRank } from './player';
import {PlayerDatabase } from './playerDatabase';


enum LogonState{    
    NEWCONNECTION,
    NEWUSER,
    ENTERNEWPASS,
    ENTERPASS
}

class Logon {
    private m_state: LogonState;
    private m_errors: number;
    private m_name: string;
    private m_pass: string;

    constructor() {
        this.m_state = LogonState.NEWCONNECTION;
        this.m_errors = 0;
        this.m_name = '';
        this.m_pass = '';
    }

    public Enter(): void {
    //    connection.sendString(red + bold + `Welcome To SimpleMud v1.0\r\n Please enter your name. Or "New" if you are new: ` + reset);
    }
    public Leave(): void {  }
    public Hungup(): void {}
    public Flooded(): void {}
    public NoRoom(b_connection: boolean): void {}
    public Handle(p_data: any): void {
        if ( this.m_errors == 5){
       //     connection.sendString(red+bold + `Too many incorrect responses, closing connection...`)
        //    connection.close();
            return;
        }

        if( this.m_state === LogonState.NEWCONNECTION){
            if( p_data.toLowerCase() === 'new'){
                this.m_state = LogonState.NEWUSER;
           //     connection.sendString(yellow + `Please enter you desired name: ` + reset);
            }
        
            else{
           /*     if(PlayerDatabase.findfull(p_data)){
                    this.m_state = LogonState.ENTERNEWPASS;
                    this.m_name = p_data;
                    m_pass = Password();
                    connection.sendString(`${green}${bold} Welcome, ${white}${p_data}${red}`)
                    connection.sendString(`${green}Please enter you password: `)
                }else{
                    this.m_errors++;
                    connection.sendString(red+bold+`Sorry the user ${white}${p_data}${red} does not exist.`)
                    connection.sendString(`Please enter your name, or "new" if you are new: `)

                }
            */
            }
            return;
        }
        if(this.m_state === LogonState.NEWUSER){
          /*  if(PlayerDatabase::hasFull(p_data)){
                this.m_errors++;
                connection.sendString(`${red}${bold} Sorry that name ${white}${p_data}${red} has already been taken.`)
                connection.sendString(`${yellow}Please enter your desired name: `)
            }else{
                if(!this.AcceptableName(p_data)){
                    this.m_errors++;
                    connection.sendString(`${red}${bold}Sorry the name ${white}p_data ${red} is unacceptable.`)
                    connection.sendString(`${yellow}Please enter your desired name: `)
                }
            }else{
                this.m_state = LogonState.ENTERNEWPASS;
                this.m_name = p_data;
                connection.sendString(`${green}Please enter your desired password`)
            }*/

        }
        if(this.m_state === LogonState.ENTERNEWPASS){
            /// check p_data is a valid password
            //for now accept anything

         //  connection.sendString(`${green}Thank you ! You are now entering the realm...`)
            let p = new Player();
            p.Name(this.m_name);
            p.Password(p_data);
/*
            if(PlayerDatabase.Size() == 0){
                // first player becomes the admin
                p_data.Rank( PlayerRank.ADMIN );
                p.ID(1);
            }else{
                p.ID(PlayerDatabase.NextId())
            }
            PlayerDatabase.AddPlayer(p);
            this.GotoGame(true);*/
            return;
        }
        if(this.m_state === LogonState.ENTERPASS){
            if(this.m_pass == p_data){
           //     connection.sendString(`${green}Thank you! You are now entering the realm...`)
                this.GotoGame();
            }
            else{
                this.m_errors++;
            //    connection.sendString(`${red}${bold}Invalid password!`)
             //   connection.sendString(`${yellow}Please enter your password: `)
            }
            return;
        }
    }
    public GotoGame(p_newbie: boolean = false): void {
      //  Player p = PlayerDatabase.findfull(this.m_name);
      //  if(p.LoggedIn()){
    //        p.Conn().close();            
     //   }
    //    p.Newbie(p_newbie);
    //    p.Conn(connection);
     //   p_Conn().switchHandler( new Game(p.Conn(), p.ID()))
    }
    public AcceptableName(p_name: string): boolean {
        // Add implementation here
        return true;
    }
    public Logon(): void {}
}