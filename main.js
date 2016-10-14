'use strict';

const http = require('http');
const koa = require('koa');
const bodyParser = require('koa-bodyparser');

const config = require('./config.json');
const router = require('./router.js');
const db = require('./models');
const app = koa();

app.use(bodyParser());
app.use(router.routes());
app.use(require('koa-static')('./static'));

// app.use(function* (req, res) {
//   res.status(404).sendFile(__dirname + '/static/404.html');
// });

const hostname = config.dev.hostname;
const port = config.dev.port;

db.connection.on('error', console.error.bind(console, 'connection error on db:'));
db.connection.once('open', function() {
  app.listen(config.dev.port, function () {
    console.log('Koa server listening on port ' + config.dev.port);
  });
});

// db.sequelize
//   .sync()
//   .then(function () {
//     app.listen(config.dev.port, function () {
//       console.log('Express server listening on port ' + config.dev.port);
//     });
//   }).catch(function (e) {
//     throw new Error(e);
//   });
