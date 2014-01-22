/*
 * cylon-digispark adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  "use strict";
  var digispark, namespace,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  namespace = require('node-namespace');

  require('./cylon-digispark');

  digispark = require('../build/Release/digispark.node');

  namespace('Cylon.Adaptors', function() {
    return this.Digispark = (function(_super) {
      __extends(Digispark, _super);

      function Digispark(opts) {
        if (opts == null) {
          opts = {};
        }
        Digispark.__super__.constructor.apply(this, arguments);
        this.digispark = "";
        this.myself = this;
      }

      Digispark.prototype.commands = function() {
        return ['digitalWrite'];
      };

      Digispark.prototype.connect = function(callback) {
        this.digispark = new digispark.Digispark();
        callback(null);
        this.connection.emit('connect');
        return this.proxyMethods(this.commands, this.digispark, this.myself);
      };

      Digispark.prototype.digitalWrite = function(pin, value) {
        this.digispark.pinMode(pin, 0);
        return this.digispark.digitalWrite(pin, value);
      };

      return Digispark;

    })(Cylon.Adaptor);
  });

}).call(this);
