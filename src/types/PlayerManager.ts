import { IHandler } from "./handler";

class PlayerManager {
    private static players: { [key: string]: IHandler } = {};

    static getPlayers() {
        return this.players;
    }

    static setPlayer(id: string, handler: IHandler) {
        this.players[id] = handler;
    }

    static removePlayer(id: string) {
        delete this.players[id];
    }
}

export default PlayerManager;