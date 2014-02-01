/*
 * cylon-digispark
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var CliCommands, GPIO, namespace,
    __slice = [].slice;

  namespace = require('node-namespace');

  require('cylon');

  require('./digispark');

  CliCommands = require("./cli/commands");

  GPIO = require("cylon-gpio");

  module.exports = {
    adaptor: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Cylon.Adaptors.Digispark, args, function(){});
    },
    driver: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return GPIO.driver.apply(GPIO, args);
    },
    register: function(robot) {
      robot.registerAdaptor('cylon-digispark', 'digispark');
      return GPIO.register(robot);
    },
    registerCommands: function() {
      return {
        littlewire: {
          description: "Upload littlewire protocol to digispark",
          command: function() {
            var subcmd;
            subcmd = args[0];
            switch (subcmd) {
              case 'upload':
                return CliCommands.littlewire.upload();
              case 'setUdevRules':
                return CliCommands.littlewire.setUdevRules();
              default:
                console.log("cylon littlewire argument not recognized, try:\n");
                console.log("1.- cylon littlewire upload (make sure NOT to connect the digispark until prompted).");
                return console.log("2.- cylon littlewire setUdevRules\n");
            }
          }
        }
      };
    }
  };

}).call(this);
