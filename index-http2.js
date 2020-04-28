process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const rootCas = require('ssl-root-cas/latest').create();
require('https').globalAgent.options.ca = rootCas;

const next = require('next');
const express = require('express');
const compression = require('compression');
const spdy = require('spdy');
const path = require('path');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const options = {
  key: fs.readFileSync(path.join(__dirname, '/certs/key.pem'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname, '/certs/server.crt'), 'utf8'),
};

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

app.prepare().then(() => {
  // create the express app
  const expressApp = express();

  // set up compression in express
  expressApp.use(compression({ filter: shouldCompress, level: 9 }));

  expressApp.use(express.static(path.join(__dirname, 'build')));
  expressApp.get('/*', function(req, res) {
    if (!req.isSpdy) {
      return res.end('SPDY is off. We cannot use Server Push :(');
    }
    res.push(
      '/*',
      {
        response: {
          'Content-Type': 'text/html',
        },
      },
      function(err, stream) {
        if (err) {
          return;
        }
        stream.end(path.join(__dirname, 'build', 'index.html'));
      }
    );
  });

  // start the HTTP/2 server with express
  spdy.createServer(options, expressApp).listen(port, error => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return process.exit(1);
    } else {
      // eslint-disable-next-line no-console
      console.log(`HTTP/2 server listening on port: ${port}`);
    }
  });
});
