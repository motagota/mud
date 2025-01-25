"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerManager {
    static getPlayers() {
        return this.players;
    }
    static setPlayer(id, handler) {
        this.players[id] = handler;
    }
    static removePlayer(id) {
        delete this.players[id];
    }
}
PlayerManager.players = {};
exports.default = PlayerManager;
