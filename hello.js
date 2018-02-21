/*jshint esversion: 6 */

const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Travis!\n Devon is testing you right now!');
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');
