const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let players = {};

wss.on('connection', (ws) => {
    ws.id = Date.now(); // Assign a unique ID
    players[ws.id] = { name: `Player${ws.id}`, room: 'start' };

    ws.send('Welcome to the MUD! Type "help" for commands.');

    ws.on('message', (message) => {
        const command = message.toString().trim(); // Convert Buffer to string and trim
        handleCommand(ws, command);
    });

    ws.on('close', () => {
        delete players[ws.id];
        broadcast(`${players[ws.id]?.name || 'A player'} has disconnected.`);
    });
});

function broadcast(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

function handleCommand(ws, command) {
    const player = players[ws.id];

    if (command.startsWith('name')) {
        const [, newName] = command.split(' ');
        if (newName) {
            broadcast(`${player.name} is now known as ${newName}.`);
            player.name = newName;
        } else {
            ws.send('Usage: name <your_name>');
        }
    } else if (command === 'look') {
        ws.send(`You are in ${player.room}.`);
    } else if (command === 'help') {
        ws.send('Commands: look, name <your_name>, help');
    } else {
        ws.send('Unknown command. Type "help" for a list of commands.');
    }
}

console.log('MUD server running on ws://localhost:8080');