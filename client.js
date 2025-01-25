const readline = require('readline');
const WebSocket = require('ws');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    console.log('Connected to the MUD.');
    promptUser();
});

ws.on('message', (message) => {
    console.log(message.toString());
    promptUser();
});

function promptUser() {
    rl.question('> ', (input) => {
        ws.send(input.trim()); // Send trimmed input to avoid extra spaces
    });
}