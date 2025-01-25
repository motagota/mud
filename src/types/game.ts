import { Player } from './player';
import { Room } from './room';

export interface GameState {
    players: Map<string, Player>;
    rooms: {
        [key: string]: Room;
    };
}
