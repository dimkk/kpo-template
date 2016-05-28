'use strict';

let mongoose = require('mongoose');

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Thing', ThingSchema);
