/*
 * cylon-digispark
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

require('cylon');
require('./digispark');

var namespace = require('node-namespace'),
    CliCommands = require("./cli/commands"),
    GPIO = require("cylon-gpio");

module.exports = {
  adaptor: function(args) {
    return new Cylon.Adaptors.Digispark(args);
  },

  driver: function(args) {
    return GPIO.driver.apply(GPIO, args);
  },

  register: function(robot) {
    Logger.debug("Registering Digispark adaptor for " + robot.name);
    robot.registerAdaptor('cylon-digispark', 'digispark');
    GPIO.register(robot);
  },

  registerCommands: function() {
    var commands;

    commands = {
      littlewire: {
        description: "Upload littlewire protocol to digispark",
        command: function(args) {
          var subcmd;
          subcmd = args[0];
          switch (subcmd) {
            case 'upload':
              CliCommands.littlewire.upload();
              break;
            case 'set-udev-rules':
              CliCommands.littlewire.setUdevRules();
              break;
            default:
              console.log("cylon littlewire argument not recognized, try:\n");
              console.log("1.- cylon littlewire upload (make sure NOT to connect the digispark until prompted).");
              console.log("2.- cylon littlewire set-udev-rules\n");
          }
        }
      }
    };

    return commands;
  }
};
