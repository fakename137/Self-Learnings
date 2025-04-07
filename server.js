const express = require('express');
const http = require('http');
const Websocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new Websocket.Server({ server });

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New client connected');

  // When a message is received from a client
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Broadcast the message
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  //  disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('WebSocket server running');
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
