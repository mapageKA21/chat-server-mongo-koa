'use strict';
var bcrypt = require('bcrypt');
const saltRounds = 10;

const Message = require('./models').models.Message;
const User = require('./models').models.User;


exports.getLatest = function* (next) {
  this.type = 'json';
  try {
    const msgs = yield Message.find().sort({timestamp: -1}).limit(5);
    this.body = msgs;
  } catch (err) {
    this.status = 500;
    this.body = err;
  }
};

exports.post = function* (next) {
  let data = { content: this.request.body.content, timestamp: Date.now() };
  var message = new Message(data);
  try {
    yield message.save();
    this.body = data;
  } catch (err) {
    this.status = 500;
    this.body = err;
  }
};

exports.createUser = function* (next) {
  let hash = bcrypt.hashSync(this.request.body.password, saltRounds);
  let token = bcrypt.hashSync(hash, saltRounds);
  let data = { name: this.request.body.name, password: hash, token: token };
  let user = new User(data);
  try {
    yield user.save();
    this.body = data;
  } catch (err) {
    this.status = 500;
    this.body = err;
  }
};