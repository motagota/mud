class UserDatabase{
   
 private m_users: Array<User>

    constructor(){
        this.m_users = new Array<User>();
    }
    AddUser(user : User){
        if(this.HasUser(user.Name()) && this.IsValidUserName(user.Name()))
        {
            this.m_users.push(user)
            return true;
        }
        return false;
    }

    IsValidUserName(p_name:string){
        let invalidChars = ` '~!@#$%^&*(){}[]<>=,.?;:`;

        let invalidCharPattern = new RegExp(`[${invalidChars.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}]`);
      
        // check name doesn't contain invalid characters
        if( !invalidCharPattern.test(p_name)){
            return false;            
        }

        // check name length is between 3 and 16
        if(p_name.length > 16 && p_name.length < 3) return false;

        return true;
    }

    DeleteUser(p_connection:any){
            this.m_users.find( (u)=>{
            u.Connection() === p_connection;
        })
    }
    HasUser(p_name : string)
    {
        return (this.m_users.find( (u)=>{
            u.Name() === p_name;
        }))
    }

    Find(p_connection: any) {
        return (this.m_users.find( (u)=>{
            u.Connection() === p_connection;
        }))
}
    
}

export class User{
    
    private m_name:string;
    private m_connection:any;

    constructor(p_name:string, p_connection:any){
        this.m_name =p_name;
        this.m_connection = p_connection;
    }

    Name(){
        return this.m_name;
    }
    Connection() {
        return this.m_connection;
    }
}

export const userDatabase = new UserDatabase();