const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const server = express ();

let port = process.env.PORT | 8081;

server.use(bodyParser.json());
server.use(cors());

server.get ('/', (req, res) => {
  res.send ('Server respoding');
})



server.listen (port, () => {
console.log('CORS-enabled server listening on ${port}');
});


