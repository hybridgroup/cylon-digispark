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

  register: function(robot) {
    Cylon.Logger.debug("registering digispark adaptor for " + robot.name);

    robot.registerAdaptor('cylon-digispark', 'digispark');

    GPIO.register(robot);
  }
};
