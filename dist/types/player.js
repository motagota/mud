"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = exports.PlayerRank = void 0;
var PlayerRank;
(function (PlayerRank) {
    PlayerRank[PlayerRank["NONE"] = 0] = "NONE";
    PlayerRank[PlayerRank["ADMIN"] = 1] = "ADMIN";
    PlayerRank[PlayerRank["GOD"] = 2] = "GOD";
})(PlayerRank || (exports.PlayerRank = PlayerRank = {}));
class Player {
    ID(arg0) {
        throw new Error('Method not implemented.');
    }
    constructor() {
        this.id = '0';
        this.room = '0';
        this.health = 0;
        this.mana = 0;
        this.stamina = 0;
        this.name = 'UNKNOWWN';
        this.password = 'unset';
        this.rank = PlayerRank.NONE;
    }
    Name(p_name) {
        this.name = p_name;
    }
    Password(p_password) {
        this.password = p_password;
    }
}
exports.Player = Player;
