let http = require("http");
let server = http.createServer((req, res) => {
  res.end("hello this is my first server");
});
server.listen(3000);
