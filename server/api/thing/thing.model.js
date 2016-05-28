'use strict';
var mongoose = require('mongoose');
var ThingSchema = new mongoose.Schema({
    name: String,
    info: String,
    active: Boolean
});
exports.__esModule = true;
exports["default"] = mongoose.model('Thing', ThingSchema);
