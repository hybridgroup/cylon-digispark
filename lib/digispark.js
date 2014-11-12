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
  Digispark.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.digispark = null;
  this.interval = (opts.interval) ? opts.interval.seconds() : (0.05).seconds();

  this.commands = ['digitalWrite', 'digitalRead', 'servoWrite', 'pwmWrite'];
};

Cylon.Utils.subclass(Digispark, Cylon.Adaptor);

Digispark.prototype.connect = function(callback) {
  this.digispark = new digispark.Digispark();
  this.proxyMethods(this.commands, this.digispark, this);
  callback();
};

Digispark.prototype.disconnect = function(callback) {
  callback();
};

Digispark.prototype.digitalWrite = function(pin, value) {
  this.digispark.pinMode(pin, 0);
  this.digispark.digitalWrite(pin, value);
};

Digispark.prototype.digitalRead = function(pin, callback) {
  this.digispark.pinMode(pin, 1);

  every(this.interval, function() {
    this.digispark.digitalRead(pin, callback);
  }.bind(this));
};

Digispark.prototype.servoWrite = function(pin, value) {
  value = (value).toScale(0, 180);
  this.digispark.servoWrite(value);
};

Digispark.prototype.pwmWrite = function(pin, value) {
  value = (value).toScale(0, 255);
  this.digispark.pwmWrite(pin, value);
};
