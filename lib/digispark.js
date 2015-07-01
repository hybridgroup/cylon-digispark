/*
 * cylon-digispark adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


"use strict";

var Cylon = require("cylon");

var digispark = require("../build/Release/digispark.node");

var Digispark = module.exports = function Digispark(opts) {
  Digispark.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.digispark = null;
  this.interval = (opts.interval) ? opts.interval.seconds() : (0.05).seconds();

  this.commands = ["digitalWrite", "digitalRead", "servoWrite", "pwmWrite"];
};

Cylon.Utils.subclass(Digispark, Cylon.Adaptor);

/**
 * Connects to the Digispark
 *
 * @param {Function} callback to be triggered when connected
 * @return {void}
 */
Digispark.prototype.connect = function(callback) {
  var err;
  this.digispark = new digispark.Digispark();

  if (this.digispark.digisparkSearch() === 0) {
    err = new Error("Connection error! Try creating udev rules or run with sudo.");
  } else {
    this.proxyMethods(this.commands, this.digispark, this);
  }

  callback(err);
};

/**
 * Disconnects from the Digispark
 *
 * @param {Function} callback to be triggered when disconnected
 * @return {void}
 */
Digispark.prototype.disconnect = function(callback) {
  callback();
};

/**
 * Writes a value to a digital pin
 *
 * @param {Number} pin the pin to write to
 * @param {Number} value the value to write to the pin
 * @return {void}
 * @publish
 */
Digispark.prototype.digitalWrite = function(pin, value) {
  this.digispark.pinMode(pin, 0);
  this.digispark.digitalWrite(pin, value);
};

/**
 * Reads a value from a digital pin
 *
 * @param {Number} pin the pin to read from
 * @param {Function} callback triggered when the value has been read from the
 * pin
 * @return {void}
 * @publish
 */
Digispark.prototype.digitalRead = function(pin, callback) {
  this.digispark.pinMode(pin, 1);

  every(this.interval, function() {
    this.digispark.digitalRead(pin, callback);
  }.bind(this));
};

/**
 * Writes a servo value to a pin
 *
 * @param {Number} pin the pin to write to
 * @param {Number} value the value to write to the pin
 * @return {void}
 * @publish
 */
Digispark.prototype.servoWrite = function(pin, value) {
  value = (value).toScale(0, 180);
  this.digispark.servoWrite(value);
};

/**
 * Writes a PWM value to a pin
 *
 * @param {Number} pin the pin to write to
 * @param {Number} value the value to write to the pin
 * @return {void}
 * @publish
 */
Digispark.prototype.pwmWrite = function(pin, value) {
  value = (value).toScale(0, 255);
  this.digispark.pwmWrite(pin, value);
};
