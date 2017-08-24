const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

// Broadcast current user count
const sendUserCount = () => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      client.send(JSON.stringify({type:'count', userCount: wss.clients.size}));
    }
  });
}

wss.on('connection', (ws) => {

  console.log('Client connected');
  sendUserCount();

  // Set color for user based on number of logged in users mod 4
  ws.send(JSON.stringify({type: 'color', index: wss.clients.size % 4}));

  ws.on('message', function incoming(message) {

    message = JSON.parse(message);

    let broadcast;
    const { content } = message;

    if (message.type === 'content') {
      broadcast = {type: 'content', id:uuid(), user:message.user, content:content, color:message.color};
    }
    if (message.type === 'update') {
      const updateMessage = `${message.oldUser} changed their name to ${message.newUser}`;
      broadcast = {type:'update', id:uuid(), user:'SYSTEM', content: updateMessage, color:'#000000'};
    }

    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(JSON.stringify(broadcast));
      }
    });
  });

  ws.on('close', () => {
    sendUserCount();
    console.log('Client disconnected');
  });

});