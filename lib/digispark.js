/*
 * cylon-digispark adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


"use strict";

var namespace = require('node-namespace'),
    digispark = require('../build/Release/digispark.node');

namespace('Cylon.Adaptors', function() {
  this.Digispark = (function(_parent) {
    subclass(Digispark, _parent);

    function Digispark(opts) {
      if (opts === null) {
        opts = {};
      }
      Digispark.__super__.constructor.apply(this, arguments);
      this.digispark = "";
      this.myself = this;
    }

    Digispark.prototype.commands = function() {
      return ['digitalWrite', 'digitalRead', 'servoWrite', 'pwmWrite'];
    };

    Digispark.prototype.connect = function(callback) {
      this.digispark = new digispark.Digispark();
      callback(null);
      this.connection.emit('connect');
      this.proxyMethods(this.commands, this.digispark, this.myself);
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

    Digispark.prototype.pwmWrite = function(pin, value) {
      this.digispark.pwmWrite(pin, value);
    };

    return Digispark;

  })(Cylon.Adaptor);
});
