import express from 'express'; 
import WebSocket, { WebSocketServer } from 'ws';

const app = express(); 


const httpServer = app.listen(3000, () => {
    console.log('Server running on port 3000');
});


const socket = new WebSocketServer({ server: httpServer });

let userCount = 0;
socket.on('connection', (ws: WebSocket) => {
    ws.on('error', console.error);

    ws.on('message', (data) => {
        console.log(data.toString()); 
        socket.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data.toString());
            }
        })
    });

    ws.on('close', () => {
        console.log('Disconnected');
    });

    console.log('User connected', ++userCount);
    // Send a message to the client
    ws.send('Hello, message from server');
});
