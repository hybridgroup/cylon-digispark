/*
 * cylon-digispark
 * http://cylonjs.com
 *
 * Copyright (c) 2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require('cylon'),
    GPIO = require("cylon-gpio");

var Digispark = require('./digispark');

module.exports = {
  adaptor: function(args) {
    return new Digispark(args);
  },

  driver: function(args) {
    return GPIO.driver.apply(GPIO, args);
  },

  register: function(robot) {
    Cylon.logger.debug("registering digispark adaptor for " + robot.name);
    robot.registeradaptor('cylon-digispark', 'digispark');
    gpio.register(robot);
  }
};
