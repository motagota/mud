export enum PlayerRank{
    NONE,
    ADMIN,
    GOD
}
export class Player {
    ID(arg0: number) {
        throw new Error('Method not implemented.');
    }
    private id: string;
    private room: string;
    private health: number;
    private mana: number;
    private stamina: number;

    private name: string;
    private password: string;
    private rank : PlayerRank;

    constructor(){
        this.id     = '0';
        this.room   = '0';
        this.health = 0;
        this.mana   = 0;
        this.stamina= 0;

        this.name   = 'UNKNOWWN'
        this.password ='unset'
        this.rank = PlayerRank.NONE;

    }

    Name(p_name:string){
        this.name = p_name;
    }
    Password(p_password:string){
        this.password = p_password;
    }
}


export interface PlayerStatus {
    health: number;
    mana: number;
    stamina: number;
}