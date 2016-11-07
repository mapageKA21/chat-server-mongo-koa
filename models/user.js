'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    "name": { type : String},
    "password": { type : String},
    "token": { type : String}
});

mongoose.model('User', userSchema);
