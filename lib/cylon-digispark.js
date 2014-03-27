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

var GPIO = require("cylon-gpio");

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
  }
};
