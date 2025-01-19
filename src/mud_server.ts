
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

// Import types
import { Player, PlayerStatus } from './types/player';
import { Direction, validDirections } from './types/room';
import { GameState } from './types/game';
import { Colors } from './types/colors';

const app = express();
const http = createServer(app);
const io = new Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


// Serve static files
app.use(express.static('public'));

// Basic game state
const gameState: GameState = {
    players: new Map<string, Player>(),
    rooms: {
        'start': {
            description: '\x1b[33mA dimly lit chamber with stone walls. Torches flicker casting dancing shadows.\x1b[0m',
            exits: {
                north: 'corridor',
                east: 'library'
            }
        },
        'corridor': {
            description: '\x1b[36mA long, dark corridor stretches before you. The air is cool and damp.\x1b[0m',
            exits: {
                south: 'start',
                north: 'dungeon'
            }
        },
        'library': {
            description: '\x1b[32mAncient books line the walls. The air is thick with dust and knowledge.\x1b[0m',
            exits: {
                west: 'start'
            }
        },
        'dungeon': {
            description: '\x1b[31mA forbidding dungeon. Chains hang from the walls and strange sounds echo.\x1b[0m',
            exits: {
                south: 'corridor'
            }
        }
    }
};

// Color codes for different message types
const colors: Colors  = {
    system: '\x1b[35m',    // Magenta
    error: '\x1b[31m',     // Red
    chat: '\x1b[32m',      // Green
    combat: '\x1b[31m',    // Red
    info: '\x1b[36m',      // Cyan
    reset: '\x1b[0m',       // Reset
    yellow: '\x1b[33m',    // yellow
};


// Command handlers
const handleLook = (socket: Socket, player: Player): void => {
  //  const currentRoom = gameState.rooms[player.room];
  //  socket.emit('message', `${colors.info}${currentRoom.description}${colors.reset}`);
  //  const exits = Object.keys(currentRoom.exits);
  //  socket.emit('message', `${colors.system}Exits: ${exits.join(', ')}${colors.reset}`);
};

const handleMove = (socket: Socket, player: Player, direction: Direction): void => {
  /*  const currentRoom = gameState.rooms[player.room];
    if (currentRoom.exits[direction]) {
        player.room = currentRoom.exits[direction];
        socket.emit('message', `${colors.system}You move ${direction}.${colors.reset}`);
        socket.emit('message', `${colors.info}${gameState.rooms[player.room].description}${colors.reset}`);
    } else {
        socket.emit('message', `${colors.error}You cannot go that way.${colors.reset}`);
    }*/
};

const handleSay = (io: Server, player: Player, message: string): void => {
   // io.emit('message', `${colors.chat}${player.id} says: ${message}${colors.reset}`);
};

const handleHelp = (socket: Socket): void => {
    socket.emit('message', `${colors.info}Available commands:
- look: Examine your surroundings
- north, south, east, west: Move in that direction
- say <message>: Say something to everyone in the realm
- help: Show this help message${colors.reset}`);
};

// Socket connection handling
io.on('connection', (socket: Socket) => {
    console.log('Player connected:', socket.id);
    
    // Initialize player
 /*   const player: Player = {
        id: socket.id,
        room: 'start',
        health: 100,
        mana: 100,
        stamina: 100
    };*/
   // gameState.players.set(socket.id, player);

    // Send welcome message
    socket.emit('message', `${colors.system}Welcome to the realm, traveler!${colors.reset}`);
   // socket.emit('message', `${colors.info}${gameState.rooms[player.room].description}${colors.reset}`);
    
    // Update status
    socket.emit('status', {
   //    health: player.health,
    //    mana: player.mana,
   //     stamina: player.stamina
    } as PlayerStatus);

    // Handle commands
    socket.on('command', (cmd: string) => {
        const command = cmd.toLowerCase().trim();
        const player = gameState.players.get(socket.id);
        
        if (!player) {
            socket.emit('message', `${colors.error}Error: Player not found${colors.reset}`);
            return;
        }

        // Command processing
        if (command.startsWith('look')) {
            handleLook(socket, player);
        }
        else if (validDirections.includes(command as Direction)) {
            handleMove(socket, player, command as Direction);
        }
        else if (command.startsWith('say ')) {
            const message = cmd.substring(4);
            handleSay(io, player, message);
        }
        else if (command === 'help') {
            handleHelp(socket);
        }
        else {
            socket.emit('message', `${colors.error}Unknown command. Type 'help' for available commands.${colors.reset}`);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        gameState.players.delete(socket.id);
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});