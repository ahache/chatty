const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

const sendUserCount = () => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === 1) {
      const userCount = { type:'count', userCount: wss.clients.size };
      client.send(JSON.stringify(userCount));
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  sendUserCount();

  // Set color for user, based on number of logged in users mod 4
  ws.send(JSON.stringify({type: 'color', index: wss.clients.size % 4}));

  ws.on('message', function incoming(message) {

    message = JSON.parse(message);

    let newMessage;
    if (message.type === 'content') {
      newMessage = {type: 'content', id:uuid(), user:message.user, content:message.content};
    }
    if (message.type === 'update') {
      const updateMessage = `${message.oldUser} Changed their name to ${message.newUser}`;
      newMessage = {type:'update', id:uuid(), user:'SYSTEM', content: updateMessage};
    }

    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(JSON.stringify(newMessage));
      }
    });
  });

  ws.on('close', () => {
    sendUserCount();
    console.log('Client disconnected');
  });

});