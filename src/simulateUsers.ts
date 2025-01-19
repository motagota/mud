import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:3000"; // Replace with your server URL
const NUM_USERS = 100; // Number of users to simulate

for (let i = 0; i < NUM_USERS; i++) {
    const socket = io(SERVER_URL);

    socket.on("connect", () => {
        console.log(`User ${i} connected with id: ${socket.id}`);

        // Simulate user actions
        socket.emit("command", "login");
        socket.emit("command", `username${i}`);
    });

    socket.on("message", (message: string) => {
        console.log(`User ${i} received message: ${message}`);
    });

    socket.on("disconnect", () => {
        console.log(`User ${i} disconnected`);
    });
}