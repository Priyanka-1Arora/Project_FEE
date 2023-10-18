const http = require("http");
const fs = require("fs");

const getContentType = function () {};

const listener = function (req, res) {
  console.log("listener is called with path", req.url);
  if (req.url === "/") {
    fs.readFile("index.html", (error, data) => {
      if (data) {
        res.writeHead(201, {
          "Content-Type": "text/html",
        });
        res.end(data);
      }
    });
  } else if (req.url.includes(".html")) {
    fs.readFile(`.${req.url}`, (error, data) => {
      if (data) {
        res.writeHead(201, {
          "Content-Type": "text/html",
        });
        res.end(data);
      }
    });
  } else if (req.url.includes(".css")) {
    fs.readFile(`.${req.url}`, (error, data) => {
      if (data) {
        res.writeHead(201, {
          "Content-Type": "text/css",
        });
        res.end(data);
      }
    });
  } else if (req.url.includes(".js")) {
    fs.readFile(`.${req.url}`, (error, data) => {
        if (data) {
          res.writeHead(201, {
            "Content-Type": "text/javascript",
          });
          res.end(data);
        }
    });
  }else if (req.url.includes(".jpg")) {
    fs.readFile(`.${req.url}`, (error, data) => {
      if (data) {
        res.writeHead(201, {
          "Content-Type": "text/image",
        });
        res.end(data);
      }
    });
  }
  else if (req.url.includes(".png")) {
    fs.readFile(`.${req.url}`, (error, data) => {
      if (data) {
        res.writeHead(201, {
          "Content-Type": "text/image",
        });
        res.end(data);
      }
    });
  }
   else {
    res.writeHead(400);
    res.end('{ error: "Invalid request" }');
  }
};
const httpServer = http.createServer(listener);

httpServer.listen("3000", "", () => {
  console.log("Server listening now on port 3000 on localhost");
});