const compression = require('compression');
const express = require('express');
const path = require('path');

const app = express();
// gzip compression
app.use(compression({ level: 9 }));

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(3000, () => {
  console.info('Frontend server running at port 3000');
});

const exitHandler = () => {
  if (this.server) {
    this.server.close(() => {
      console.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = error => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
  console.error('SIGTERM received');
  if (this.server) {
    this.server.close();
  }
});
