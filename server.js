const enigma = require("enigma.js");
const schema = require("enigma.js/schemas/12.20.0.json");
const WebSocket = require("ws");

// The app to connect to
const appId = "96a7d192-860d-4ecc-90e7-a404e81154b2";

// create a new session:
const session = enigma.create({
  schema,
  url: `wss://qap.sebrae.com.br/app/${appId}`,
  createSocket: url => new WebSocket(url)
});

// Open a session
const global = session.open();
// Connect to an app
const app = global.then(g => g.openDoc(appId));
// Create a generic object with the sales calculation
const salesObj = app.then(a =>
  a.createSessionObject({
    qInfo: { qType: "session" },
    sales: {
      qValueExpression: "=sum([MGE Transporte])"
    }
  })
);

// Render data from the sales object
salesObj.then(o => {
  // Whenever the sales object invalidates,
  // get the latest layout and render the sales value
  o.on("changed", () => {
    o.getLayout().then(layout => render(layout.sales));
  });

  // Get the initial layout and render the sales value
  o.getLayout().then(layout => render(layout.sales));
  
});

function render(v) {
  console.log(v);
}
