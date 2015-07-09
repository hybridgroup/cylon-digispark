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
  var err, errMsg;
  this.digispark = new digispark.Digispark();

  if (this.digispark.digisparkSearch() === 0) {
    errMsg = "Connection error! Try creating udev rules or run with sudo.";
    err = new Error(errMsg);
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
    this.digispark.digitalRead(pin, function(err, data) {
      this.respond("digitalRead", callback, err, data, pin);
    }.bind(this));
  }.bind(this));
};
/**
 * Writes to a pin
 *
 * @param {Number} pin
 * @param {Number} value
 * @param {Function} callback
 * @return {null}
 * @private
 */
Digispark.prototype._write = function(type, pin, value, scale, callback) {
  var scaledVal = (value).toScale(0, scale);

  if ("digital" === type) {
    this.digispark.pinMode(pin, 0);
    this.digispark.digitalWrite(pin, value);
  } else if ("pwm" === type) {
    this.digispark.pwmWrite(pin, scaledVal);
  } else {
    this.digispark.servoWrite(scaledVal);
  }

  this.respond(type + "Write", callback, null, value, pin);
};

/**
 * Writes a servo value to a pin
 *
 * @param {Number} pin the pin to write to
 * @param {Number} value the value to write to the pin
 * @return {void}
 * @publish
 */
Digispark.prototype.servoWrite = function(pin, value, callback) {
  this._write("servo", pin, value, 180, callback);
};

/**
 * Writes a PWM value to a pin
 *
 * @param {Number} pin the pin to write to
 * @param {Number} value the value to write to the pin
 * @return {void}
 * @publish
 */
Digispark.prototype.pwmWrite = function(pin, value, callback) {
  this._write("pwm", pin, value, 255, callback);
};

/**
 * Writes a value to a digital pin
 *
 * @param {Number} pin
 * @param {Number} value
 * @return {null}
 * @publish
 */
Digispark.prototype.digitalWrite = function(pin, value, callback) {
  this._write("digital", pin, value, null, callback);
};
