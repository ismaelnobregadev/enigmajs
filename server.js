const enigma = require('enigma.js');
const WebSocket = require('ws');
const schema = require('enigma.js/schemas/12.20.0.json');

// create a new session:
const session = enigma.create({
  schema,
  url: 'wss://qap.sebrae.com.br/app/96a7d192-860d-4ecc-90e7-a404e81154b2',
  createSocket: url => new WebSocket(url),
});

// bind traffic events to log what is sent and received on the socket:
session.on('traffic:sent', data => console.log('sent:', data));
session.on('traffic:received', data => console.log('received:', data));

// open the socket and eventually receive the QIX global API, and then close
// the session:
session.open()
  .then((qix) => qix.openDoc('96a7d192-860d-4ecc-90e7-a404e81154b2'))
  .then(result => console.log(result))
  .then(() => session.close())
  .then(() => console.log('Session closed'))
  .catch(err => console.log('Something went wrong :(', err));