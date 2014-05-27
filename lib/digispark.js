/*
 * cylon-digispark adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


"use strict";

var Cylon = require('cylon');

var digispark = require('../build/Release/digispark.node');

var Digispark = module.exports = function Digispark(opts) {
  if (opts === null) {
    opts = {};
  }

  this.digispark = null;

  Digispark.__super__.constructor.apply(this, arguments);
};

subclass(Digispark, Cylon.Adaptor);

Digispark.prototype.commands = function() {
  return ['digitalWrite', 'digitalRead', 'servoWrite', 'pwmWrite'];
};

Digispark.prototype.connect = function(callback) {
  this.digispark = new digispark.Digispark();
  this.proxyMethods(this.commands(), this.digispark, this);

  Digispark.__super__.connect.apply(this, arguments);
};

Digispark.prototype.digitalWrite = function(pin, value) {
  this.digispark.pinMode(pin, 0);
  this.digispark.digitalWrite(pin, value);
};

Digispark.prototype.digitalRead = function(pin, callback) {
  this.digispark.pinMode(pin, 1);
  this.digispark.digitalRead(pin, callback);
};

Digispark.prototype.servoWrite = function(pin, value) {
  this.digispark.servoWrite(value);
};
